import { Injectable, ForbiddenException, Logger } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getDashboardMetrics(currentUser: any) {
    // Only ADMIN and STAFF can view dashboard metrics
    if (currentUser.role === Role.CUSTOMER) {
      throw new ForbiddenException('Only staff and admin can view dashboard metrics');
    }

    const [
      totalUsers,
      usersByRole,
      totalBookings,
      bookingsByStatus,
      totalPayments,
      totalRevenue,
      recentBookings,
      recentPayments,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.groupBy({
        by: ['role'],
        _count: { role: true },
      }),
      this.prisma.booking.count(),
      this.prisma.booking.groupBy({
        by: ['status'],
        _count: { status: true },
      }),
      this.prisma.payment.count(),
      this.prisma.payment.aggregate({
        where: { status: 'succeeded' },
        _sum: { amountCents: true },
      }),
      this.prisma.booking.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
          vehicle: true,
        },
      }),
      this.prisma.payment.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          booking: {
            include: {
              user: {
                select: {
                  id: true,
                  email: true,
                  name: true,
                },
              },
              vehicle: true,
            },
          },
        },
      }),
    ]);

    return {
      users: {
        total: totalUsers,
        byRole: usersByRole.reduce((acc, item) => {
          acc[item.role] = item._count.role;
          return acc;
        }, {} as Record<string, number>),
      },
      bookings: {
        total: totalBookings,
        byStatus: bookingsByStatus.reduce((acc, item) => {
          acc[item.status] = item._count.status;
          return acc;
        }, {} as Record<string, number>),
        recent: recentBookings,
      },
      payments: {
        total: totalPayments,
        totalRevenue: totalRevenue._sum.amountCents || 0,
        recent: recentPayments,
      },
    };
  }

  async getUsersStats(currentUser: any) {
    if (currentUser.role === Role.CUSTOMER) {
      throw new ForbiddenException('Only staff and admin can view user statistics');
    }

    const [total, verified, unverified, byRole] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.count({ where: { isVerified: true } }),
      this.prisma.user.count({ where: { isVerified: false } }),
      this.prisma.user.groupBy({
        by: ['role'],
        _count: { role: true },
      }),
    ]);

    return {
      total,
      verified,
      unverified,
      byRole: byRole.reduce((acc, item) => {
        acc[item.role] = item._count.role;
        return acc;
      }, {} as Record<string, number>),
    };
  }

  async getBookingsStats(currentUser: any) {
    if (currentUser.role === Role.CUSTOMER) {
      throw new ForbiddenException('Only staff and admin can view booking statistics');
    }

    const [total, byStatus, recent] = await Promise.all([
      this.prisma.booking.count(),
      this.prisma.booking.groupBy({
        by: ['status'],
        _count: { status: true },
      }),
      this.prisma.booking.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
          vehicle: true,
        },
      }),
    ]);

    return {
      total,
      byStatus: byStatus.reduce((acc, item) => {
        acc[item.status] = item._count.status;
        return acc;
      }, {} as Record<string, number>),
      recent,
    };
  }

  async getPaymentsStats(currentUser: any) {
    if (currentUser.role === Role.CUSTOMER) {
      throw new ForbiddenException('Only staff and admin can view payment statistics');
    }

    const [total, totalRevenue, byStatus, recent] = await Promise.all([
      this.prisma.payment.count(),
      this.prisma.payment.aggregate({
        where: { status: 'succeeded' },
        _sum: { amountCents: true },
      }),
      this.prisma.payment.groupBy({
        by: ['status'],
        _count: { status: true },
      }),
      this.prisma.payment.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          booking: {
            include: {
              user: {
                select: {
                  id: true,
                  email: true,
                  name: true,
                },
              },
              vehicle: true,
            },
          },
        },
      }),
    ]);

    return {
      total,
      totalRevenue: totalRevenue._sum.amountCents || 0,
      byStatus: byStatus.reduce((acc, item) => {
        acc[item.status] = item._count.status;
        return acc;
      }, {} as Record<string, number>),
      recent,
    };
  }
}