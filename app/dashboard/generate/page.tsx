import { redirect } from 'next/navigation'
import { getCurrentAgent } from '@/lib/get-agent'
import GenerateClient from './generate-client'

export default async function GeneratePage() {
  const agent = await getCurrentAgent()

  if (!agent) {
    redirect('/login')
  }

  return <GenerateClient agent={agent} />
}

