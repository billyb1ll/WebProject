# Ratamoth Chocolate E-commerce Platform

A full-stack e-commerce application specializing in chocolate products with customization options.

## Project Overview

This web application provides a platform for selling chocolate products online, with features including product browsing, custom chocolate creation, shopping cart functionality, order processing, and admin management.

## Project Structure

```
/WebProject/
├── server/                     # Backend TypeScript server
│   ├── src/                    # TypeScript source code
│   │   ├── controllers/        # Request handlers
│   │   ├── models/             # Database models
│   │   ├── routes/             # API route definitions
│   │   ├── middleware/         # Express middleware
│   │   ├── services/           # Business logic
│   │   ├── utils/              # Utility functions
│   │   ├── types/              # TypeScript type definitions
│   │   ├── config/             # Configuration files
│   │   └── app.ts              # Express application setup
│   ├── dist/                   # Compiled JavaScript output
│   ├── package.json            # Node.js dependencies
│   ├── tsconfig.json           # TypeScript configuration
│   └── .env                    # Environment variables (not in version control)
│
├── front/                      # React + TypeScript + Vite frontend
│   ├── src/                    # Source files
│   │   ├── components/         # Reusable UI components
│   │   │   ├── common/         # Common components (buttons, inputs, etc.)
│   │   │   ├── layout/         # Layout components (header, footer, etc.)
│   │   │   └── product/        # Product-specific components
│   │   ├── pages/              # Page components
│   │   │   ├── Home/           # Home page
│   │   │   ├── Products/       # Products listing page
│   │   │   ├── CustomDesigner/ # Custom chocolate designer page
│   │   │   ├── Cart/           # Shopping cart page
│   │   │   ├── Checkout/       # Checkout page
│   │   │   └── Admin/          # Admin dashboard pages
│   │   ├── services/           # API services
│   │   ├── hooks/              # Custom React hooks
│   │   ├── store/              # State management
│   │   ├── utils/              # Utility functions
│   │   ├── assets/             # Static assets
│   │   │   ├── images/         # Image files
│   │   │   ├── styles/         # Global styles
│   │   │   └── fonts/          # Font files
│   │   ├── types/              # TypeScript type definitions
│   │   ├── App.tsx             # Main App component
│   │   └── main.tsx            # Entry point
│   ├── public/                 # Public assets
│   ├── index.html              # HTML entry point
│   ├── package.json            # Node.js dependencies
│   ├── tsconfig.json           # TypeScript configuration
│   ├── vite.config.ts          # Vite configuration
│   └── .env                    # Environment variables (not in version control)
│
├── database/                   # Database schemas and scripts
│   ├── ratamoth_db.sql         # MySQL database schema
│   ├── seed_data.sql           # Sample data for development
│   └── migrations/             # Database migrations
│
├── docs/                       # Documentation
│   ├── api/                    # API documentation
│   └── design/                 # Design documents and wireframes
│
├── .gitignore                  # Git ignore file
├── docker-compose.yml          # Docker Compose configuration
├── package.json                # Root package.json for scripts
└── README.md                   # This file
```

## Technologies Used

### Backend
- Node.js with TypeScript
- Express.js (assumed)
- MySQL database

### Frontend
- React with TypeScript
- Vite build tool
- Modern ESLint configuration

### Database
- MySQL with tables for:
  - Products and product images
  - Admin users
  - Customers
  - Orders and order items
  - Payments
  - Custom chocolate options
  - Packaging options

## Features

- Product catalog with categories and search
- Custom chocolate designer
- Shopping cart and checkout process
- Order management
- Admin dashboard for inventory and order management
- Payment processing

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

## Development

- Backend server runs on: http://localhost:3000
- Frontend development server runs on: http://localhost:5173


## Contributors

[Pakawat Sanboonsri]

