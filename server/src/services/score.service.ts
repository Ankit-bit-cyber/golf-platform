import { PrismaClient } from '@prisma/client';
import { isSameDay, parseISO } from 'date-fns';

const prisma = new PrismaClient();

export const getScores = async (user_id: string) => {
  return await prisma.score.findMany({
    where: { user_id },
    orderBy: { date: 'desc' },
  });
};

export const addScore = async (user_id: string, value: number, dateStr: string) => {
  const newDate = parseISO(dateStr);
  const existing = await prisma.score.findMany({
    where: { user_id },
    orderBy: { date: 'asc' }
  });

  const duplicate = existing.find(s => isSameDay(new Date(s.date), newDate));
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
    const newDate = parseISO(data.date);
    const existing = await prisma.score.findMany({
      where: { user_id, id: { not: id } },
    });
    const duplicate = existing.find(s => isSameDay(new Date(s.date), newDate));
    if (duplicate) throw new Error('A score for this date already exists');
  }

  return await prisma.score.update({
    where: { id },
    data: {
      value: data.value ?? score.value,
      date: data.date ? parseISO(data.date) : score.date
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
