"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  HelpCircle,
  Map,
  PieChart,
  Search,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/dashboard/sidebar/components/nav-main";
import { NavProjects } from "@/components/dashboard/sidebar/components/nav-projects";
import { NavSecondary } from "@/components/dashboard/sidebar/components/nav-secondary";
import { TeamSwitcher } from "@/components/dashboard/sidebar/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useTranslation } from "@/hooks/use-translation";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { t } = useTranslation();

  // This is sample data.
  const data = {
    teams: [
      {
        name: "Acme Inc",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
      },
      {
        name: "Acme Corp.",
        logo: AudioWaveform,
        plan: "Startup",
      },
      {
        name: "Evil Corp.",
        logo: Command,
        plan: "Free",
      },
    ],
    navMain: [
      {
        title: t("dashboard.navigation.products"),
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "Catalogo",
            url: "/dashboard/product/catalog",
          },
          {
            title: "Detalhe do Produto",
            url: "/dashboard/product/product-details",
          },
          {
            title: "Novo Produto",
            url: "/dashboard/product/new-product",
          },
        ],
      },
      {
        title: t("dashboard.navigation.categories"),
        url: "#",
        icon: Bot,
        items: [
          {
            title: "Lista de Categorias",
            url: "/dashboard/category/category-list",
          },
          {
            title: "Detalhes da Categoria",
            url: "/dashboard/category/category-details",
          },
          {
            title: "Nova Categoria",
            url: "/dashboard/category/new-category",
          },
        ],
      },
      {
        title: t("dashboard.navigation.customers"),
        url: "#",
        icon: BookOpen,
        items: [
          {
            title: "Lsita de Clientes",
            url: "/dashboard/customer/customer-list",
          },
          {
            title: "Detalhes do Cliente",
            url: "/dashboard/customer/customer-details",
          },
          {
            title: "Novo Cliente",
            url: "/dashboard/customer/new-customer",
          },
          {
            title: "Relatórios",
            url: "/dashboard/customer/customer-reports",
          },
          {
            title: "Cadastros Pendentes",
            url: "/dashboard/customer/pending-registrations",
          },
        ],
      },
      {
        title: t("dashboard.navigation.orders"),
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "Lista de Pedidos",
            url: "/dashboard/orders/order-list",
          },
          {
            title: "Detalhes do Pedido",
            url: "/dashboard/orders/order-details",
          },
          {
            title: "Relatórios de vendas",
            url: "/dashboard/orders/sales-reports",
          },
          {
            title: "Últimos pedidos",
            url: "/dashboard/orders/latest-orders",
          },
        ],
      },
    ],
    projects: [
      {
        name: "Design Engineering",
        url: "#",
        icon: Frame,
      },
      {
        name: "Sales & Marketing",
        url: "#",
        icon: PieChart,
      },
      {
        name: "Travel",
        url: "#",
        icon: Map,
      },
    ],
    navSecondary: [
      {
        title: t("dashboard.navigation.settings"),
        url: "/dashboard/settings",
        icon: Settings2,
      },
      {
        title: "Get Help",
        url: "#",
        icon: HelpCircle,
      },
      {
        title: "Search",
        url: "#",
        icon: Search,
      },
    ],
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>{/* NavUser foi migrado para o header */}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
