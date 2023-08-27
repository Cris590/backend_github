import { Controller, Get, Param, Body, Post } from '@nestjs/common';
import { GithubService } from '../services/github.service';
import { GetBranchInterface } from 'src/interfaces/github.interfaces';

@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get(':username')
  async getUserInfo(@Param('username') username: string) {
    const userInfo = await this.githubService.getUserInfo(username);
    return userInfo;
  }

  @Get('branches/:repo')
  async getBranchesPerRepo(@Param('repo') repo: string) {
    const branches = await this.githubService.getBranches(repo);
    // return userInfo;
    return branches;
  }

  @Post('commits')
  async getCommits(@Body() requestBody: GetBranchInterface) {
    const userInfo = await this.githubService.getCommits(requestBody);
    return userInfo;
  }
}
