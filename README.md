# OSTRICH - Open Source Tracking and Recon Intelligence for Cyber Hunting

## Technical Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture Overview](#architecture-overview)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Authentication System](#authentication-system)
6. [Database Implementation](#database-implementation)
7. [API Endpoints](#api-endpoints)
8. [OSINT Collection Implementation](#osint-collection-implementation)
9. [Vulnerability Scanning](#vulnerability-scanning)
10. [Network Mapping](#network-mapping)
11. [Frontend Implementation](#frontend-implementation)
12. [Data Visualization](#data-visualization)
13. [Security Considerations](#security-considerations)
14. [Performance Optimizations](#performance-optimizations)
15. [Development and Deployment](#development-and-deployment)
16. [Dependencies](#dependencies)
17. [Group Contributions](#group-contributions)

## Project Overview
### Built in Admin credentials:
- **Username**: `admin`
- **Password**: `admin123`

or

- **Username**: `sunny.admin`
- **Password**: `sunny123`

These credentials are generated upon the build of the application and are stored in the SQLite database. The password is hashed using bcryptjs for security.
The credentials are not hardcoded in the application and are not visible in the source code. 

### Development Environment

To set up the development environment:

1. Clone the repository
2. Install dependencies: `npm ci`
3. Set up environment variables in `.env.local`: `JWT_SECRET=your_secure_jwt_secret` (not necessary for local ASGI prod development)
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
- **Next.js 14.0.4**: React framework for server and client components
- **React 18**: UI library for component-based development
- **Tailwind CSS 3.3.0**: Utility-first CSS framework
- **shadcn/ui**: Component library built on Radix UI primitives
- **D3.js 7.8.5**: Data visualization library for interactive charts
- **Lucide React 0.309.0**: Icon library

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
    - **auth/**: Authentication endpoints
    - **osint/**: OSINT collection endpoints
    - **scan/**: Scanning endpoints
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

## Authentication System

The authentication system uses JWT (JSON Web Tokens) with HTTP-only cookies for secure session management.

### Implementation Details

#### JWT Generation and Verification

The system uses the `jose` library for JWT operations. The token generation process creates a signed JWT with the user's ID, username, and role, setting an expiration time of 8 hours. The verification process validates the token signature and checks if it has expired.

The JWT secret key is stored in an environment variable (`JWT_SECRET`) and is encoded using TextEncoder for use with the jose library.

#### Login Implementation

The login process authenticates the user against the database, generates a JWT token, and sets it as an HTTP-only cookie with appropriate security flags. The cookie is configured with:
- `httpOnly: true` to prevent JavaScript access
- `secure: true` in production to ensure HTTPS-only transmission
- `sameSite: "strict"` to prevent CSRF attacks
- `maxAge: 60 * 60 * 8` (8 hours) to limit the session duration

#### Authentication Middleware

The middleware intercepts all requests and checks for the presence and validity of the JWT token in cookies for protected routes. Public paths like login and registration endpoints are excluded from authentication checks.

For API routes, the middleware returns a 401 Unauthorized response if the token is missing or invalid. For non-API routes, authentication is handled at the component level to allow for graceful redirection to the login page.

## Database Implementation

OSTRICH uses SQLite with better-sqlite3 for data persistence. The database is initialized and managed in `lib/db.ts`.

### Database Schema

The database consists of three main tables:

1. **users**: Stores user authentication and profile information
   - id (PRIMARY KEY)
   - username (UNIQUE)
   - password (hashed)
   - email
   - role
   - created_at
   - last_login

2. **scan_history**: Records all scanning activities
   - id (PRIMARY KEY)
   - user_id (FOREIGN KEY)
   - scan_type
   - target
   - results (JSON)
   - created_at

3. **vulnerabilities**: Stores discovered vulnerabilities
   - id (PRIMARY KEY)
   - scan_id (FOREIGN KEY)
   - name
   - description
   - severity
   - cve
   - affected
   - status
   - discovered_at

### Database Operations

The database module provides functions for:

1. **User Management**:
   - `createUser`: Creates a new user with hashed password
   - `authenticateUser`: Validates credentials and returns user
   - `getUserById`: Retrieves user by ID
   - `getUserByUsername`: Retrieves user by username

2. **Scan History**:
   - `saveScanHistory`: Saves scan results
   - `getScanHistoryByUserId`: Retrieves scan history for a user

3. **Vulnerability Management**:
   - `saveVulnerability`: Saves vulnerability information
   - `getVulnerabilitiesByScanId`: Retrieves vulnerabilities for a scan
   - `getAllVulnerabilities`: Retrieves all vulnerabilities
   - `updateVulnerabilityStatus`: Updates vulnerability status

### Password Hashing

Passwords are securely hashed using bcryptjs with a salt factor of 10, ensuring that even if the database is compromised, the original passwords cannot be recovered.

## API Endpoints

OSTRICH implements RESTful API endpoints using Next.js API Routes.

### Authentication Endpoints

- **POST /api/auth/login**: Authenticates a user and sets JWT cookie
- **POST /api/auth/register**: Creates a new user account
- **POST /api/auth/logout**: Clears the authentication cookie
- **GET /api/auth/user**: Returns the current authenticated user

### OSINT Endpoints

- **POST /api/osint/domain**: Performs OSINT collection on a domain
- **POST /api/osint/ip**: Performs OSINT collection on an IP address
- **POST /api/osint/person**: Performs OSINT collection on a person
- **POST /api/osint/company**: Performs OSINT collection on a company

### Scanning Endpoints

- **POST /api/scan/network**: Performs network scanning on a target
- **POST /api/scan/vulnerability**: Performs vulnerability scanning
- **POST /api/scan/ports**: Performs port scanning on a target
- **POST /api/scan/webapp**: Performs web application scanning

## OSINT Collection Implementation

The OSINT collection functionality is implemented in `lib/osint-tools.ts` and provides comprehensive intelligence gathering capabilities.

### Domain OSINT Implementation

The domain OSINT module collects the following information:
- DNS records (A, AAAA, MX, NS, TXT)
- WHOIS information
- Subdomains through dictionary attacks and certificate transparency logs
- Email addresses associated with the domain
- Open ports on the main domain
- Technologies used on the website

### DNS Lookup Implementation

DNS lookups are performed using Node.js's built-in `dns` module, which has been promisified for asynchronous operation. The system attempts to resolve various record types and gracefully handles failures for each type.

### Subdomain Enumeration

Subdomains are discovered through two primary methods:
1. Dictionary-based attacks using common subdomain names
2. Certificate Transparency log analysis via the crt.sh service

The system uses DNS resolution to verify the existence of potential subdomains and deduplicates the results.

### Technology Detection

Website technologies are detected by analyzing HTTP headers and HTML content for signatures of common frameworks, libraries, and tools. The detection includes:
- Web server software
- Content Management Systems
- JavaScript frameworks
- Analytics tools
- Security headers

## Vulnerability Scanning

The vulnerability scanning functionality is implemented in `lib/security-tools.ts`.

### Vulnerability Scanning Implementation

The vulnerability scanner identifies security issues in target systems by:
1. Simulating common vulnerability checks
2. Mapping discovered issues to CVE identifiers
3. Assigning severity levels based on CVSS scores
4. Providing remediation recommendations

The scanner supports multiple target types including IP addresses, domains, and web applications.

### Web Application Scanning

The web application scanner focuses on OWASP Top 10 vulnerabilities:
- A01:2021 - Broken Access Control
- A02:2021 - Cryptographic Failures
- A03:2021 - Injection
- A07:2021 - Identification and Authentication Failures

Each vulnerability is documented with evidence of the issue and specific remediation steps.

## Network Mapping

The network mapping functionality is implemented using D3.js for visualization and simulated network data.

### Network Data Structure

The network map uses a force-directed graph with the following data structure:
- Nodes represent network devices (servers, routers, workstations, firewalls)
- Links represent connections between devices
- Node attributes include device type, IP address, and status
- Link attributes include connection strength

### Network Visualization Implementation

The visualization uses D3.js force simulation with:
- Custom force parameters for charge, link distance, and collision detection
- Color coding based on device type and status
- Interactive features including zoom, pan, and drag
- Tooltips for detailed information
- Filtering capabilities by hostname or IP address

## Frontend Implementation

The frontend is built using React components with Next.js. The application uses a combination of client and server components.

### Main Page Structure

The main page (`app/page.tsx`) handles:
- Authentication state management
- User session persistence
- Tab-based navigation between features
- Conditional rendering based on authentication status

### OSINT Collector Component

The OSINT collector component (`components/osint-collector.tsx`) provides:
- Target input with validation
- Tab-based selection of OSINT type (domain, IP, person, company)
- Progress indication during collection
- Results display with appropriate visualization for each OSINT type

## Data Visualization

OSTRICH uses D3.js for data visualization, with custom chart components for different data types.

### Vulnerability Trend Chart

The vulnerability trend chart visualizes vulnerability counts over time, categorized by severity (critical, high, medium, low). The implementation includes:
- Time-based X-axis with configurable time ranges
- Linear Y-axis for vulnerability counts
- Multiple line series for different severity levels
- Color-coded legend
- Grid lines for readability
- Animated transitions

### Attack Sources Chart

The attack sources chart displays the geographic distribution of attack origins using a pie chart. Features include:
- Proportional segments based on attack counts
- Color-coded segments for different countries
- Interactive tooltips with detailed statistics
- Animated transitions for segment creation
- Center text for chart title

### Security Posture Chart

The security posture chart shows the overall security score over time with:
- Color-coded zones for different security levels (excellent, good, fair, poor)
- Line chart showing score progression
- Interactive data points with tooltips
- Animated line drawing
- Event annotations for security incidents and improvements

## Security Considerations

OSTRICH implements several security measures to protect against common vulnerabilities:

### Authentication Security

1. **Password Hashing**: Passwords are hashed using bcryptjs with a salt factor of 10
2. **HTTP-Only Cookies**: JWT tokens are stored in HTTP-only cookies to prevent JavaScript access
3. **CSRF Protection**: Implemented through SameSite cookie attributes
4. **JWT Expiration**: Tokens have a configurable expiration time (default: 8 hours)
5. **Secure Cookie Flag**: In production, cookies are set with the Secure flag

### Input Validation

All API endpoints implement strict input validation using regular expressions and type checking to prevent injection attacks and malformed requests.

### Error Handling

Errors are properly caught and handled without exposing sensitive information. Error details are logged server-side while generic error messages are returned to clients.

## Performance Optimizations

OSTRICH implements several performance optimizations:

### Database Optimizations

1. **Prepared Statements**: All database queries use prepared statements for performance and security
2. **Indexing**: Primary keys and foreign keys are indexed for faster lookups
3. **Connection Pooling**: The database connection is reused across requests

### Frontend Optimizations

1. **Component Memoization**: React components are memoized where appropriate to prevent unnecessary re-renders
2. **Lazy Loading**: Components are loaded lazily to improve initial load time
3. **Image Optimization**: Next.js Image component is used for optimized image loading

### Network Optimizations

1. **API Response Caching**: Responses are cached where appropriate
2. **Compression**: HTTP responses are compressed to reduce bandwidth usage
3. **Chunked Responses**: Large responses are chunked to improve perceived performance

## Development and Deployment

### Production Deployment

For production deployment:

1. Build the application: `npm run build`
2. Start the production server: `npm start`

### Environment Variables

The application uses the following environment variables:

- `JWT_SECRET`: Secret key for JWT token signing
- `NODE_ENV`: Environment mode (development or production)

## Dependencies

OSTRICH relies on the following key dependencies:

### Frontend Dependencies

- `next`: 14.0.4
- `react`: 18.x
- `react-dom`: 18.x
- `tailwindcss`: 3.3.0
- `d3`: 7.8.5
- `lucide-react`: 0.309.0

### Backend Dependencies

- `better-sqlite3`: 9.4.0
- `bcryptjs`: 2.4.3
- `jose`: 5.2.0
- `axios`: 1.6.2
- `whois-json`: 2.0.4

### Development Dependencies

- `typescript`: 5.x
- `eslint`: 8.x
- `@types/react`: 18.x
- `@types/node`: 20.x
- `@types/d3`: 7.4.3
- `@types/better-sqlite3`: 7.6.8
- `@types/bcryptjs`: 2.4.6