import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Criar Tamanhos
  const pequena = await prisma.size.upsert({ where: { name: 'Pequena' }, update: {}, create: { name: 'Pequena', multiplier: 0.8 } });
  const media = await prisma.size.upsert({ where: { name: 'Média' }, update: {}, create: { name: 'Média', multiplier: 1.0 } });
  const familiar = await prisma.size.upsert({ where: { name: 'Familiar' }, update: {}, create: { name: 'Familiar', multiplier: 1.5 } });

  // Criar Massas
  await prisma.crust.upsert({ where: { name: 'Tradicional' }, update: {}, create: { name: 'Tradicional', extraPrice: 0 } });
  await prisma.crust.upsert({ where: { name: 'Fina' }, update: {}, create: { name: 'Fina', extraPrice: 0 } });
  await prisma.crust.upsert({ where: { name: 'Pan' }, update: {}, create: { name: 'Pan', extraPrice: 150 } });
  await prisma.crust.upsert({ where: { name: 'Recheada Queijo' }, update: {}, create: { name: 'Recheada Queijo', extraPrice: 250 } });

  // Criar Categorias
  const catPizzas = await prisma.category.upsert({
    where: { slug: 'pizzas' },
    update: {},
    create: { name: 'Pizzas Rural', slug: 'pizzas' },
  });

  // Criar Pizza Margherita com preços por tamanho
  const margherita = await prisma.pizza.upsert({
    where: { id: 'margherita' },
    update: { categoryId: catPizzas.id },
    create: {
      id: 'margherita',
      name: 'Margherita Rural',
      description: 'Simples, rápida e perfeita. A rainha da casa.',
      price: 850,
      imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad50?auto=format&fit=crop&w=800&q=80',
      categoryId: catPizzas.id,
    },
  });

  await prisma.pizzaSizePrice.upsert({
    where: { pizzaId_sizeId: { pizzaId: margherita.id, sizeId: pequena.id } },
    update: {},
    create: { pizzaId: margherita.id, sizeId: pequena.id, price: 650 }
  });

  await prisma.pizzaSizePrice.upsert({
    where: { pizzaId_sizeId: { pizzaId: margherita.id, sizeId: media.id } },
    update: {},
    create: { pizzaId: margherita.id, sizeId: media.id, price: 850 }
  });

  await prisma.pizzaSizePrice.upsert({
    where: { pizzaId_sizeId: { pizzaId: margherita.id, sizeId: familiar.id } },
    update: {},
    create: { pizzaId: margherita.id, sizeId: familiar.id, price: 1250 }
  });

  console.log('Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.();
  });
