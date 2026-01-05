import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function getAgentByEmail(email: string) {
  try {
    return await prisma.agent.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        credit_balance: true,
        ai_credits_used: true,
        created_at: true,
      },
    })
  } catch (error) {
    console.error('Database error in getAgentByEmail:', error)
    throw error
  }
}

export async function createAgent(email: string, password: string) {
  const hashedPassword = await hashPassword(password)
  return prisma.agent.create({
    data: {
      email,
      password: hashedPassword,
      credit_balance: 10, // Starting credits
    },
  })
}

