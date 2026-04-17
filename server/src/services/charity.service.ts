import prisma from '../lib/prisma';

export const getAllCharities = async (featured?: boolean, search?: string) => {
  return await prisma.charity.findMany({
    where: {
      ...(featured !== undefined && { is_featured: featured }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ]
      }),
    },
    orderBy: { created_at: 'desc' }
  });
};

export const getCharityById = async (id: string) => {
  const charity = await prisma.charity.findUnique({ where: { id } });
  if (!charity) throw new Error('Charity not found');
  return charity;
};

export const createCharity = async (data: any) => {
  return await prisma.charity.create({ data });
};

export const updateCharity = async (id: string, data: any) => {
  return await prisma.charity.update({ where: { id }, data });
};

export const deleteCharity = async (id: string) => {
  return await prisma.charity.delete({ where: { id } });
};
