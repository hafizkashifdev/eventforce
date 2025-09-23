import { PrismaClient, Role, BookingStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@eventforce.com' },
    update: {},
    create: {
      email: 'admin@eventforce.com',
      passwordHash: adminPassword,
      name: 'Admin User',
      role: Role.ADMIN,
      isVerified: true,
    },
  });

  // Create staff user
  const staffPassword = await bcrypt.hash('staff123', 12);
  const staff = await prisma.user.upsert({
    where: { email: 'staff@eventforce.com' },
    update: {},
    create: {
      email: 'staff@eventforce.com',
      passwordHash: staffPassword,
      name: 'Staff User',
      role: Role.STAFF,
      isVerified: true,
    },
  });

  // Create sample customer
  const customerPassword = await bcrypt.hash('customer123', 12);
  const customer = await prisma.user.upsert({
    where: { email: 'customer@eventforce.com' },
    update: {},
    create: {
      email: 'customer@eventforce.com',
      passwordHash: customerPassword,
      name: 'John Doe',
      role: Role.CUSTOMER,
      isVerified: true,
    },
  });

  // Create sample vehicles
  const vehicles = [
    {
      name: 'BMW 7 Series',
      description: 'Luxury sedan with premium features',
      seats: 4,
      priceCents: 5000, // 50 USD per hour
    },
    {
      name: 'Mercedes S-Class',
      description: 'Ultimate luxury sedan',
      seats: 4,
      priceCents: 6000, // 60 USD per hour
    },
    {
      name: 'Toyota Coaster',
      description: 'Luxury bus for group transportation',
      seats: 30,
      priceCents: 8000, // 80 USD per hour
    },
    {
      name: 'Ford Taurus',
      description: 'Comfortable sedan for business travel',
      seats: 4,
      priceCents: 3000, // 30 USD per hour
    },
  ];

  for (const vehicle of vehicles) {
    await prisma.vehicle.upsert({
      where: { name: vehicle.name },
      update: {},
      create: vehicle,
    });
  }

  // Create sample bookings
  const vehicleList = await prisma.vehicle.findMany();
  const customerList = await prisma.user.findMany({ where: { role: Role.CUSTOMER } });

  if (vehicleList.length > 0 && customerList.length > 0) {
    const sampleBookings = [
      {
        userId: customerList[0].id,
        vehicleId: vehicleList[0].id,
        startAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        endAt: new Date(Date.now() + 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000), // Tomorrow + 2 hours
        totalCents: 10000, // 100 USD
        status: BookingStatus.CONFIRMED,
      },
      {
        userId: customerList[0].id,
        vehicleId: vehicleList[1].id,
        startAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Day after tomorrow
        endAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000), // Day after tomorrow + 4 hours
        totalCents: 24000, // 240 USD
        status: BookingStatus.PENDING,
      },
    ];

    for (const bookingData of sampleBookings) {
      await prisma.booking.create({
        data: bookingData,
      });
    }

    // Create sample payments for confirmed bookings
    const confirmedBookings = await prisma.booking.findMany({
      where: { status: BookingStatus.CONFIRMED },
    });

    for (const booking of confirmedBookings) {
      await prisma.payment.create({
        data: {
          bookingId: booking.id,
          amountCents: booking.totalCents,
          currency: 'usd',
          stripePaymentIntent: `pi_${Math.random().toString(36).substr(2, 9)}`,
          status: 'succeeded',
        },
      });
    }
  }

  console.log('✅ Database seeded successfully!');
  console.log('👤 Admin user: admin@eventforce.com / admin123');
  console.log('👤 Staff user: staff@eventforce.com / staff123');
  console.log('👤 Customer user: customer@eventforce.com / customer123');
  console.log('🚗 Created 4 sample vehicles');
  console.log('📅 Created sample bookings and payments');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });