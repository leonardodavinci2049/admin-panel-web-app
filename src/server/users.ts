"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Obtém o usuário atual da sessão
 * @returns Dados da sessão com informações do usuário atual
 */
export const getCurrentUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      members: {
        include: {
          organization: true,
        },
      },
      accounts: true,
    },
  });

  if (!currentUser) {
    redirect("/sign-in");
  }

  return {
    ...session,
    currentUser,
  };
};

/**
 * Obtém usuários que não são membros de uma organização específica
 * @param organizationId - ID da organização
 * @returns Lista de usuários disponíveis para convite
 */
export const getUsers = async (organizationId: string) => {
  try {
    // Busca todos os membros da organização
    const members = await prisma.member.findMany({
      where: {
        organizationId: organizationId,
      },
      select: {
        userId: true,
      },
    });

    const memberUserIds = members.map((member) => member.userId);

    // Busca usuários que não são membros desta organização
    const users = await prisma.user.findMany({
      where: {
        id: {
          notIn: memberUserIds,
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        emailVerified: true,
        createdAt: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return users;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return [];
  }
};

/**
 * Obtém todos os usuários do sistema
 * @returns Lista completa de usuários
 */
export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            members: true,
            sessions: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return users;
  } catch (error) {
    console.error("Erro ao buscar todos os usuários:", error);
    return [];
  }
};

/**
 * Obtém um usuário por ID
 * @param userId - ID do usuário
 * @returns Dados completos do usuário ou null se não encontrado
 */
export const getUserById = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        members: {
          include: {
            organization: true,
          },
        },
        accounts: {
          select: {
            id: true,
            providerId: true,
            createdAt: true,
          },
        },
        sessions: {
          select: {
            id: true,
            createdAt: true,
            expiresAt: true,
            ipAddress: true,
            userAgent: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 5, // Últimas 5 sessões
        },
        _count: {
          select: {
            members: true,
            sessions: true,
            invitations: true,
          },
        },
      },
    });

    return user;
  } catch (error) {
    console.error("Erro ao buscar usuário por ID:", error);
    return null;
  }
};

/**
 * Atualiza dados do usuário
 * @param userId - ID do usuário
 * @param data - Dados para atualizar
 * @returns Usuário atualizado ou null em caso de erro
 */
export const updateUser = async (
  userId: string,
  data: {
    name?: string;
    email?: string;
    image?: string;
    emailVerified?: boolean;
  },
) => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...data,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        emailVerified: true,
        updatedAt: true,
      },
    });

    return updatedUser;
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return null;
  }
};

/**
 * Verifica se um email já está em uso
 * @param email - Email para verificar
 * @param excludeUserId - ID do usuário para excluir da verificação (útil para updates)
 * @returns true se o email já está em uso, false caso contrário
 */
export const isEmailInUse = async (email: string, excludeUserId?: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
        ...(excludeUserId && {
          id: {
            not: excludeUserId,
          },
        }),
      },
      select: {
        id: true,
      },
    });

    return !!user;
  } catch (error) {
    console.error("Erro ao verificar email:", error);
    return false;
  }
};

/**
 * Obtém estatísticas dos usuários
 * @returns Estatísticas dos usuários do sistema
 */
export const getUserStats = async () => {
  try {
    const [totalUsers, verifiedUsers, usersWithOrganizations, recentUsers] =
      await Promise.all([
        prisma.user.count(),
        prisma.user.count({
          where: {
            emailVerified: true,
          },
        }),
        prisma.user.count({
          where: {
            members: {
              some: {},
            },
          },
        }),
        prisma.user.count({
          where: {
            createdAt: {
              gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Últimos 30 dias
            },
          },
        }),
      ]);

    return {
      total: totalUsers,
      verified: verifiedUsers,
      withOrganizations: usersWithOrganizations,
      recent: recentUsers,
      verificationRate: totalUsers > 0 ? (verifiedUsers / totalUsers) * 100 : 0,
    };
  } catch (error) {
    console.error("Erro ao obter estatísticas dos usuários:", error);
    return {
      total: 0,
      verified: 0,
      withOrganizations: 0,
      recent: 0,
      verificationRate: 0,
    };
  }
};
