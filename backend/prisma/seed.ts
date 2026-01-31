import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Extras
  const extraQueijo = await prisma.extra.upsert({
    where: { name: 'Extra Queijo' },
    update: {},
    create: { name: 'Extra Queijo', price: 150 },
  });

  const extraBacon = await prisma.extra.upsert({
    where: { name: 'Bacon' },
    update: {},
    create: { name: 'Bacon', price: 100 },
  });

  const margherita = await prisma.pizza.upsert({
    where: { id: 'margherita' },
    update: {},
    create: {
      id: 'margherita',
      name: 'Margherita Rural',
      description: 'Simples, rápida e perfeita. A rainha da casa.',
      basePrice: 850,
      imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad50?auto=format&fit=crop&w=800&q=80',
      sizes: {
        create: [
          { name: 'Pequena', price: 700 },
          { name: 'Média', price: 850 },
          { name: 'Família', price: 1200 },
        ],
      },
    },
  });

  const pepperoni = await prisma.pizza.upsert({
    where: { id: 'pepperoni' },
    update: {},
    create: {
      id: 'pepperoni',
      name: 'Pepperoni da Serra',
      description: 'Picante no ponto certo. A favorita dos apressados.',
      basePrice: 950,
      imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80',
      sizes: {
        create: [
          { name: 'Pequena', price: 800 },
          { name: 'Média', price: 950 },
          { name: 'Família', price: 1350 },
        ],
      },
    },
  });

  // Cupões
  await prisma.coupon.upsert({
    where: { code: 'RURAL10' },
    update: {},
    create: {
      code: 'RURAL10',
      discountType: 'PERCENT',
      value: 10,
      minOrder: 1500,
    },
  });

  const veggie = await prisma.pizza.upsert({
    where: { id: 'veggie' },
    update: {},
    create: {
      id: 'veggie',
      name: 'Veggie da Horta',
      description: 'Leve, fresca e cheia de sabor — direto da terra para o forno.',
      basePrice: 900,
      imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
      sizes: {
        create: [
          { name: 'Pequena', price: 750 },
          { name: 'Média', price: 900 },
          { name: 'Família', price: 1250 },
        ],
      },
    },
  });

  console.log('Semente de dados concluída com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
