import * as bcrypt from 'bcryptjs';

const saltOrRounds = 10;
const hashPass = async (password: string) =>
  bcrypt.hash(password, saltOrRounds).then((res) => res);
const isMatch = async (password: string, hashedPassword: string) =>
  await bcrypt.compare(password, hashedPassword);

export default {
  hashPass,
  isMatch,
};
