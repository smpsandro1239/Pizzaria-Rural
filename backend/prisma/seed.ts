import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // 1. Criar Categorias
  const categories = [
    { name: 'Pizzas', slug: 'pizzas' },
    { name: 'Entradas', slug: 'entradas' },
    { name: 'Bebidas', slug: 'bebidas' },
    { name: 'Sobremesas', slug: 'sobremesas' },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name },
      create: { name: cat.name, slug: cat.slug },
    });
  }

  const catPizzas = await prisma.category.findUnique({ where: { slug: 'pizzas' } });

  // 2. Criar Tamanhos
  const sizes = [
    { name: 'Individual', extraPrice: -200 },
    { name: 'Média', extraPrice: 0 },
    { name: 'Familiar', extraPrice: 500 },
  ];

  for (const s of sizes) {
    await prisma.pizzaSize.upsert({
      where: { name: s.name },
      update: { extraPrice: s.extraPrice },
      create: { name: s.name, extraPrice: s.extraPrice },
    });
  }

  // 3. Criar Massas
  const crusts = [
    { name: 'Fina', extraPrice: 0 },
    { name: 'Clássica', extraPrice: 0 },
    { name: 'Pan', extraPrice: 150 },
    { name: 'Recheada Queijo', extraPrice: 250 },
  ];

  for (const c of crusts) {
    await prisma.crustType.upsert({
      where: { name: c.name },
      update: { extraPrice: c.extraPrice },
      create: { name: c.name, extraPrice: c.extraPrice },
    });
  }

  // 4. Criar Ingredientes / Extras
  const ingredients = [
    { name: 'Extra Queijo', stock: 100, extraPrice: 150 },
    { name: 'Bacon', stock: 80, extraPrice: 180 },
    { name: 'Pepperoni', stock: 90, extraPrice: 200 },
    { name: 'Cogumelos', stock: 100, extraPrice: 120 },
    { name: 'Ananás', stock: 50, extraPrice: 150 },
    { name: 'Fiambre', stock: 100, extraPrice: 160 },
  ];

  for (const ing of ingredients) {
    await prisma.ingredient.upsert({
      where: { name: ing.name },
      update: { stock: ing.stock, extraPrice: ing.extraPrice },
      create: { name: ing.name, stock: ing.stock, extraPrice: ing.extraPrice },
    });
  }

  // 5. Criar Pizzas
  if (catPizzas) {
      await prisma.pizza.upsert({
        where: { id: 'margherita' },
        update: { categoryId: catPizzas.id },
        create: {
          id: 'margherita',
          name: 'Margherita Rural',
          description: 'Tomate e mozzarella.',
          price: 1000,
          imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad50',
          categoryId: catPizzas.id,
        },
      });

      await prisma.pizza.upsert({
        where: { id: 'barbecue' },
        update: { categoryId: catPizzas.id },
        create: {
          id: 'barbecue',
          name: 'Barbecue da Aldeia',
          description: 'Molho BBQ, carne picada e bacon.',
          price: 1250,
          imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
          categoryId: catPizzas.id,
        },
      });
  }

  // 6. Banners
  await prisma.banner.upsert({
    where: { id: 'promo1' },
    update: {},
    create: {
      id: 'promo1',
      title: '2x1 às Terças',
      imageUrl: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212',
      link: '/pizzas',
    },
  });

  console.log('Seed ultra-completo concluído!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
