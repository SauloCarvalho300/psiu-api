import bcrypt from 'bcrypt'

export async function encrytPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  return hash
}

export async function checkPassword(
  password: string,
  passwordHash: string,
): Promise<boolean> {
  return bcrypt.compare(password, passwordHash)
}
