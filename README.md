# 🚀 Admin Panel Web App

> **Enterprise Administrative Dashboard** built with Next.js 15 for complete e-commerce management

[![Next.js](https://img.shields.io/badge/Next.js-15.5.3-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.16.2-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)

## 📋 About The Project

**Admin Panel Web App** is a complete e-commerce administrative management system, developed with the most modern technologies from the React/Next.js ecosystem. The project offers an intuitive and powerful interface for managing:

- 📦 **Products**: Catalog, categories, inventory and pricing
- 👥 **Customers**: Registration, relationships and history
- 🛒 **Orders**: Sales, status, payments and deliveries
- 🔐 **Users**: Authentication, permissions and profiles
- 📊 **Reports**: Analytics, metrics and dashboards

## ✨ Key Features

- 🎨 **Modern Interface**: Responsive design with Tailwind CSS v4 and Shadcn/UI
- 🔒 **Robust Authentication**: BetterAuth with Prisma Adapter
- 📱 **Mobile-First**: Fully responsive for all devices
- 🌙 **Dark/Light Mode**: Complete theme support
- ⚡ **Optimized Performance**: Server Components and Turbopack
- 🔍 **Advanced Search**: Filters and sorting on all listings
- 📊 **Interactive Dashboards**: Real-time charts and metrics
- 🛡️ **Security**: Zod validation and CSRF protection
- 🌐 **Internationalization**: Multi-language support

## 🛠️ Technology Stack

### **Frontend**

- **Next.js 15** - App Router with Turbopack
- **React 19** - Server Components (RSC)
- **TypeScript 5** - Static typing
- **Tailwind CSS v4** - Utility-first styling
- **Shadcn/UI** - Base components
- **Radix UI** - Accessible primitives

### **Backend**

- **MySQL** - Primary database
- **Prisma** - Modern ORM
- **MySQL2** - Direct connections and procedures
- **BetterAuth** - Authentication system
- **Zod** - Schema validation

### **UI/UX**

- **Lucide React** - Modern icons
- **Tabler Icons** - Additional icons
- **Next Themes** - Theme management
- **Vaul** - Mobile drawers
- **Recharts** - Data visualizations
- **TanStack Table** - Advanced tables

## 📁 Project Structure

```
src/
├── app/                     # App Router (Next.js 15)
│   ├── (auth)/             # Authentication route group
│   ├── dashboard/          # Main dashboard
│   │   ├── product/        # Product management
│   │   ├── customer/       # Customer management
│   │   ├── orders/         # Order management
│   │   └── settings/       # Settings
│   └── api/                # API Routes
├── components/             # Reusable components
│   ├── dashboard/          # Dashboard components
│   ├── ui/                 # Shadcn/UI components
│   └── common/             # Common components
├── lib/                    # Libraries and utilities
├── services/               # Data services
├── hooks/                  # Custom hooks
├── types/                  # Type definitions
└── utils/                  # Miscellaneous utilities
```

## 🚀 Getting Started

### **Prerequisites**

- Node.js 18.17+
- MySQL 8.0+
- Git

### **Installation**

1. **Clone the repository**

   ```bash
   git clone https://github.com/leonardodavinci2049/admin-panel-web-app.git
   cd admin-panel-web-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit the `.env.local` file with your settings:

   ```env
   # Application
   APP_PORT=5555

   # Database
   DATABASE_URL="mysql://user:password@localhost:3306/database_name"

   # Auth
   BETTER_AUTH_SECRET=your_secret_key
   BETTER_AUTH_URL=http://localhost:5555

   # Email (optional)
   RESEND_API_KEY=your_resend_api_key
   ```

4. **Setup the database**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Access the application**

   Open [http://localhost:5555](http://localhost:5555) in your browser

## � Available Scripts

- `npm run dev` - Start development server (port 5555)
- `npm run build` - Create optimized production build
- `npm run start` - Start server in production mode
- `npm run lint` - Run code linting with ESLint

## 🔧 Database Configuration

### **Main Schema**

The project uses a MySQL schema optimized for e-commerce:

- `tbl_produto` - Products and variations
- `tbl_categoria` - Hierarchical categories
- `tbl_pessoa` - Customers and users
- `tbl_pedido` - Orders and transactions
- `tbl_usuario` - User system

### **Prisma Client**

The Prisma client is automatically generated in `/generated/prisma` and includes:

- Automatic TypeScript typing
- Optimized query builder
- Connection pool management
- Integrated data validation

## 🎨 Theme Customization

The project supports customizable themes through the CSS Variables system:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --secondary: 240 4.8% 95.9%;
  /* ... more variables */
}
```

## 🔒 Authentication and Security

- **BetterAuth** with Prisma Adapter for persistence
- **Automatic CSRF protection**
- **Input validation** with Zod on all APIs
- **XSS sanitization** on input data
- **SQL Injection prevention** via Prisma ORM

## 📊 Dashboard and Analytics

The dashboard offers comprehensive visualizations:

- **Real-time sales metrics**
- **Interactive charts** with Recharts
- **Advanced tables** with sorting and filters
- **Exportable reports** in PDF/Excel
- **Automatic alerts and notifications**

## 🚀 Deploy and Production

### **Vercel (Recommended)**

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Automatic deployment on every push

### **Docker**

```bash
# Build image
docker build -t admin-panel .

# Run container
docker run -p 3000:3000 admin-panel
```

## 📚 Additional Documentation

- [Contributing Guide](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)
- [API Documentation](docs/api.md)
- [Deployment Guide](docs/deployment.md)

## 🤝 Contributing

Contributions are always welcome! Please read our [contributing guide](CONTRIBUTING.md) to learn how to contribute to the project.

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is under the MIT license. See the [LICENSE](LICENSE) file for more details.

## 👨‍💻 Developer

**Leonardo Da Vinci**

- GitHub: [@leonardodavinci2049](https://github.com/leonardodavinci2049)
- LinkedIn: [Leonardo Da Vinci](https://linkedin.com/in/leonardodavinci2049)

---

<div align="center">

**Built with ❤️ using Next.js 15**

[⬆ Back to top](#-admin-panel-web-app)

</div>
