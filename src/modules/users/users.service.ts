import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import { decodeToken } from '../../utils/token';
import * as bcrypt from 'bcrypt';

dotenv.config();

@Injectable()
export class UsersService {

  prisma = new PrismaClient();

  async getUser(authorization: string) {
  const token = authorization?.replace('Bearer ', '').trim();
  const decoded = decodeToken(token);

  if (!decoded || !decoded.email) {
    console.warn('⚠️ Token no decodificado');
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

    async updateUser(data: any) {
    try {
      const existing = await this.prisma.user.findUnique({ where: { email: data.email } });
      if (!existing) {
        throw new HttpException('Usuario no encontrado.', HttpStatus.NOT_FOUND);
      }

      const updatedUser = await this.prisma.user.update({
        where: { email: data.email },
        data: { name: data.name, lastName: data.lastName, location: data.location }
      });
      const { password, ...rest } = updatedUser;
      return rest;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException('Error al actualizar el perfil.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updatePass(data: any) {
    try {
      if (data.newPassword !== data.confirmPassword) {
        throw new HttpException('Las contraseñas no coinciden.', HttpStatus.BAD_REQUEST);
      }

      const user = await this.prisma.user.findUnique({ where: { email: data.email } });
      if (!user) {
        throw new HttpException('Usuario no encontrado.', HttpStatus.NOT_FOUND);
      }

      const isMatch = await bcrypt.compare(data.currentPassword, user.password);
      if (!isMatch) {
        throw new HttpException('La contraseña actual es incorrecta.', HttpStatus.UNAUTHORIZED);
      }

      const hash = bcrypt.hashSync(data.newPassword, bcrypt.genSaltSync(10));
      const updatedUser = await this.prisma.user.update({
        where: { email: data.email },
        data: { password: hash }
      });

      const { password, ...rest } = updatedUser;
      return rest;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException('Error al actualizar la contraseña.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateToken(data: any) {
    try {
      const existing = await this.prisma.user.findUnique({ where: { email: data.email } });
      if (!existing) {
        throw new HttpException('Usuario no encontrado.', HttpStatus.NOT_FOUND);
      }

      const updatedUser = await this.prisma.user.update({
        where: { email: data.email },
        data: { githubToken: data.githubToken }
      });
      const { password, ...rest } = updatedUser;
      return rest;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException('Error al guardar el token.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
