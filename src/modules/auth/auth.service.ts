import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { LoginRequest } from './dto/LoginRequest';
import { RegisterRequest } from './dto/RegisterRequest';
import { generateToken } from '../../utils/token';

dotenv.config();

@Injectable()
export class AuthService {

  prisma = new PrismaClient();
  
  async register(body: RegisterRequest) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(body.password, salt);
    
    const user = await this.prisma.user.create({
        data: {
            email: body.email,
            password: hash,
            name: body.name,
            lastName: body.lastName
        }
    });
    
    return {ok:true, message:'Usuario creado correctamente'};
  }

  async login(body: LoginRequest){
    
    const user = await this.prisma.user.findUnique({where:{email:body.email}});
    
    if(!user){
      return {ok:false,message:'Usuario no encontrado'}
    }

    const isMatch = bcrypt.compareSync(body.password, user.password);
    if(!isMatch){
      return {ok:false,message:'Contraseña incorrecta'}
    }
        
    const token = generateToken({ email: user.email });
    
    return {ok:true, message:'Usuario logueado correctamente', data:token}

  
  }
}
