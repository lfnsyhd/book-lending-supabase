import jwt from 'jsonwebtoken';
import supabase from '../supabase.js';

const getUserId = (req) => {
  const token = req.header('Authorization')?.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded?.sub;
}

// Middleware untuk memastikan pengguna memiliki role "admin"
export const authorizeAdmin = async (req, res, next) => {
  const userId = getUserId(req);

  const { error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .eq('role', 'admin')
    .single();

  if(error) {
    return res.status(403).json({ message: 'Access denied, admin only', userId });
  }

  next();
};

// Middleware untuk memastikan pengguna memiliki role "user"
export const authorizeUser = async (req, res, next) => {
  const userId = getUserId(req);

  const { error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .eq('role', 'user')
    .single();

  if (error) {
    return res.status(403).json({ message: 'Access denied, user only' });
  }
  next();
};

// export default {
//   authorizeAdmin,
//   authorizeUser
// }
