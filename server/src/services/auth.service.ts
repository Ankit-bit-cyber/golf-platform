import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

const prisma = new PrismaClient();

export const registerUser = async (data: any) => {
  const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
  if (existingUser) {
    throw new Error('Email already in use');
  }

  const hashedPassword = await bcrypt.hash(data.password, 12);

  const user = await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      password_hash: hashedPassword,
      charity_id: data.charity_id || null,
      subscription: {
        create: {
          plan: data.plan,
          status: 'ACTIVE',
          start_date: new Date(),
          end_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
          is_dummy: true,
        }
      }
    },
    include: {
      subscription: true,
    }
  });

  const { password_hash, ...userWithoutPassword } = user;
  
  const accessToken = jwt.sign({ id: user.id, role: user.role }, env.JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ id: user.id }, env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

  return { user: userWithoutPassword, accessToken, refreshToken };
};

export const loginUser = async (data: any) => {
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(data.password, user.password_hash);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const { password_hash, ...userWithoutPassword } = user;
  const accessToken = jwt.sign({ id: user.id, role: user.role }, env.JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ id: user.id }, env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

  return { user: userWithoutPassword, accessToken, refreshToken };
};

export const refreshAccessToken = async (token: string) => {
  try {
    const payload = jwt.verify(token, env.JWT_REFRESH_SECRET) as { id: string };
    
    const user = await prisma.user.findUnique({ where: { id: payload.id } });
    if (!user) throw new Error('User not found');

    const accessToken = jwt.sign({ id: user.id, role: user.role }, env.JWT_SECRET, { expiresIn: '15m' });
    return { accessToken };
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
};
