# OSTRICH
Open Source Tracking and Recon Intelligence for Cyber Hunting
<div align="center">
   <img src="app/icon.svg" alt="OSTRICH Icon" width="150" height="150">
</div>


## Table of Contents
- [Demo Video](#demo-video)
- [Table of Contents](#table-of-contents)
- [Project Setup](#project-setup)
- [Project Overview](#project-overview)
  - [Built in Admin credentials:](#built-in-admin-credentials)
  - [Development Environment](#development-environment)
- [Architecture Overview](#architecture-overview)
- [Technology Stack](#technology-stack)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Development Tools](#development-tools)
- [Project Structure](#project-structure)


## Demo Video
[OSTRICH Demo Video](https://drive.google.com/file/d/1Q44rG2tt-xCHtueihPQoP-KC2X5Nwu_i/view?usp=sharing)

## Project Setup
To set up the project and get it running, you will need the following requirements installed:
- A **Node Package Manager** (e.g. npm, pnpm, bun)

Run the following command
```bash
npm ci
```

To get the development environment running, run the following command
```bash
npm run dev
```


To set up a custom JWT_SECRET, create a `.env.local` file and set it as follows:
```env
JWT_SECRET=your_secure_jwt_secret
```

## Project Overview
### Built in Admin credentials:
- **Username**: `admin`
- **Password**: `admin123`
  
These credentials are generated upon the build of the application and are stored in the SQLite database. The password is hashed using bcryptjs for security.

### Development Environment

OSTRICH (Open Source Tracking and Recon Intelligence for Cyber Hunting) is a comprehensive cybersecurity platform designed to fulfill the requirements of the CSCI 3230U Web Development course project. The application integrates multiple security tools and techniques into a unified interface for network reconnaissance, vulnerability scanning, and threat intelligence gathering.

This project demonstrates mastery of web development concepts including:
- SVG and HTML for interactive visualizations
- CSS and CSS frameworks (Tailwind CSS)
- JavaScript, jQuery, and D3.js for dynamic data visualization
- Dynamic DOM manipulation
- AJAX and web services integration
- Node.js/Express.js backend implementation
- Client-side framework (Next.js with React)
- SQLite database integration
- JWT-based authentication

## Architecture Overview

OSTRICH is built on a modern web application architecture using Next.js as the full-stack framework. The application follows a hybrid rendering approach with both server-side and client-side components.

The architecture implements a clear separation of concerns:

1. **Client-side Layer**: Handles UI rendering, state management, and user interactions
2. **Server-side Layer**: Manages API routes, authentication, and server-side rendering
3. **Database Layer**: Handles data persistence and retrieval

## Technology Stack

### Frontend
- **Next.js**: React framework for server and client components
- **React**: UI library for component-based development
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Component library built on Radix UI primitives
- **D3.js**: Data visualization library for interactive charts
- **Lucide React**: Icon library

### Backend
- **Next.js API Routes**: Server-side API endpoints
- **better-sqlite3**: SQLite database driver
- **bcryptjs**: Password hashing library
- **jose**: JWT implementation for authentication
- **axios**: HTTP client for external API requests
- **whois-json**: WHOIS data retrieval

### Development Tools
- **TypeScript**: Static typing for JavaScript
- **ESLint**: Code linting
- **Node.js**: JavaScript runtime

## Project Structure

The project follows the Next.js App Router structure with the following organization:

- **app/**: Next.js App Router
  - **api/**: API Routes
  - **about/**: About page
  - **layout.tsx**: Root layout
  - **page.tsx**: Home page
- **components/**: React components
  - **charts/**: Data visualization components
  - **osint/**: OSINT result components
  - **ui/**: UI components (shadcn)
  - **\*.tsx**: Various feature components
- **lib/**: Utility functions and libraries
  - **api.ts**: API client functions
  - **auth.ts**: Authentication utilities
  - **db.ts**: Database connection and queries
  - **osint-tools.ts**: OSINT collection tools
  - **security-tools.ts**: Security scanning tools
  - **utils.ts**: General utilities
- **data/**: Database files
- **middleware.ts**: Next.js middleware for auth
- **package.json**: Dependencies and scripts
- **tsconfig.json**: TypeScript configuration
