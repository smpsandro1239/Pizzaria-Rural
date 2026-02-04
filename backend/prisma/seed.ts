import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // 1. Criar Categorias
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

  // 2. Criar Tamanhos
  const sizeIndiv = await prisma.pizzaSize.upsert({
    where: { name: 'Individual' },
    update: { extraPrice: -200 },
    create: { name: 'Individual', extraPrice: -200 },
  });

  const sizeMedia = await prisma.pizzaSize.upsert({
    where: { name: 'Média' },
    update: { extraPrice: 0 },
    create: { name: 'Média', extraPrice: 0 },
  });

  const sizeFam = await prisma.pizzaSize.upsert({
    where: { name: 'Familiar' },
    update: { extraPrice: 500 },
    create: { name: 'Familiar', extraPrice: 500 },
  });

  // 3. Criar Massas
  const crustClass = await prisma.crustType.upsert({
    where: { name: 'Clássica' },
    update: { extraPrice: 0 },
    create: { name: 'Clássica', extraPrice: 0 },
  });

  const crustFina = await prisma.crustType.upsert({
    where: { name: 'Fina' },
    update: { extraPrice: 0 },
    create: { name: 'Fina', extraPrice: 0 },
  });

  const crustRecheada = await prisma.crustType.upsert({
    where: { name: 'Recheada' },
    update: { extraPrice: 250 },
    create: { name: 'Recheada', extraPrice: 250 },
  });

  // 4. Criar Ingredientes / Extras
  const tomaterural = await prisma.ingredient.upsert({
    where: { name: 'Tomate Rural' },
    update: { stock: 100, extraPrice: 100 },
    create: { name: 'Tomate Rural', stock: 100, extraPrice: 100 },
  });

  const queijofresco = await prisma.ingredient.upsert({
    where: { name: 'Queijo Fresco' },
    update: { stock: 50, extraPrice: 150 },
    create: { name: 'Queijo Fresco', stock: 50, extraPrice: 150 },
  });

  const bacon = await prisma.ingredient.upsert({
    where: { name: 'Bacon da Serra' },
    update: { stock: 80, extraPrice: 180 },
    create: { name: 'Bacon da Serra', stock: 80, extraPrice: 180 },
  });

  // 5. Criar/Atualizar Pizzas
  const margherita = await prisma.pizza.upsert({
    where: { id: 'margherita' },
    update: { categoryId: catPizzas.id },
    create: {
      id: 'margherita',
      name: 'Margherita Rural',
      description: 'Simples, rápida e perfeita. A rainha da casa.',
      price: 1000, // 10€ base para Média/Clássica
      imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad50?auto=format&fit=crop&w=800&q=80',
      categoryId: catPizzas.id,
    },
  });

  // Ligar Ingredientes base
  await prisma.pizzaIngredient.upsert({
    where: { pizzaId_ingredientId: { pizzaId: margherita.id, ingredientId: tomaterural.id } },
    update: {},
    create: { pizzaId: margherita.id, ingredientId: tomaterural.id },
  });

  // 6. Criar Banners
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

  // 7. Criar Cupão
  await prisma.coupon.upsert({
    where: { code: 'RURAL10' },
    update: {},
    create: { code: 'RURAL10', type: 'PERCENT', value: 10, minOrderValue: 1000 },
  });

  console.log('Seed consolidado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
