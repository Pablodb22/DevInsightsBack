import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'FaLLbaCk-!secret-!key-?for?--dev-insiGhts';

/**
 * Generates a JSON Web Token (JWT) for a given payload.
 * @param payload The data to store in the token.
 * @param expiresIn Expiration time (e.g., '24h', '7d'). Defaults to '24h'.
 * @returns The signed token string.
 */
export function generateToken(payload: object, expiresIn: jwt.SignOptions['expiresIn'] = '24h'): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

/**
 * Verifies a JSON Web Token (JWT) and returns the decoded payload.
 * Throws an error if the token is invalid or expired.
 * @param token The token string to verify.
 * @returns The decoded payload.
 */
export function verifyToken<T = any>(token: string): T {
  return jwt.verify(token, JWT_SECRET) as T;
}
