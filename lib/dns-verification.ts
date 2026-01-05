/**
 * DNS Verification Utility
 * Verifies if a custom domain is properly configured to point to our hosting
 */

const VERCEL_IP = '76.76.21.21'
const VERCEL_CNAME = 'cname.vercel-dns.com'

interface DNSRecord {
  type: 'A' | 'CNAME'
  value: string
}

/**
 * Perform DNS lookup for a domain
 * Returns the DNS records found
 */
export async function lookupDNS(domain: string): Promise<DNSRecord[]> {
  try {
    // Use Node.js dns module for DNS lookups
    const dns = await import('dns/promises')
    const records: DNSRecord[] = []

    // Check A record (root domain)
    try {
      const addresses = await dns.resolve4(domain)
      addresses.forEach(addr => {
        records.push({ type: 'A', value: addr })
      })
    } catch (error) {
      // A record not found, that's okay
    }

    // Check CNAME record (www subdomain)
    try {
      const cname = await dns.resolveCname(`www.${domain}`)
      cname.forEach(c => {
        records.push({ type: 'CNAME', value: c })
      })
    } catch (error) {
      // CNAME not found, that's okay
    }

    return records
  } catch (error) {
    console.error('DNS lookup error:', error)
    return []
  }
}

/**
 * Verify if domain is correctly configured
 * Returns true if domain points to our hosting
 */
export async function verifyDomain(domain: string): Promise<boolean> {
  try {
    const records = await lookupDNS(domain)

    // Check if A record points to Vercel IP
    const hasCorrectA = records.some(
      r => r.type === 'A' && r.value === VERCEL_IP
    )

    // Check if CNAME points to Vercel
    const hasCorrectCNAME = records.some(
      r => r.type === 'CNAME' && r.value.toLowerCase().includes(VERCEL_CNAME.toLowerCase())
    )

    // Domain is connected if either A or CNAME is correct
    return hasCorrectA || hasCorrectCNAME
  } catch (error) {
    console.error('Domain verification error:', error)
    return false
  }
}

/**
 * Get domain verification status
 * Returns 'CONNECTED' if verified, 'PENDING' otherwise
 */
export async function getDomainStatus(domain: string): Promise<'CONNECTED' | 'PENDING' | 'ERROR'> {
  try {
    if (!domain) return 'PENDING'

    const isVerified = await verifyDomain(domain)
    
    if (isVerified) {
      return 'CONNECTED'
    }

    // Check if there are any DNS records at all
    const records = await lookupDNS(domain)
    if (records.length === 0) {
      return 'ERROR' // No DNS records found, likely misconfigured
    }

    return 'PENDING' // Records exist but don't point to us
  } catch (error) {
    console.error('Domain status check error:', error)
    return 'ERROR'
  }
}

