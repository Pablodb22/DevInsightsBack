import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import { decodeToken } from '../../utils/token';
import * as bcrypt from 'bcrypt';

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

  async updateUser(data: any) {
    try{
      const existing = await this.prisma.user.findUnique({ where: { email: data.email } });
      if (!existing) {
        return null;
      }

      const updatedUser = await this.prisma.user.update({
        where: { email: data.email },
        data: {
          name: data.name,
          lastName: data.lastName,
          location: data.location
        }
      });
      const { password, ...userWithoutPassword } = updatedUser;
      return userWithoutPassword;
    }catch(error){        
        return null;
    }
  }

  async updatePass(data: any) {
    try{

      if(data.newPassword !== data.confirmPassword){
        return null;
      }

      const updatePass=await this.prisma.user.findUnique({
        where: { email: data.email }
      });

      if (!updatePass) {
        return null;
      }

      const isMatch = await bcrypt.compare(
        data.currentPassword,
        updatePass!.password
      );

      if (!isMatch) {
        return null;
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(data.newPassword, salt);

      const updatedUser = await this.prisma.user.update({
        where: { email: data.email },
        data: {
          password: hash
        }
      });


      const { password, ...userWithoutPassword } = updatedUser;
      return userWithoutPassword;
    }catch(error){
        return null;
    }    
  }

  async updateToken(data: any) {
    try {
      const existing = await this.prisma.user.findUnique({ where: { email: data.email } });
      if (!existing) {
        return null;
      }

      const updatedUser = await this.prisma.user.update({
        where: { email: data.email },
        data: {
          githubToken: data.githubToken
        }
      });
      const { password, ...userWithoutPassword } = updatedUser;
      return userWithoutPassword;
    } catch (error) {
      return null;
    }
  }
}
