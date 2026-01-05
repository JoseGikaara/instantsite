import { NextRequest, NextResponse } from 'next/server'
import { getAgentByEmail, verifyPassword } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Check database connection
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL is not set')
      return NextResponse.json(
        { error: 'Database configuration error', details: 'DATABASE_URL not found' },
        { status: 500 }
      )
    }

    const agent = await getAgentByEmail(email)
    if (!agent) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    const isValid = await verifyPassword(password, agent.password)
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Simple session: store agent ID in cookie
    const response = NextResponse.json({ success: true, agent: { id: agent.id, email: agent.email } })
    response.cookies.set('agent_id', agent.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorStack = error instanceof Error ? error.stack : undefined
    
    // Check for Prisma errors
    if (errorMessage.includes('PrismaClient') || errorMessage.includes('prisma')) {
      return NextResponse.json(
        { 
          error: 'Database connection error', 
          details: process.env.NODE_ENV === 'development' ? 'Prisma Client may not be generated. Run: npx prisma generate' : undefined 
        },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
        stack: process.env.NODE_ENV === 'development' ? errorStack : undefined
      },
      { status: 500 }
    )
  }
}

