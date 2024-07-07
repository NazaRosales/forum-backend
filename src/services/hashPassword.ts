import bcrypt from "bcrypt";

const hashPassword = async (plainText: string): Promise<string> => {
  try {
    const saltRounds: number = 10;
    const salt: string = await bcrypt.genSalt(saltRounds);
    const hash: string = await bcrypt.hash(plainText, salt);
    return hash;
  } catch (error) {
    console.log("Error hashing password", error);
    throw new Error("Error hashing password");
  }
};

export default hashPassword;
