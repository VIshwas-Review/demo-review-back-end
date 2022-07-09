import { sign, verify, decode } from 'jsonwebtoken'
import type { SignOptions, JwtPayload } from 'jsonwebtoken'

import { JWT_SECRET } from '../config/variables'

const defaultOptions = { expiresIn: '1d' }

export function generateToken<P extends object>(payload: P, options?: SignOptions) {
  const token = sign(payload, JWT_SECRET, options || defaultOptions)

  return token
}

export function verifyAccessToken<P>(token: string, onlyDecode?: boolean): P | null {
  const payload = onlyDecode ? decode(token) : verify(token, JWT_SECRET)

  return payload as P
}
