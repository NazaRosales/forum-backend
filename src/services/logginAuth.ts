import bcrypt from "bcrypt";
const loggingAuth = async (
  password: string,
  hash: string
): Promise<boolean> => {
  const match = await bcrypt.compare(password, hash);
  return match;
};
export default loggingAuth;
