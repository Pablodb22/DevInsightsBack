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

export type DecodedToken<T = any> = T & {
  newToken?: string;
};

/**
 * Verifies a JSON Web Token (JWT) and returns the decoded payload.
 * If the token is invalid because of the expiration date, it generates a new token.
 * Throws an error if the token is invalid for other reasons.
 * @param token The token string to verify.
 * @returns The decoded payload, potentially with a new token.
 */
export function verifyToken<T = any>(token: string): DecodedToken<T> {
  try {
    return jwt.verify(token, JWT_SECRET) as DecodedToken<T>;
  } catch (error: any) {
    if (error && error.name === 'TokenExpiredError') {
      const decoded = jwt.verify(token, JWT_SECRET, { ignoreExpiration: true }) as any;
      const { iat, exp, nbf, iss, sub, aud, jti, ...cleanPayload } = decoded;
      const newToken = generateToken(cleanPayload);
      return {
        ...decoded,
        newToken,
      } as DecodedToken<T>;
    }
    throw error;
  }
}

/**
 * Decodes a JSON Web Token (JWT) and returns its payload.
 * Verifies the signature but ignores the expiration date.
 * Returns null if the token signature is invalid or verification fails.
 * @param token The token string.
 * @returns The decoded payload, or null.
 */
export function decodeToken<T = any>(token: string): T | null {
  try {
    return jwt.verify(token, JWT_SECRET, { ignoreExpiration: true }) as T;
  } catch {
    return null;
  }
}


