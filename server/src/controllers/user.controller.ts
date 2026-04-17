import prisma from '../lib/prisma';

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      include: { charity: true, subscription: true }
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    const { password_hash, ...u } = user;
    res.json(u);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCharityPreference = async (req: Request, res: Response) => {
  try {
    const { charity_id, charity_pct } = req.body;
    
    const updated = await prisma.user.update({
      where: { id: req.user!.id },
      data: { charity_id, charity_pct },
      include: { charity: true }
    });
    
    const { password_hash, ...u } = updated;
    res.json(u);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
