// This is a mock API service for the OSTRICH application
// In a real application, these functions would make actual API calls

// Dashboard data
export async function fetchDashboardData() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
    threatCount: 24,
    vulnerabilityCount: 87,
    scannedHosts: 156,
    activeScans: 3,
  }
}

// Recent alerts
export async function fetchRecentAlerts() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1200))

  return [
    {
      id: "1",
      timestamp: new Date().toISOString(),
      type: "intrusion",
      severity: "critical",
      source: "45.227.253.98",
      description: "Brute force attack detected on SSH service",
    },
    {
      id: "2",
      timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
      type: "vulnerability",
      severity: "high",
      source: "web-server-1",
      description: "CVE-2023-1234: SQL Injection vulnerability in web application",
    },
    {
      id: "3",
      timestamp: new Date(Date.now() - 2 * 60000).toISOString(),
      type: "reconnaissance",
      severity: "medium",
      source: "103.74.19.104",
      description: "Port scanning activity detected",
    },
    {
      id: "4",
      timestamp: new Date(Date.now() - 3 * 60000).toISOString(),
      type: "malware",
      severity: "high",
      source: "workstation-15",
      description: "Suspicious file execution detected: possible ransomware",
    },
    {
      id: "5",
      timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
      type: "intrusion",
      severity: "low",
      source: "192.168.1.45",
      description: "Multiple failed login attempts",
    },
  ]
}

// Network data
export async function fetchNetworkData() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  return {
    nodes: [
      { id: "server1", name: "Web Server", type: "server", ip: "192.168.1.10", status: "online" },
      { id: "server2", name: "Database Server", type: "server", ip: "192.168.1.11", status: "vulnerable" },
      { id: "server3", name: "Mail Server", type: "server", ip: "192.168.1.12", status: "online" },
      { id: "router1", name: "Main Router", type: "router", ip: "192.168.1.1", status: "online" },
      { id: "firewall1", name: "Firewall", type: "firewall", ip: "192.168.1.2", status: "online" },
      { id: "workstation1", name: "Admin PC", type: "workstation", ip: "192.168.1.100", status: "online" },
      { id: "workstation2", name: "Dev PC", type: "workstation", ip: "192.168.1.101", status: "offline" },
      { id: "workstation3", name: "HR PC", type: "workstation", ip: "192.168.1.102", status: "vulnerable" },
      { id: "workstation4", name: "Finance PC", type: "workstation", ip: "192.168.1.103", status: "online" },
      { id: "unknown1", name: "Unknown Device", type: "unknown", ip: "192.168.1.150", status: "online" },
    ],
    links: [
      { source: "router1", target: "firewall1", strength: 3 },
      { source: "firewall1", target: "server1", strength: 2 },
      { source: "firewall1", target: "server2", strength: 2 },
      { source: "firewall1", target: "server3", strength: 2 },
      { source: "router1", target: "workstation1", strength: 1 },
      { source: "router1", target: "workstation2", strength: 1 },
      { source: "router1", target: "workstation3", strength: 1 },
      { source: "router1", target: "workstation4", strength: 1 },
      { source: "router1", target: "unknown1", strength: 1 },
      { source: "workstation1", target: "server1", strength: 1 },
      { source: "workstation1", target: "server2", strength: 1 },
      { source: "workstation2", target: "server1", strength: 1 },
      { source: "workstation3", target: "server3", strength: 1 },
      { source: "workstation4", target: "server2", strength: 1 },
    ],
  }
}

// Vulnerabilities
export async function fetchVulnerabilities() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1300))

  return [
    {
      id: "vuln-1",
      name: "SQL Injection",
      description: "SQL injection vulnerability in login form",
      severity: "critical",
      cve: "CVE-2023-1234",
      affected: "Web Server (192.168.1.10)",
      status: "open",
      discovered: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "vuln-2",
      name: "Outdated OpenSSL",
      description: "Server is running an outdated version of OpenSSL with known vulnerabilities",
      severity: "high",
      cve: "CVE-2023-5678",
      affected: "Mail Server (192.168.1.12)",
      status: "open",
      discovered: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "vuln-3",
      name: "Default Credentials",
      description: "Device is using default manufacturer credentials",
      severity: "high",
      cve: "N/A",
      affected: "Router (192.168.1.1)",
      status: "fixed",
      discovered: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "vuln-4",
      name: "Missing Security Patches",
      description: "Windows workstation missing critical security patches",
      severity: "medium",
      cve: "Multiple",
      affected: "HR PC (192.168.1.102)",
      status: "open",
      discovered: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "vuln-5",
      name: "Insecure File Permissions",
      description: "Sensitive configuration files have overly permissive access controls",
      severity: "medium",
      cve: "N/A",
      affected: "Database Server (192.168.1.11)",
      status: "open",
      discovered: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "vuln-6",
      name: "Cross-Site Scripting (XSS)",
      description: "Reflected XSS vulnerability in search function",
      severity: "medium",
      cve: "CVE-2023-9012",
      affected: "Web Server (192.168.1.10)",
      status: "fixed",
      discovered: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "vuln-7",
      name: "Unencrypted Communications",
      description: "Internal service using unencrypted HTTP instead of HTTPS",
      severity: "low",
      cve: "N/A",
      affected: "Internal App Server (192.168.1.15)",
      status: "open",
      discovered: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "vuln-8",
      name: "Outdated PHP Version",
      description: "Web server running outdated PHP version with known vulnerabilities",
      severity: "high",
      cve: "Multiple",
      affected: "Web Server (192.168.1.10)",
      status: "open",
      discovered: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]
}

