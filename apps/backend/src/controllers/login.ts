export const login = async (req: any, res: any) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }
  // Actual endpoint: just echo back the email for now
  return res.json({ message: 'Login received', email });
};
  