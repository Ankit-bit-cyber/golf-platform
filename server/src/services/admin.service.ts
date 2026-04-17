import prisma from '../lib/prisma';

export const getPlatformStats = async () => {
    const totalUsers = await prisma.user.count({ where: { role: 'USER' } });
    const activeSubscribers = await prisma.subscription.count({ where: { status: 'ACTIVE' } });
    const drawCount = await prisma.draw.count();
    
    const poolAgg = await prisma.draw.aggregate({
        _sum: { pool_total: true }
    });
    
    const totalPrizePool = Number(poolAgg._sum.pool_total || 0);
    const totalCharityContributions = totalPrizePool * 0.25; 

    return {
        totalUsers,
        activeSubscribers,
        totalPrizePool,
        totalCharityContributions,
        drawCount
    };
}

export const getUsers = async (page: number, limit: number, search: string) => {
    const skip = (page - 1) * limit;
    const whereClause: any = { role: 'USER' };
    
    if (search) {
        whereClause.OR = [
            { name: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } }
        ];
    }
    
    const [users, total] = await Promise.all([
        prisma.user.findMany({
            where: whereClause,
            include: { subscription: true, scores: true },
            skip,
            take: limit,
            orderBy: { created_at: 'desc' }
        }),
        prisma.user.count({ where: whereClause })
    ]);
    
    return { users, total, pages: Math.ceil(total / limit) };
}

export const toggleUserSubscription = async (userId: string) => {
    const sub = await prisma.subscription.findUnique({ where: { user_id: userId } });
    if (!sub) throw new Error('No subscription mapping natively detected organically.');
    
    const newStatus = sub.status === 'ACTIVE' ? 'CANCELLED' : 'ACTIVE';
    return await prisma.subscription.update({
        where: { user_id: userId },
        data: { status: newStatus }
    });
}
