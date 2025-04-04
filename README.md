# Ratamoth Chocolate E-commerce Platform

A full-stack e-commerce application specializing in premium chocolate products with customization options.

![Project Logo](https://via.placeholder.com/150x150?text=Ratamoth)

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
- **Custom Chocolate Creator**: Design personalized chocolate products
- **Shopping Cart**: Add products, manage quantities, and checkout
- **User Authentication**: Register, login, and profile management
- **Order Management**: Track order status and history
- **Admin Dashboard**: Manage products, orders, and customer information
- **Responsive Design**: Optimized for mobile, tablet, and desktop

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

### Development Tools
- **Git** - Version control
- **ESLint** - Code linting
- **Jest** - Testing
- **GitHub Actions** - CI/CD

## 📁 Project Structure

Below is the recommended project structure that follows best practices for scalability and maintainability:

```
/WebProject/
├── server/                     # Backend server
│   ├── src/                    # Source files
│   │   ├── api/                # API endpoints organization
│   │   │   ├── routes/         # Route definitions
│   │   │   └── controllers/    # Request handlers
│   │   ├── config/             # Configuration files
│   │   ├── constants/          # Application constants
│   │   ├── db/                 # Database related code
│   │   │   ├── models/         # Data models
│   │   │   ├── migrations/     # Database migration scripts
│   │   │   └── seeds/          # Seed data for development
│   │   ├── middleware/         # Express middleware
│   │   ├── services/           # Business logic services
│   │   ├── types/              # TypeScript type definitions
│   │   ├── utils/              # Utility functions
│   │   ├── app.ts              # Express application configuration
│   │   └── index.ts            # Server entry point
│   ├── tests/                  # Backend tests
│   └── dist/                   # Compiled JavaScript output
│
├── front/                      # Frontend application
│   ├── public/                 # Static public assets
│   ├── src/                    # Source files
│   │   ├── assets/             # Static assets (images, fonts)
│   │   ├── components/         # React components
│   │   │   ├── layout/         # Layout components (Header, Footer)
│   │   │   ├── ui/             # Reusable UI components
│   │   │   └── features/       # Feature-specific components
│   │   ├── constants/          # Frontend constants
│   │   ├── contexts/           # React contexts for state management
│   │   ├── hooks/              # Custom React hooks
│   │   ├── pages/              # Page components
│   │   ├── services/           # API service integrations
│   │   │   ├── api/            # API clients
│   │   │   └── storage/        # Local storage services
│   │   ├── types/              # TypeScript type definitions
│   │   ├── utils/              # Utility functions
│   │   │   ├── func/           # Functional utilities
│   │   │   └── 3d/             # Three.js utilities
│   │   ├── App.tsx             # Main App component
│   │   └── main.tsx            # Application entry point
│   └── tests/                  # Frontend tests
│
├── shared/                     # Shared code between frontend and backend
│   ├── types/                  # Shared TypeScript interfaces
│   ├── constants/              # Shared constants
│   └── utils/                  # Shared utilities
│
├── database/                   # Database scripts and schema
│   └── ratamoth_db.sql         # Main database schema
│
├── docs/                       # Project documentation
│   ├── api/                    # API documentation
│   ├── architecture/           # Architecture diagrams
│   └── guides/                 # User and developer guides
│
├── scripts/                    # Utility scripts
│
├── .github/                    # GitHub configuration
│   └── workflows/              # GitHub Actions workflows
│
├── .gitignore                  # Git ignore patterns
├── .env.example                # Example environment variables
└── README.md                   # Project documentation
```

### Key Recommendations:

#### Server Organization
- **api folder**: Separates routes and controllers for better organization
- **services folder**: Contains business logic independent of controllers
- **db folder**: Groups all database-related code together

#### Frontend Organization
- **features folder**: Groups components by business features
- **services folder**: Separates API and local storage services
- **utils folder**: Organizes utilities by domain (functional, 3D rendering)

#### Shared Code
The `shared` directory helps avoid code duplication between frontend and backend:
- Use this for interfaces, constants, and utilities needed in both areas
- Ensures consistency in data structures across the application

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

