import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Criar Categorias
  const catPizzas = await prisma.category.upsert({
    where: { slug: 'pizzas' },
    update: {},
    create: { name: 'Pizzas Rural', slug: 'pizzas' },
  });

  const catEntradas = await prisma.category.upsert({
    where: { slug: 'entradas' },
    update: {},
    create: { name: 'Entradas Rural', slug: 'entradas' },
  });

  const catBebidas = await prisma.category.upsert({
    where: { slug: 'bebidas' },
    update: {},
    create: { name: 'Bebidas Frescas', slug: 'bebidas' },
  });

  // Criar Ingredientes
  const tomaterural = await prisma.ingredient.upsert({
    where: { name: 'Tomate Rural' },
    update: { stock: 100 },
    create: { name: 'Tomate Rural', stock: 100 },
  });

  const queijofresco = await prisma.ingredient.upsert({
    where: { name: 'Queijo Fresco' },
    update: { stock: 50 },
    create: { name: 'Queijo Fresco', stock: 50 },
  });

  // Criar/Atualizar Pizzas
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

  // Criar Banners
  await prisma.banner.upsert({
    where: { id: 'promo1' },
    update: {},
    create: {
      id: 'promo1',
      title: 'Promoção de Inverno',
      imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
      link: '/category/pizzas',
    },
  });

  await prisma.banner.upsert({
    where: { id: 'promo2' },
    update: {},
    create: {
      id: 'promo2',
      title: 'Menu Familiar Rural',
      imageUrl: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=1200&q=80',
      link: '/coupons',
    },
  });

  // Criar Cupão
  await prisma.coupon.upsert({
    where: { code: 'RURAL10' },
    update: {},
    create: { code: 'RURAL10', type: 'PERCENT', value: 10, minOrderValue: 1000 },
  });

  console.log('Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
