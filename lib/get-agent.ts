import { cookies } from 'next/headers'
import { prisma } from './prisma'

export async function getCurrentAgent() {
  try {
    const cookieStore = await cookies()
    const agentId = cookieStore.get('agent_id')?.value

    if (!agentId) {
      return null
    }

    return await prisma.agent.findUnique({
      where: { id: agentId },
      select: {
        id: true,
        email: true,
        credit_balance: true,
      },
    })
  } catch (error) {
    console.error('getCurrentAgent error:', error)
    return null
  }
}

