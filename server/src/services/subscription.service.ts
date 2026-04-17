import { PrismaClient, SubscriptionPlan } from '@prisma/client';
import { addMonths, addYears } from 'date-fns';
import { sendSubscriptionConfirmation } from './email.service';

const prisma = new PrismaClient();

export const getSubscription = async (user_id: string) => {
  return await prisma.subscription.findUnique({
    where: { user_id }
  });
};

export const updatePlan = async (user_id: string, plan: SubscriptionPlan) => {
  const sub = await getSubscription(user_id);
  if (!sub) throw new Error('Subscription not found');

  const now = new Date();
  const endDate = plan === 'MONTHLY' ? addMonths(now, 1) : addYears(now, 1);

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
