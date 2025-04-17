# Ratamoth Chocolate E-commerce Platform

A full-stack e-commerce application specializing in premium chocolate products with customization options.

![Project Logo](https://via.placeholder.com/150x150?text=Ratamoth)

> Last updated: April 17, 2025

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Development Guidelines](#development-guidelines)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🔍 Project Overview

Ratamoth Chocolate is an e-commerce platform that allows customers to browse and purchase premium chocolate products. The platform features a unique custom chocolate creator that enables users to design personalized chocolate gifts by selecting base chocolate types, shapes, toppings, and packaging options.

## ✨ Features

- **Product Catalog**: Browse chocolate products with detailed information
- **Custom Chocolate Creator**: Design personalized chocolate products with 3D visualization
- **Shopping Cart**: Add products, manage quantities, and checkout
- **User Authentication**: Register, login, and profile management
- **Order Management**: Track order status and history
- **Admin Dashboard**: Manage products, orders, and customer information
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Multi-language Support**: Available in multiple languages

## 🛠️ Technology Stack

### Backend
- **Node.js** with **TypeScript** - Server runtime and language
- **Express.js** - Web framework
- **MySQL** - Database
- **JWT** - Authentication

### Frontend
- **React** with **TypeScript** - UI library
- **Vite** - Build tool
- **Chakra UI** - Component library
- **React Router** - Navigation
- **Three.js** - 3D visualization for chocolate customization
- **React Hook Form** - Form handling
- **Tanstack Query** - Data fetching and caching

### Development Tools
- **Git** - Version control
- **ESLint** - Code linting with TypeScript support
- **Jest** - Testing
- **GitHub Actions** - CI/CD

## 📁 Project Structure

Below is the updated project structure that reflects the current workspace organization:

```
/WebProject/
├── database/                   # Database scripts and mock data
│   ├── mock_data.sql           # Mock data for testing
│   └── ratamoth_db.sql         # Main database schema
│
├── doc/                        # Documentation files
│   └── api-documentation.yml   # API documentation in YAML format
│
├── front/                      # Frontend application
│   ├── public/                 # Static public assets
│   │   └── vite.svg            # Vite logo
│   ├── src/                    # Source files
│   │   ├── assets/             # Static assets (images, models, textures)
│   │   │   ├── models/         # 3D models for chocolates
│   │   │   └── textures/       # Textures for chocolates and toppings
│   │   ├── components/         # React components
│   │   │   ├── common/         # Common reusable components
│   │   │   ├── features/       # Feature-specific components
│   │   │   ├── layout/         # Layout components (Header, Footer, etc.)
│   │   │   └── ui/             # Reusable UI components
│   │   ├── constants/          # Frontend constants
│   │   ├── contexts/           # React contexts for state management
│   │   ├── hooks/              # Custom React hooks
│   │   ├── pages/              # Page components
│   │   ├── services/           # API service integrations and mock data
│   │   │   ├── api/            # API clients
│   │   │   └── mock/           # Mock data for development
│   │   ├── types/              # TypeScript type definitions
│   │   ├── utils/              # Utility functions
│   │   │   ├── 3d/             # Three.js utilities
│   │   │   └── func/           # Functional utilities
│   │   ├── App.tsx             # Main App component
│   │   └── main.tsx            # Application entry point
│   ├── eslint.config.js        # ESLint configuration
│   ├── tsconfig.json           # TypeScript configuration
│   ├── vite.config.ts          # Vite configuration
│   └── README.md               # Frontend-specific README
│
├── server/                     # Backend server
│   ├── src/                    # Source files
│   │   ├── config/             # Configuration files
│   │   ├── constants/          # Backend constants
│   │   ├── controllers/        # Request handlers
│   │   ├── middleware/         # Express middleware
│   │   ├── routes/             # Route definitions
│   │   ├── types/              # TypeScript type definitions
│   │   └── utils/              # Utility functions
│   ├── package.json            # Backend dependencies
│   └── tsconfig.json           # TypeScript configuration
│
├── README.md                   # Project documentation
└── .gitignore                  # Git ignore patterns
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16+ recommended)
- MySQL (v8+ recommended)
- Git

### Database Setup
1. Install MySQL if not already installed
2. Create a database named `ratamoth_db`
3. Run the database script to create the schema and tables:
   ```bash
   mysql -u your_username -p ratamoth_db < database/ratamoth_db.sql
   ```

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   # Then edit the .env file with your configuration
   ```
4. Build and start the server:
   ```bash
   npm run build
   npm start
   ```
   For development with auto-reload:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the front directory:
   ```bash
   cd front
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file for API configuration:
   ```bash
   cp .env.example .env
   # Then edit the .env file with your configuration
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Access the application at `http://localhost:5173`

## 💻 Development Guidelines

### Code Style
- Follow TypeScript best practices
- Use ESLint for code linting
- Format code with Prettier
- Write meaningful comments and documentation

### Naming Conventions
- **Components**: PascalCase (e.g., `ProductCard.tsx`)
- **Hooks**: camelCase with 'use' prefix (e.g., `useCart.ts`)
- **Interfaces/Types**: PascalCase (e.g., `Product.ts`)
- **CSS classes**: kebab-case (e.g., `product-card`)

### Git Workflow
1. Create feature branches from `develop` branch
   ```bash
   git checkout develop
   git pull
   git checkout -b feature/my-feature
   ```
2. Make commits with descriptive messages following conventional commits
   ```bash
   git commit -m "feat: add chocolate customization component"
   ```
3. Submit PR to `develop` branch
4. After review and approval, merge to `develop`
5. Periodically merge `develop` into `main` for releases

### Testing Strategy
- Write unit tests for utilities and hooks
- Create component tests for UI elements
- Implement integration tests for API endpoints
- Run tests before submitting PRs

## 📖 API Documentation

API documentation is available at `/docs/api/README.md`

## 🌐 Deployment

### Production Build
1. Frontend:
   ```bash
   cd front
   npm run build
   ```
   The build output will be in the `dist` directory.

2. Backend:
   ```bash
   cd server
   npm run build
   ```
   The build output will be in the `dist` directory.

### Deployment Options
- **Static hosting**: Deploy the frontend to services like Netlify, Vercel, or Firebase
- **Backend hosting**: Deploy the backend to services like Heroku, DigitalOcean, or AWS

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Created by [Pakawat Sanboonsri] - Feel free to contact me for any inquiries.

