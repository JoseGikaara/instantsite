import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Exclude confusing chars
  const segments = 3;
  const segmentLength = 4;
  
  const code = Array.from({ length: segments }, () => {
    return Array.from({ length: segmentLength }, () => 
      chars[Math.floor(Math.random() * chars.length)]
    ).join('');
  }).join('');
  
  // Store without dashes for consistent comparison
  return `INST${code}`;
}

function formatCodeForDisplay(code: string): string {
  // Format code with dashes for display: INST-XXXX-XXXX-XXXX
  const withoutPrefix = code.replace('INST', '');
  const segments = withoutPrefix.match(/.{1,4}/g) || [];
  return `INST-${segments.join('-')}`;
}

async function generateRedemptionCodes(
  packageId: string,
  quantity: number,
  expiryDays?: number
) {
  const codes = [];
  const expiresAt = expiryDays 
    ? new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000)
    : null;

  for (let i = 0; i < quantity; i++) {
    let code = generateCode();
    
    // Ensure uniqueness
    while (await prisma.redemptionCode.findUnique({ where: { code } })) {
      code = generateCode();
    }

    const redemptionCode = await prisma.redemptionCode.create({
      data: {
        code,
        package_id: packageId,
        expires_at: expiresAt,
        generated_by: 'admin' // Or track actual admin user
      }
    });

    codes.push(redemptionCode.code);
  }

  return codes;
}

// Usage example
async function main() {
  // First, create packages in database if they don't exist
  const starterPkg = await prisma.creditPackage.upsert({
    where: { name: 'Starter Pack' },
    update: {},
    create: {
      name: 'Starter Pack',
      credits: 25,
      price: 500,
      description: '25 credits for small projects',
      active: true
    }
  });

  const professionalPkg = await prisma.creditPackage.upsert({
    where: { name: 'Professional Pack' },
    update: {},
    create: {
      name: 'Professional Pack',
      credits: 60,
      price: 1000,
      description: '60 credits - Best value',
      active: true
    }
  });

  const businessPkg = await prisma.creditPackage.upsert({
    where: { name: 'Business Pack' },
    update: {},
    create: {
      name: 'Business Pack',
      credits: 150,
      price: 2000,
      description: '150 credits for agencies',
      active: true
    }
  });

  const enterprisePkg = await prisma.creditPackage.upsert({
    where: { name: 'Enterprise Pack' },
    update: {},
    create: {
      name: 'Enterprise Pack',
      credits: 500,
      price: 5000,
      description: '500 credits for power users',
      active: true
    }
  });

  console.log('Created/Updated credit packages\n');

  // Generate 10 codes for Starter Pack
  console.log('Generating codes for Starter Pack...');
  const starterCodes = await generateRedemptionCodes(starterPkg.id, 10, 30);
  console.log('Starter Pack Codes:');
  starterCodes.forEach(code => console.log(formatCodeForDisplay(code)));
  console.log('\n');

  // Generate 10 codes for Professional Pack
  console.log('Generating codes for Professional Pack...');
  const professionalCodes = await generateRedemptionCodes(professionalPkg.id, 10, 30);
  console.log('Professional Pack Codes:');
  professionalCodes.forEach(code => console.log(formatCodeForDisplay(code)));
  console.log('\n');

  // Generate 10 codes for Business Pack
  console.log('Generating codes for Business Pack...');
  const businessCodes = await generateRedemptionCodes(businessPkg.id, 10, 30);
  console.log('Business Pack Codes:');
  businessCodes.forEach(code => console.log(formatCodeForDisplay(code)));
  console.log('\n');

  // Generate 10 codes for Enterprise Pack
  console.log('Generating codes for Enterprise Pack...');
  const enterpriseCodes = await generateRedemptionCodes(enterprisePkg.id, 10, 30);
  console.log('Enterprise Pack Codes:');
  enterpriseCodes.forEach(code => console.log(formatCodeForDisplay(code)));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

