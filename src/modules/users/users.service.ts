import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import { decodeToken } from '../../utils/token';

dotenv.config();

@Injectable()
export class UsersService {

  prisma = new PrismaClient();

  async getUser(token: string) {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.email) {
      return null;
    }

    try {
      const user = await this.prisma.user.findUnique({
        where: { email: decoded.email }
      });
      if (user) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }
      return null;
    } catch (error) {
      return null;
    }
  }
}
