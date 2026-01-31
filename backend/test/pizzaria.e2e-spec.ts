import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from './../src/prisma/prisma.service';

describe('Pizzaria Rural (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();

    prisma = moduleFixture.get<PrismaService>(PrismaService);

    // Seed essential data for tests
    await prisma.pizza.upsert({
      where: { id: 'test-pizza' },
      update: {},
      create: {
        id: 'test-pizza',
        name: 'Test Pizza',
        description: 'Test Description',
        basePrice: 1000,
        imageUrl: 'http://image.com',
      },
    });
  });

  afterAll(async () => {
    try {
      await prisma.orderItemExtra.deleteMany();
      await prisma.orderItem.deleteMany();
      await prisma.payment.deleteMany();
      await prisma.order.deleteMany();
      await prisma.user.deleteMany();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Error cleaning up:', errorMessage);
    }
    await app.close();
  });

  it('/auth/register (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'customer@example.com',
        password: 'password123',
        name: 'Customer',
      });

    expect(response.status).toBe(201);
    expect((response.body as Record<string, any>).access_token).toBeDefined();
  });

  it('/orders (POST) - Authenticated', async () => {
    // Login first
    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'customer@example.com', password: 'password123' });

    const token = (loginRes.body as Record<string, any>).access_token as string;

    const response = await request(app.getHttpServer())
      .post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({
        items: [{ pizzaId: 'test-pizza', quantity: 1 }],
        address: 'Test Address',
        phone: '912345678',
        delivery: true,
        paymentMethod: 'CASH',
      });

    expect(response.status).toBe(201);
    const body = response.body as Record<string, any>;
    expect(body.userId).toBeDefined();
    expect(body.total).toBe(1000);
  });

  it('/orders (POST) - Guest', async () => {
    const response = await request(app.getHttpServer())
      .post('/orders')
      .send({
        items: [{ pizzaId: 'test-pizza', quantity: 2 }],
        address: 'Guest Address',
        phone: '987654321',
        delivery: false,
        paymentMethod: 'CASH',
      });

    expect(response.status).toBe(201);
    const body = response.body as Record<string, any>;
    expect(body.userId).toBeNull();
    expect(body.total).toBe(2000);
  });

  it('/pizzas (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/pizzas');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect((response.body as any[]).length).toBeGreaterThan(0);
  });
});
