# OSTRICH - Open Source Tracking and Recon Intelligence for Cyber Hunting

## Technical Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture Overview](#architecture-overview)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)

## Project Overview

### Development Environment

To set up the development environment:

1. Clone the repository
2. Install dependencies: `npm ci`
3. Set up environment variables in `.env.local`: `JWT_SECRET=your_secure_jwt_secret` (not necessary for local development)
4. Start the development server: `npm run dev`
5. Access the application at `localhost:3000`

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

The additional technology not covered in the course that we've integrated is the OSINT (Open Source Intelligence) collection framework, which combines multiple techniques for gathering intelligence from publicly available sources, including DNS enumeration, WHOIS lookups, subdomain discovery, and technology detection.

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
- **better-sqlite3 9.4.0**: SQLite database driver
- **bcryptjs 2.4.3**: Password hashing library
- **jose 5.2.0**: JWT implementation for authentication
- **axios 1.6.2**: HTTP client for external API requests
- **whois-json 2.0.4**: WHOIS data retrieval

### Development Tools
- **TypeScript 5**: Static typing for JavaScript
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
- **public/**: Static assets
- **data/**: Database files
- **middleware.ts**: Next.js middleware for auth
- **package.json**: Dependencies and scripts
- **tsconfig.json**: TypeScript configuration
