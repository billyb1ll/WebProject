# RataMoth Web Project

A full-stack e-commerce application for selling chocolate products with customization options.

## Project Overview

This project is a web application that allows users to browse and purchase chocolate products, including custom chocolate creations. The application includes an admin panel for managing products, orders, and customers.

## Tech Stack

### Backend
- Node.js + Express
- TypeScript
- MySQL database

### Frontend
- React
- CSS

## Project Structure

```
WebProject/
├── server/           # Express backend with TypeScript
│   ├── src/          # Source code
│   ├── dist/         # Compiled JavaScript
│   └── ...
├── front/            # React frontend
│   ├── src/          # Source code
│   ├── public/       # Static files
│   └── ...
├── database/         # Database schema and scripts
│   └── ratamoth_db.sql
└── doc/              # API documentation
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- MySQL

### Backend Setup

1. Navigate to the server directory
```bash
cd server
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file based on the example
```bash
cp .env.example .env
```

4. Build the TypeScript code
```bash
npm run build
```

5. Start the development server
```bash
npm run dev
```

The server will be running at http://localhost:3001

### Frontend Setup

1. Navigate to the front directory
```bash
cd front
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

The application will be running at http://localhost:3000

### Database Setup

1. Create the database using the provided SQL script
```bash
mysql -u root -p < database/ratamoth_db.sql
```

## Development

### Server

- `npm run build` - Build the TypeScript code
- `npm start` - Start the production server
- `npm run dev` - Start the development server
- `npm run watch` - Start the development server with hot reload

### Frontend

- `npm start` - Start the development server
- `npm run build` - Build for production
- `npm test` - Run tests

## Features

- Product catalog with categories
- Custom chocolate creation
- Admin panel for product management
- Order processing and tracking
- Customer management
- Payment processing
