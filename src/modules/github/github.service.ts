import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { decodeToken } from 'src/utils/token';

@Injectable()
export class GithubService {

  prisma = new PrismaClient();

async getDataGit(authorization: string) {
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

    if (!user) {
      console.warn('⚠️ Usuario no encontrado');
      return null;
    }

    if (!user.githubToken) {
      console.warn('⚠️ El usuario no tiene githubToken guardado');
      return [];
    }

    const response = await fetch('https://api.github.com/user/repos', {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${user.githubToken}`,
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    const data = await response.json();

    if (!Array.isArray(data)) {
      console.error('❌ GitHub API error:', data);
      return [];
    }

    return data;

  } catch (error) {
    console.error('❌ Error:', error);
    return [];
  }
}
  }
