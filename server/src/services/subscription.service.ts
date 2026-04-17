import prisma from '../lib/prisma';
import { SubscriptionPlan } from '@prisma/client';
import { sendSubscriptionConfirmation } from './email.service';

export const getSubscription = async (user_id: string) => {
  return await prisma.subscription.findUnique({
    where: { user_id }
  });
};

export const updatePlan = async (user_id: string, plan: SubscriptionPlan) => {
  const sub = await getSubscription(user_id);
  if (!sub) throw new Error('Subscription not found');

  const now = new Date();
  const endDate = new Date();
  if (plan === 'MONTHLY') {
      endDate.setMonth(now.getMonth() + 1);
  } else {
      endDate.setFullYear(now.getFullYear() + 1);
  }

  const subObj = await prisma.subscription.update({
    where: { user_id },
    data: {
      plan,
      status: 'ACTIVE',
      is_dummy: true,
      start_date: now,
      end_date: endDate
    },
    include: { user: true }
  });
  
  if (subObj.user) {
      sendSubscriptionConfirmation(subObj.user.email, subObj.user.name, plan).catch(console.error);
  }
  return subObj;
};

export const isActive = async (user_id: string) => {
  const sub = await getSubscription(user_id);
  if (!sub) return false;
  if (sub.status !== 'ACTIVE') return false;
  return sub.end_date > new Date();
};
