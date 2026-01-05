import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create a test agent
  const hashedPassword = await bcrypt.hash('password123', 10)
  
  const agent = await prisma.agent.upsert({
    where: { email: 'test@agent.com' },
    update: {},
    create: {
      email: 'test@agent.com',
      password: hashedPassword,
      credit_balance: 50,
    },
  })

  console.log('Seed data created:', { agent: agent.email })

  // Create credit packages
  const packages = await Promise.all([
    prisma.creditPackage.upsert({
      where: { name: 'Starter Pack' },
      update: {},
      create: {
        name: 'Starter Pack',
        credits: 25,
        price: 500,
        description: '25 credits for small projects',
        active: true
      }
    }),
    prisma.creditPackage.upsert({
      where: { name: 'Professional Pack' },
      update: {},
      create: {
        name: 'Professional Pack',
        credits: 60,
        price: 1000,
        description: '60 credits - Best value',
        active: true
      }
    }),
    prisma.creditPackage.upsert({
      where: { name: 'Business Pack' },
      update: {},
      create: {
        name: 'Business Pack',
        credits: 150,
        price: 2000,
        description: '150 credits for agencies',
        active: true
      }
    }),
    prisma.creditPackage.upsert({
      where: { name: 'Enterprise Pack' },
      update: {},
      create: {
        name: 'Enterprise Pack',
        credits: 500,
        price: 5000,
        description: '500 credits for power users',
        active: true
      }
    })
  ])

  console.log('Created credit packages:', packages.map(p => p.name).join(', '))
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