// Scan target
export async function scanTarget(target: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 5000))

  // Generate some random vulnerabilities based on the target
  const now = new Date().toISOString()

  return [
    {
      id: `vuln-new-1-${Date.now()}`,
      name: "Open SSH Port",
      description: `Port 22 (SSH) is open on ${target}`,
      severity: "info",
      cve: "N/A",
      affected: target,
      status: "open",
      discovered: now,
    },
    {
      id: `vuln-new-2-${Date.now()}`,
      name: "Outdated Web Server",
      description: `Web server on ${target} is running an outdated version`,
      severity: "medium",
      cve: "CVE-2023-7890",
      affected: target,
      status: "open",
      discovered: now,
    },
    {
      id: `vuln-new-3-${Date.now()}`,
      name: "Weak TLS Configuration",
      description: `TLS service on ${target} supports weak ciphers`,
      severity: "low",
      cve: "N/A",
      affected: target,
      status: "open",
      discovered: now,
    },
  ]
}

// OSINT data collection
export async function collectOsintData(target: string, type: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 5000))

  // Return different mock data based on the type
  switch (type) {
    case "domain":
      return {
        registrar: "GoDaddy.com, LLC",
        creationDate: "2005-03-15",
        expirationDate: "2025-03-15",
        updatedDate: "2023-02-28",
        status: "Active",
        dnsRecords: [
          { type: "A", value: "192.168.1.10" },
          { type: "MX", value: "mail.example.com" },
          { type: "NS", value: "ns1.example.com" },
          { type: "TXT", value: "v=spf1 include:_spf.example.com ~all" },
        ],
        subdomains: [
          "www.example.com",
          "mail.example.com",
          "blog.example.com",
          "shop.example.com",
          "api.example.com",
          "dev.example.com",
        ],
        emails: ["admin@example.com", "info@example.com", "support@example.com", "sales@example.com"],
      }

    case "person":
      return {
        fullName: "John Smith",
        age: "42",
        location: "New York, NY",
        occupation: "Software Engineer",
        emails: ["john.smith@example.com", "jsmith@company.com"],
        phones: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
        addresses: ["123 Main St, New York, NY 10001"],
        socialProfiles: [
          { platform: "LinkedIn", username: "johnsmith" },
          { platform: "Twitter", username: "@jsmith" },
          { platform: "GitHub", username: "jsmith-dev" },
          { platform: "Facebook", username: "john.smith.123" },
        ],
        employmentHistory: [
          { title: "Senior Software Engineer", company: "Tech Corp", period: "2018 - Present" },
          { title: "Software Developer", company: "Dev Solutions", period: "2015 - 2018" },
          { title: "Junior Developer", company: "Startup Inc", period: "2012 - 2015" },
        ],
      }

    case "company":
      return {
        legalName: "Acme Corporation",
        founded: "1985",
        industry: "Technology",
        size: "1000-5000 employees",
        revenue: "$500M - $1B",
        locations: [
          { name: "Headquarters", address: "100 Corporate Way, San Francisco, CA 94107" },
          { name: "East Coast Office", address: "200 Business Ave, New York, NY 10001" },
          { name: "European HQ", address: "30 Tech Boulevard, London, UK" },
        ],
        executives: [
          { name: "Jane Doe", title: "Chief Executive Officer" },
          { name: "John Smith", title: "Chief Technology Officer" },
          { name: "Robert Johnson", title: "Chief Financial Officer" },
          { name: "Sarah Williams", title: "Chief Operating Officer" },
          { name: "Michael Brown", title: "Chief Marketing Officer" },
        ],
        domains: ["acmecorp.com", "acme-tech.com", "acmesupport.com", "acmecloud.com"],
        socialProfiles: [
          { platform: "LinkedIn", handle: "acme-corporation" },
          { platform: "Twitter", handle: "@AcmeCorp" },
          { platform: "Facebook", handle: "AcmeCorporation" },
          { platform: "GitHub", handle: "acme-dev" },
        ],
      }

    default:
      return {}
  }
}

// Generate report
export async function generateReport(type: string, timeRange: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // In a real app, this would generate and return a report
  return { success: true }
}

