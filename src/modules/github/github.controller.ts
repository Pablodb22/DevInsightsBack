import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { GithubService } from './github.service';



@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get('data')
  getDataGit(@Headers('authorization') authorization: string) {
    return this.githubService.getDataGit(authorization);
  }
}
