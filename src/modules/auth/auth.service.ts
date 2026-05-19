import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

dotenv.config();

@Injectable()
export class AuthService {

  prisma = new PrismaClient();
  
  async register(body: {email: string, password: string, name: string, lastName: string}) {
    const {email, password, name, lastName} = body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    
    const user = await this.prisma.user.create({
        data: {
            email,
            password: hash,
            name,
            lastName
        }
    });

    const { password: _, ...userWithoutPassword } = user;
    return {ok:true, message:'Usuario creado correctamente', data: userWithoutPassword};
  }
}
