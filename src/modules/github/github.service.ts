import { Injectable } from '@nestjs/common';


@Injectable()
export class GithubService {
  create(createGithubDto: any) {
    return 'This action adds a new github';
  }

  findAll() {
    return `This action returns all github`;
  }

  findOne(id: number) {
    return `This action returns a #${id} github`;
  }

  update(id: number, updateGithubDto: any) {
    return `This action updates a #${id} github`;
  }

  remove(id: number) {
    return `This action removes a #${id} github`;
  }
}
