/**
 * Credit Packages
 * 
 * Based on actual credit costs (1 credit = KES 150):
 * - Preview: 1 credit (KES 150)
 * - AI Enhancement: 1 credit (KES 150)
 * - Deployment: 20 credits (KES 3,000)
 * - Monthly Hosting: 5 credits/month (KES 750/month)
 * - Annual Hosting: 50 credits/year (KES 7,500/year)
 */

export const CREDIT_PACKAGES = [
  {
    id: 'starter',
    name: 'Starter Pack',
    credits: 30,
    price: 4500, // KES (30 × 150)
    description: 'Perfect for testing: 5 previews + 1 deployment with monthly hosting',
    popular: false,
    useCase: '1 website deployment + 5 previews',
    breakdown: [
      '5 website previews (5 credits)',
      '1 website deployment (20 credits)',
      '1 month hosting (5 credits)',
    ]
  },
  {
    id: 'professional',
    name: 'Professional Pack',
    credits: 75,
    price: 11250, // KES (75 × 150)
    description: 'Best value: Deploy 3 websites with monthly hosting for 3 months',
    popular: true,
    savings: 'Save 10%',
    useCase: '3 website deployments + hosting',
    breakdown: [
      '3 website deployments (60 credits)',
      '3 months hosting for 1 site (15 credits)',
    ]
  },
  {
    id: 'business',
    name: 'Business Pack',
    credits: 150,
    price: 22500, // KES (150 × 150)
    description: 'For agencies: Deploy 5 websites with annual hosting',
    popular: false,
    savings: 'Save 15%',
    useCase: '5 website deployments + annual hosting',
    breakdown: [
      '5 website deployments (100 credits)',
      '1 annual hosting plan (50 credits)',
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise Pack',
    credits: 300,
    price: 45000, // KES (300 × 150)
    description: 'Power users: Deploy 10 websites with multiple annual plans',
    popular: false,
    savings: 'Save 20%',
    useCase: '10 website deployments + hosting',
    breakdown: [
      '10 website deployments (200 credits)',
      '2 annual hosting plans (100 credits)',
    ]
  }
];

export const MPESA_DETAILS = {
  tillNumber: '5574488', // Your M-Pesa Till Number
  businessName: 'InstantSite',
  paybillNumber: null, // Or use this if you have paybill instead
};

