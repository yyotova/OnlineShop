import User from "../models/user";


export const isAdmin = async (req: any, res: any, next: any) => {
  try {
    const user: any = await User.findById(req.user.id);
    if (req.user && user.isAdmin) {
      return next();
    }
  } catch (err: any) {
    return res.status(401).json({ error: err.message });
  }
};