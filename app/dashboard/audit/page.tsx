import { redirect } from 'next/navigation'
import { getCurrentAgent } from '@/lib/get-agent'
import AuditClient from './audit-client'

export default async function AuditPage() {
  const agent = await getCurrentAgent()

  if (!agent) {
    redirect('/login')
  }

  return <AuditClient agent={agent} />
}

