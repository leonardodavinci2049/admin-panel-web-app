# 🚀 Admin Panel Web App

> **Painel Administrativo Empresarial** construído com Next.js 15 para gerenciamento completo de e-commerce

[![Next.js](https://img.shields.io/badge/Next.js-15.5.3-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.16.2-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)

## 📋 Sobre o Projeto

**Admin Panel Web App** é um sistema completo de gerenciamento administrativo para e-commerce, desenvolvido com as mais modernas tecnologias do ecossistema React/Next.js. O projeto oferece uma interface intuitiva e poderosa para administração de:

- 📦 **Produtos**: Catálogo, categorias, estoque e precificação
- 👥 **Clientes**: Registro, relacionamentos e histórico
- 🛒 **Pedidos**: Vendas, status, pagamentos e entregas
- 🔐 **Usuários**: Autenticação, permissões e perfis
- 📊 **Relatórios**: Analytics, métricas e dashboards

## ✨ Principais Funcionalidades

- 🎨 **Interface Moderna**: Design responsivo com Tailwind CSS v4 e Shadcn/UI
- 🔒 **Autenticação Robusta**: BetterAuth com Prisma Adapter
- 📱 **Mobile-First**: Totalmente responsivo para todos os dispositivos
- 🌙 **Dark/Light Mode**: Suporte completo a temas
- ⚡ **Performance Otimizada**: Server Components e Turbopack
- 🔍 **Busca Avançada**: Filtros e ordenação em todas as listagens
- 📊 **Dashboards Interativos**: Gráficos e métricas em tempo real
- 🛡️ **Segurança**: Validação com Zod e proteção CSRF
- 🌐 **Internacionalização**: Suporte para múltiplos idiomas

## 🛠️ Stack Tecnológica

### **Frontend**

- **Next.js 15** - App Router com Turbopack
- **React 19** - Server Components (RSC)
- **TypeScript 5** - Tipagem estática
- **Tailwind CSS v4** - Estilização utilitária
- **Shadcn/UI** - Componentes base
- **Radix UI** - Primitivos acessíveis

### **Backend**

- **MySQL** - Banco de dados principal
- **Prisma** - ORM moderno
- **MySQL2** - Conexões diretas e procedures
- **BetterAuth** - Sistema de autenticação
- **Zod** - Validação de schemas

### **UI/UX**

- **Lucide React** - Ícones modernos
- **Tabler Icons** - Ícones adicionais
- **Next Themes** - Gerenciamento de temas
- **Vaul** - Drawers mobile
- **Recharts** - Visualizações de dados
- **TanStack Table** - Tabelas avançadas

## 📁 Estrutura do Projeto

```
src/
├── app/                     # App Router (Next.js 15)
│   ├── (auth)/             # Grupo de rotas de autenticação
│   ├── dashboard/          # Painel principal
│   │   ├── product/        # Gerenciamento de produtos
│   │   ├── customer/       # Gerenciamento de clientes
│   │   ├── orders/         # Gerenciamento de pedidos
│   │   └── settings/       # Configurações
│   └── api/                # API Routes
├── components/             # Componentes reutilizáveis
│   ├── dashboard/          # Componentes do dashboard
│   ├── ui/                 # Shadcn/UI components
│   └── common/             # Componentes comuns
├── lib/                    # Bibliotecas e utilitários
├── services/               # Serviços de dados
├── hooks/                  # Hooks customizados
├── types/                  # Definições de tipos
└── utils/                  # Utilitários diversos
```

## 🚀 Início Rápido

### **Pré-requisitos**

- Node.js 18.17+
- MySQL 8.0+
- Git

### **Instalação**

1. **Clone o repositório**

   ```bash
   git clone https://github.com/leonardodavinci2049/admin-panel-web-app.git
   cd admin-panel-web-app
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**

   ```bash
   cp .env.example .env.local
   ```

   Edite o arquivo `.env.local` com suas configurações:

   ```env
   # Application
   APP_PORT=5555

   # Database
   DATABASE_URL="mysql://user:password@localhost:3306/database_name"

   # Auth
   BETTER_AUTH_SECRET=your_secret_key
   BETTER_AUTH_URL=http://localhost:5555

   # Email (opcional)
   RESEND_API_KEY=your_resend_api_key
   ```

4. **Configure o banco de dados**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Inicie o servidor de desenvolvimento**

   ```bash
   npm run dev
   ```

6. **Acesse a aplicação**

   Abra [http://localhost:5555](http://localhost:5555) no seu navegador

## 📜 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento (porta 5555)
- `npm run build` - Cria build otimizada para produção
- `npm run start` - Inicia o servidor em modo produção
- `npm run lint` - Executa verificação de código com ESLint

## 🔧 Configuração do Banco de Dados

### **Schema Principal**

O projeto utiliza um schema MySQL otimizado para e-commerce:

- `tbl_produto` - Produtos e variações
- `tbl_categoria` - Categorias hierárquicas
- `tbl_pessoa` - Clientes e usuários
- `tbl_pedido` - Pedidos e transações
- `tbl_usuario` - Sistema de usuários

### **Prisma Client**

O cliente Prisma é gerado automaticamente em `/generated/prisma` e inclui:

- Tipagem automática TypeScript
- Query builder otimizado
- Conexão pool management
- Validação de dados integrada

## 🎨 Customização de Temas

O projeto suporta temas customizáveis através do sistema de CSS Variables:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --secondary: 240 4.8% 95.9%;
  /* ... mais variáveis */
}
```

## 🔒 Autenticação e Segurança

- **BetterAuth** com Prisma Adapter para persistência
- **Proteção CSRF** automática
- **Validação de entrada** com Zod em todas as APIs
- **Sanitização XSS** nos dados de entrada
- **Prevenção SQL Injection** via Prisma ORM

## 📊 Dashboard e Analytics

O painel oferece visualizações abrangentes:

- **Métricas de vendas** em tempo real
- **Gráficos interativos** com Recharts
- **Tabelas avançadas** com ordenação e filtros
- **Relatórios exportáveis** em PDF/Excel
- **Alertas e notificações** automáticas

## 🚀 Deploy e Produção

### **Vercel (Recomendado)**

1. Conecte seu repositório GitHub à Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### **Docker**

```bash
# Build da imagem
docker build -t admin-panel .

# Executar container
docker run -p 3000:3000 admin-panel
```

## 📚 Documentação Adicional

- [Guia de Contribuição](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)
- [Documentação da API](docs/api.md)
- [Guia de Deploy](docs/deployment.md)

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Por favor, leia nosso [guia de contribuição](CONTRIBUTING.md) para saber como contribuir com o projeto.

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Desenvolvedor

**Leonardo Da Vinci**

- GitHub: [@leonardodavinci2049](https://github.com/leonardodavinci2049)
- LinkedIn: [Leonardo Da Vinci](https://linkedin.com/in/leonardodavinci2049)

---

<div align="center">

**Desenvolvido com ❤️ usando Next.js 15**

[⬆ Voltar ao topo](#-admin-panel-web-app)

</div>
