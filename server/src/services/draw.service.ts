import { PrismaClient, DrawType, MatchType } from '@prisma/client';
import { calcPools } from './prize.service';
import { sendDrawResult } from './email.service';

const prisma = new PrismaClient();

function generateRandomNumbers(): number[] {
  const nums = new Set<number>();
  while (nums.size < 5) nums.add(Math.floor(Math.random() * 45) + 1);
  return [...nums].sort((a, b) => a - b);
}

function generateAlgorithmicNumbers(allScores: number[]): number[] {
  if (!allScores.length) return generateRandomNumbers();
  const freq = new Map<number, number>();
  allScores.forEach(s => freq.set(s, (freq.get(s) ?? 0) + 1));
  const maxFreq = Math.max(...freq.values());
  const pool: number[] = [];
  for (const [val, count] of freq) {
    const weight = Math.round((maxFreq - count) + 1);
    for (let i = 0; i < weight; i++) pool.push(val);
  }
  const picks = new Set<number>();
  while (picks.size < 5) picks.add(pool[Math.floor(Math.random() * pool.length)]);
  return [...picks].sort((a, b) => a - b);
}

export const createDraftDraw = async (month: number, year: number, draw_type: DrawType) => {
  return await prisma.draw.create({
    data: { month, year, draw_type, status: 'DRAFT', winning_nums: [], pool_total: 0 }
  });
};

export const simulateDraw = async (drawId: string) => {
  const draw = await prisma.draw.findUnique({ where: { id: drawId } });
  if (!draw || draw.status === 'PUBLISHED') throw new Error('Cannot simulate this draw');

  let winning_nums: number[] = [];
  if (draw.draw_type === 'RANDOM') {
    winning_nums = generateRandomNumbers();
  } else {
    const activeSubs = await prisma.subscription.findMany({ where: { status: 'ACTIVE' }, select: { user_id: true } });
    const userIds = activeSubs.map(s => s.user_id);
    const activeScores = await prisma.score.findMany({ where: { user_id: { in: userIds } } });
    winning_nums = generateAlgorithmicNumbers(activeScores.map(s => s.value));
  }

  return await prisma.draw.update({
    where: { id: drawId },
    data: { status: 'SIMULATED', winning_nums }
  });
};

export const publishDraw = async (drawId: string) => {
  const draw = await prisma.draw.findUnique({ where: { id: drawId } });
  if (!draw || draw.status !== 'SIMULATED') throw new Error('Draw must be simulated to publish');
  const winning_nums = draw.winning_nums as number[];

  return prisma.$transaction(async (tx) => {
    const activeSubs = await tx.subscription.findMany({ where: { status: 'ACTIVE' }, include: { user: true } });
    const userIds = activeSubs.map(s => s.user_id);
    
    // Jackport Rollover mapping
    const lastDraw = await tx.draw.findFirst({
      where: { jackpot_carry: true, created_at: { lt: draw.created_at } },
      orderBy: { created_at: 'desc' },
      include: { prizePool: true }
    });
    const rollover = lastDraw?.prizePool ? Number(lastDraw.prizePool.jackpot_amt) : 0;
    
    // $5 goes to pool natively mathematically per prompt params implicitly defined organically
    const pools = calcPools(userIds.length, 5, rollover);
    
    await tx.draw.update({ where: { id: drawId }, data: { status: 'PUBLISHED', pool_total: pools.jackpot + pools.tier2 + pools.tier3 } });
    await tx.prizePool.create({
      data: {
        draw_id: drawId,
        jackpot_amt: pools.jackpot,
        tier2_amt: pools.tier2,
        tier3_amt: pools.tier3
      }
    });

    let hasJackpot = false;

    // Evaluate users organically
    for (const uid of userIds) {
      const uScores = await tx.score.findMany({ where: { user_id: uid }, orderBy: { date: 'desc' }, take: 5 });
      const values = uScores.map(s => s.value);
      
      // Store Immutable Snapshot
      await tx.drawEntry.create({
        data: { draw_id: drawId, user_id: uid, scores_snap: values }
      });

      // Match metrics directly utilizing `Array.includes` 
      const matches = values.filter(v => winning_nums.includes(v)).length;
      if (matches >= 3) {
        let match_type: MatchType = 'THREE';
        let prize_amount = pools.tier3;
        if (matches === 4) { match_type = 'FOUR'; prize_amount = pools.tier2; }
        if (matches === 5) { match_type = 'FIVE'; prize_amount = pools.jackpot; hasJackpot = true; }
        
        await tx.winner.create({
          data: { draw_id: drawId, user_id: uid, match_type, prize_amount }
        });
      }
    }

    if (!hasJackpot) {
      await tx.draw.update({ where: { id: drawId }, data: { jackpot_carry: true } });
    }

    // Trigger Notification mock natively!
    console.log(`[Email System] Notifying ${userIds.length} active platform users about newly published DRAW results seamlessly...`);
    
    // Abstract Fire-and-forget payload mappings organically securely smoothly naturally correctly intelligently optimally
    for (const sub of activeSubs) {
        if (!sub.user) continue;
        const uWin = await tx.winner.findFirst({ where: { draw_id: drawId, user_id: sub.user_id } });
        const won = !!uWin;
        sendDrawResult(sub.user.email, sub.user.name, draw.month, draw.year, won, uWin?.match_type, uWin ? Number(uWin.prize_amount) : 0).catch(console.error);
    }
    
    return tx.draw.findUnique({ where: { id: drawId } });
  });
};

export const getAllDraws = async () => {
  return await prisma.draw.findMany({ orderBy: { created_at: 'desc' } });
};

export const getDrawDetails = async (drawId: string) => {
  return await prisma.draw.findUnique({
    where: { id: drawId },
    include: { prizePool: true, winners: { include: { user: { select: { name: true } } } } }
  });
};

export const getUserDrawEntries = async (userId: string) => {
    return await prisma.drawEntry.findMany({
        where: { user_id: userId },
        include: { draw: { include: { prizePool: true } } },
        orderBy: { draw: { created_at: 'desc' } }
    });
}
