# Ratamoth Chocolate E-commerce Platform

A full-stack e-commerce application specializing in chocolate products with customization options.

## Project Overview

This web application provides a platform for selling chocolate products online, with features including product browsing, custom chocolate creation, shopping cart functionality, order processing, and admin management.

## Project Structure

```
/WebProject/
├── server/                     # Backend server (Node.js + Express + TypeScript)
│   ├── src/                    # Source files
│   │   ├── controllers/        # Business logic for API endpoints
│   │   ├── routes/             # API route definitions
│   │   ├── middleware/         # Express middleware
│   │   ├── types/              # TypeScript type definitions
│   │   ├── services/           # Business logic services
│   │   ├── utils/              # Utility functions and helpers
│   │   ├── config/             # Configuration files
│   │   ├── models/             # Data models and database schemas
│   │   ├── app.ts              # Express application configuration
│   │   └── index.ts            # Server entry point
│   ├── tests/                  # Backend tests
│   │   ├── unit/               # Unit tests
│   │   ├── integration/        # Integration tests
│   │   └── e2e/                # End-to-end tests
│   └── dist/                   # Compiled JavaScript output
│
├── front/                      # Frontend application (React + TypeScript + Vite)
│   ├── src/                    # Source files
│   │   ├── assets/             # Static assets (images, fonts, etc.)
│   │   │   ├── images/         # Image files
│   │   │   ├── fonts/          # Font files
│   │   │   └── styles/         # Global styles
│   │   ├── components/         # Reusable UI components
│   │   │   ├── layout/         # Layout components (Header, Footer, etc.)
│   │   │   ├── ui/             # Core UI components with Chakra UI
│   │   │   ├── common/         # Common components used across pages
│   │   │   └── features/       # Feature-specific components
│   │   ├── hooks/              # Custom React hooks
│   │   ├── contexts/           # React context providers
│   │   ├── pages/              # Page components
│   │   ├── utils/              # Utility functions
│   │   ├── services/           # API service integrations
│   │   ├── types/              # TypeScript type definitions
│   │   ├── constants/          # Application constants
│   │   ├── App.tsx             # Main App component
│   │   └── main.tsx            # Application entry point
│   ├── public/                 # Static public assets
│   └── tests/                  # Frontend tests
│
├── shared/                     # Shared code between frontend and backend
│   ├── types/                  # Shared TypeScript interfaces
│   ├── constants/              # Shared constants
│   └── utils/                  # Shared utilities
│
├── database/                   # Database schemas and scripts
│   ├── migrations/             # Database migration scripts
│   ├── seeds/                  # Seed data for development
│   └── ratamoth_db.sql         # Main database schema
│
├── docs/                       # Project documentation
│   ├── api/                    # API documentation
│   ├── architecture/           # Architecture diagrams and docs
│   ├── guides/                 # Developer guides and user manuals
│   └── images/                 # Documentation images
│
├── scripts/                    # Utility scripts for development
│   ├── setup.sh                # Setup script
│   ├── build.sh                # Build script
│   └── deploy.sh               # Deployment script
│
├── .github/                    # GitHub configuration
│   └── workflows/              # GitHub Actions workflows
│
├── .vscode/                    # VS Code configuration
│
├── .gitignore                  # Git ignore patterns
├── .env.example                # Example environment variables
└── README.md                   # Project documentation
```

## Key Components

### Shared Code (/shared)
The new `shared` directory contains code shared between frontend and backend:
- **types/**: Common TypeScript interfaces used in both front and back-end
- **constants/**: Shared constants like API endpoints, error codes, etc.
- **utils/**: Common utility functions

### Improved Frontend Structure (/front)
- **assets/**: Organized storage for static assets
- **components/features/**: Components organized by feature
- **contexts/**: React context providers for state management
- **hooks/**: Custom React hooks for reusable logic
- **services/**: API service integrations

### Enhanced Backend Structure (/server)
- **services/**: Business logic extracted from controllers
- **utils/**: Helper functions and utilities
- **config/**: Configuration management
- **models/**: Data models and schemas

### Documentation (/docs)
Comprehensive documentation including:
- API documentation
- Architecture diagrams
- User and developer guides

## Technologies Used

### Backend
- Node.js with TypeScript
- Express.js
- MySQL database

### Frontend
- React with TypeScript
- Vite build tool
- Chakra UI for components
- React Router for navigation

### Development Tools
- Git for version control
- GitHub Actions for CI/CD
- VS Code for development

## Setup Instructions

### Prerequisites
- Node.js (v16+ recommended)
- MySQL (v8+ recommended)
- npm or yarn

### Database Setup
1. Install MySQL if not already installed
2. Run the database script to create the schema and tables:
   ```
   mysql -u your_username -p < database/ratamoth_db.sql
   ```

### Backend Setup
1. Navigate to the server directory:
   ```
   cd server
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with your configuration:
   ```
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=ratamoth_db
   PORT=3000
   ```
4. Build and start the server:
   ```
   npm run build
   npm start
   ```

### Frontend Setup
1. Navigate to the front directory:
   ```
   cd front
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file for API configuration:
   ```
   VITE_API_URL=http://localhost:3000/api
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## Development Guidelines

### Code Organization
- Follow the folder structure described above
- Place shared types in the `/shared/types` directory
- Organize components by feature when possible

### Naming Conventions
- Use PascalCase for React components
- Use camelCase for variables, functions, and file names (except React component files)
- Use kebab-case for CSS class names and CSS files

### Git Workflow
- Use feature branches for development
- Submit pull requests for code reviews
- Follow conventional commits for commit messages

## Contributors

[Pakawat Sanboonsri]

