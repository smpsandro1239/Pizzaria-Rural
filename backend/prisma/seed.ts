import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Criar Ingredientes com Stock
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

  const manjericam = await prisma.ingredient.upsert({
    where: { name: 'Manjericão da Horta' },
    update: { stock: 30 },
    create: { name: 'Manjericão da Horta', stock: 30 },
  });

  // Criar/Atualizar Pizzas
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

  // Ligar Ingredientes à Margherita
  await prisma.pizzaIngredient.upsert({
    where: { pizzaId_ingredientId: { pizzaId: margherita.id, ingredientId: tomaterural.id } },
    update: {},
    create: { pizzaId: margherita.id, ingredientId: tomaterural.id },
  });

  await prisma.pizzaIngredient.upsert({
    where: { pizzaId_ingredientId: { pizzaId: margherita.id, ingredientId: queijofresco.id } },
    update: {},
    create: { pizzaId: margherita.id, ingredientId: queijofresco.id },
  });

  await prisma.pizzaIngredient.upsert({
    where: { pizzaId_ingredientId: { pizzaId: margherita.id, ingredientId: manjericam.id } },
    update: {},
    create: { pizzaId: margherita.id, ingredientId: manjericam.id },
  });

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
