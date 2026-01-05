import { NextRequest, NextResponse } from 'next/server';
import { getCurrentAgent } from '@/lib/get-agent';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const agent = await getCurrentAgent();
    if (!agent) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { code } = await request.json();

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ error: 'Invalid code format' }, { status: 400 });
    }

    // Normalize code (remove spaces, dashes, convert to uppercase)
    const normalizedCode = code.replace(/[\s-]/g, '').toUpperCase();

    // Find the redemption code
    const redemptionCode = await prisma.redemptionCode.findUnique({
      where: { code: normalizedCode },
      include: { package: true }
    });

    if (!redemptionCode) {
      return NextResponse.json({ error: 'Invalid code' }, { status: 404 });
    }

    // Check if already redeemed
    if (redemptionCode.is_redeemed) {
      return NextResponse.json({ 
        error: 'This code has already been redeemed' 
      }, { status: 400 });
    }

    // Check if expired
    if (redemptionCode.expires_at && new Date() > redemptionCode.expires_at) {
      return NextResponse.json({ 
        error: 'This code has expired' 
      }, { status: 400 });
    }

    // Redeem the code and update agent balance
    const [updatedAgent, updatedCode] = await prisma.$transaction([
      prisma.agent.update({
        where: { id: agent.id },
        data: {
          credit_balance: {
            increment: redemptionCode.package.credits
          }
        }
      }),
      prisma.redemptionCode.update({
        where: { id: redemptionCode.id },
        data: {
          is_redeemed: true,
          redeemed_at: new Date(),
          redeemed_by: agent.id
        }
      })
    ]);

    return NextResponse.json({
      success: true,
      credits: redemptionCode.package.credits,
      newBalance: updatedAgent.credit_balance,
      message: `Successfully added ${redemptionCode.package.credits} credits!`
    });

  } catch (error) {
    console.error('Redeem error:', error);
    return NextResponse.json({ 
      error: 'Failed to redeem code' 
    }, { status: 500 });
  }
}

