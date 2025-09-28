"use server";


import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";
import { getCurrentUser } from "./users";

/**
 * Obtém todas as organizações do usuário atual
 * @returns Lista de organizações onde o usuário é membro
 */
export async function getOrganizations() {
  try {
    const { currentUser } = await getCurrentUser();

    const organizations = await prisma.organization.findMany({
      where: {
        members: {
          some: {
            userId: currentUser.id,
          },
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
        },
        _count: {
          select: {
            members: true,
            invitations: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return organizations;
  } catch (error) {
    console.error("Erro ao buscar organizações:", error);
    return [];
  }
}

/**
 * Obtém a organização ativa do usuário
 * @param userId - ID do usuário
 * @returns Primeira organização do usuário ou null se não encontrada
 */
export async function getActiveOrganization(userId: string) {
  try {
    const member = await prisma.member.findFirst({
      where: {
        userId: userId,
      },
      include: {
        organization: {
          include: {
            members: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                  },
                },
              },
            },
            _count: {
              select: {
                members: true,
                invitations: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "asc", // Primeira organização que o usuário entrou
      },
    });

    return member?.organization || null;
  } catch (error) {
    console.error("Erro ao buscar organização ativa:", error);
    return null;
  }
}

/**
 * Obtém uma organização pelo slug
 * @param slug - Slug único da organização
 * @returns Organização com membros ou null se não encontrada
 */
export async function getOrganizationBySlug(slug: string) {
  try {
    const organization = await prisma.organization.findUnique({
      where: {
        slug: slug,
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
                emailVerified: true,
                createdAt: true,
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
        invitations: {
          select: {
            id: true,
            email: true,
            role: true,
            status: true,
            expiresAt: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
          where: {
            status: "pending", // Apenas convites pendentes
          },
        },
        _count: {
          select: {
            members: true,
            invitations: true,
          },
        },
      },
    });

    return organization;
  } catch (error) {
    console.error("Erro ao buscar organização por slug:", error);
    return null;
  }
}

/**
 * Obtém uma organização pelo ID
 * @param organizationId - ID da organização
 * @returns Organização com detalhes completos ou null se não encontrada
 */
export async function getOrganizationById(organizationId: string) {
  try {
    const organization = await prisma.organization.findUnique({
      where: {
        id: organizationId,
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
                emailVerified: true,
                createdAt: true,
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
        invitations: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        _count: {
          select: {
            members: true,
            invitations: true,
          },
        },
      },
    });

    return organization;
  } catch (error) {
    console.error("Erro ao buscar organização por ID:", error);
    return null;
  }
}

/**
 * Cria uma nova organização
 * @param data - Dados da organização
 * @returns Organização criada ou null em caso de erro
 */
export async function createOrganization(data: {
  name: string;
  slug?: string;
  logo?: string;
  metadata?: string;
}) {
  try {
    const { currentUser } = await getCurrentUser();

    // Verifica se o slug já existe (se fornecido)
    if (data.slug) {
      const existingOrg = await prisma.organization.findUnique({
        where: { slug: data.slug },
      });

      if (existingOrg) {
        throw new Error("Este slug já está em uso");
      }
    }

    const organization = await prisma.organization.create({
      data: {
        id: randomUUID(),
        name: data.name,
        slug: data.slug || null,
        logo: data.logo || null,
        metadata: data.metadata || null,
        createdAt: new Date(),
        members: {
          create: {
            id: randomUUID(),
            userId: currentUser.id,
            role: "owner", // Criador automaticamente é owner
            createdAt: new Date(),
          },
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
        },
        _count: {
          select: {
            members: true,
            invitations: true,
          },
        },
      },
    });

    revalidatePath("/dashboard");
    return organization;
  } catch (error) {
    console.error("Erro ao criar organização:", error);
    return null;
  }
}

/**
 * Atualiza uma organização
 * @param organizationId - ID da organização
 * @param data - Dados para atualizar
 * @returns Organização atualizada ou null em caso de erro
 */
export async function updateOrganization(
  organizationId: string,
  data: {
    name?: string;
    slug?: string;
    logo?: string;
    metadata?: string;
  },
) {
  try {
    const { currentUser } = await getCurrentUser();

    // Verifica se o usuário tem permissão (é owner ou admin)
    const member = await prisma.member.findFirst({
      where: {
        organizationId: organizationId,
        userId: currentUser.id,
        role: {
          in: ["owner", "admin"],
        },
      },
    });

    if (!member) {
      throw new Error("Sem permissão para atualizar esta organização");
    }

    // Verifica se o slug já existe (se fornecido e diferente do atual)
    if (data.slug) {
      const existingOrg = await prisma.organization.findFirst({
        where: {
          slug: data.slug,
          id: {
            not: organizationId,
          },
        },
      });

      if (existingOrg) {
        throw new Error("Este slug já está em uso");
      }
    }

    const organization = await prisma.organization.update({
      where: {
        id: organizationId,
      },
      data: {
        ...data,
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
        },
        _count: {
          select: {
            members: true,
            invitations: true,
          },
        },
      },
    });

    revalidatePath("/dashboard");
    return organization;
  } catch (error) {
    console.error("Erro ao atualizar organização:", error);
    return null;
  }
}

/**
 * Deleta uma organização
 * @param organizationId - ID da organização
 * @returns true se deletada com sucesso, false caso contrário
 */
export async function deleteOrganization(organizationId: string) {
  try {
    const { currentUser } = await getCurrentUser();

    // Verifica se o usuário é owner da organização
    const member = await prisma.member.findFirst({
      where: {
        organizationId: organizationId,
        userId: currentUser.id,
        role: "owner",
      },
    });

    if (!member) {
      throw new Error("Apenas o proprietário pode deletar a organização");
    }

    // Deleta a organização (cascade irá deletar membros e convites)
    await prisma.organization.delete({
      where: {
        id: organizationId,
      },
    });

    revalidatePath("/dashboard");
    return true;
  } catch (error) {
    console.error("Erro ao deletar organização:", error);
    return false;
  }
}

/**
 * Verifica se um slug está disponível
 * @param slug - Slug para verificar
 * @param excludeOrganizationId - ID da organização para excluir da verificação
 * @returns true se disponível, false se já está em uso
 */
export async function isSlugAvailable(
  slug: string,
  excludeOrganizationId?: string,
) {
  try {
    const organization = await prisma.organization.findFirst({
      where: {
        slug: slug,
        ...(excludeOrganizationId && {
          id: {
            not: excludeOrganizationId,
          },
        }),
      },
      select: {
        id: true,
      },
    });

    return !organization;
  } catch (error) {
    console.error("Erro ao verificar slug:", error);
    return false;
  }
}

/**
 * Obtém estatísticas das organizações do usuário atual
 * @returns Estatísticas das organizações
 */
export async function getOrganizationStats() {
  try {
    const { currentUser } = await getCurrentUser();

    const userOrganizations = await prisma.organization.findMany({
      where: {
        members: {
          some: {
            userId: currentUser.id,
          },
        },
      },
      include: {
        _count: {
          select: {
            members: true,
            invitations: true,
          },
        },
      },
    });

    const totalOrganizations = userOrganizations.length;
    const totalMembers = userOrganizations.reduce(
      (sum, org) => sum + org._count.members,
      0,
    );
    const totalInvitations = userOrganizations.reduce(
      (sum, org) => sum + org._count.invitations,
      0,
    );

    const roleStats = await prisma.member.groupBy({
      by: ["role"],
      where: {
        organizationId: {
          in: userOrganizations.map((org) => org.id),
        },
      },
      _count: {
        role: true,
      },
    });

    return {
      totalOrganizations,
      totalMembers,
      totalInvitations,
      averageMembersPerOrg:
        totalOrganizations > 0
          ? Math.round(totalMembers / totalOrganizations)
          : 0,
      roleDistribution: roleStats.reduce(
        (acc, stat) => {
          acc[stat.role] = stat._count.role;
          return acc;
        },
        {} as Record<string, number>,
      ),
    };
  } catch (error) {
    console.error("Erro ao obter estatísticas das organizações:", error);
    return {
      totalOrganizations: 0,
      totalMembers: 0,
      totalInvitations: 0,
      averageMembersPerOrg: 0,
      roleDistribution: {},
    };
  }
}
