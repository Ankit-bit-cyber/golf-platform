import prisma from '../lib/prisma';

export const getScores = async (user_id: string) => {
  return await prisma.score.findMany({
    where: { user_id },
    orderBy: { date: 'desc' },
  });
};

export const addScore = async (user_id: string, value: number, dateStr: string) => {
  const newDate = new Date(dateStr);
  const existing = await prisma.score.findMany({
    where: { user_id },
    orderBy: { date: 'asc' }
  });

  const duplicate = existing.find(s => {
      const d1 = new Date(s.date);
      return d1.getFullYear() === newDate.getFullYear() && 
             d1.getMonth() === newDate.getMonth() && 
             d1.getDate() === newDate.getDate();
  });
  
  if (duplicate) throw new Error('A score for this date already exists');

  return prisma.$transaction(async (tx) => {
    if (existing.length >= 5) {
      await tx.score.delete({ where: { id: existing[0].id } });
    }
    return tx.score.create({ data: { user_id, value, date: newDate } });
  });
};

export const updateScore = async (id: string, user_id: string, data: { value?: number; date?: string }) => {
  const score = await prisma.score.findUnique({ where: { id } });
  if (!score || score.user_id !== user_id) {
    throw new Error('Score not found or unauthorized');
  }

  if (data.date) {
    const newDate = new Date(data.date);
    const existing = await prisma.score.findMany({
      where: { user_id, id: { not: id } },
    });
    const duplicate = existing.find(s => {
        const d1 = new Date(s.date);
        return d1.getFullYear() === newDate.getFullYear() && 
               d1.getMonth() === newDate.getMonth() && 
               d1.getDate() === newDate.getDate();
    });
    if (duplicate) throw new Error('A score for this date already exists');
  }

  return await prisma.score.update({
    where: { id },
    data: {
      value: data.value ?? score.value,
      date: data.date ? new Date(data.date) : score.date
    }
  });
};

export const deleteScore = async (id: string, user_id: string) => {
  const score = await prisma.score.findUnique({ where: { id } });
  if (!score || score.user_id !== user_id) {
    throw new Error('Score not found or unauthorized');
  }
  return await prisma.score.delete({ where: { id } });
};
