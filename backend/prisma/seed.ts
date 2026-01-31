import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const margherita = await prisma.pizza.upsert({
    where: { id: 'margherita' },
    update: {},
    create: {
      id: 'margherita',
      name: 'Margherita Rural',
      description: 'Simples, rápida e perfeita. A rainha da casa.',
      price: 850,
      imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad50?auto=format&fit=crop&w=800&q=80',
    },
  });

  const pepperoni = await prisma.pizza.upsert({
    where: { id: 'pepperoni' },
    update: {},
    create: {
      id: 'pepperoni',
      name: 'Pepperoni da Serra',
      description: 'Picante no ponto certo. A favorita dos apressados.',
      price: 950,
      imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80',
    },
  });

  const veggie = await prisma.pizza.upsert({
    where: { id: 'veggie' },
    update: {},
    create: {
      id: 'veggie',
      name: 'Veggie da Horta',
      description: 'Leve, fresca e cheia de sabor — direto da terra para o forno.',
      price: 900,
      imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    },
  });

  console.log({ margherita, pepperoni, veggie });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
