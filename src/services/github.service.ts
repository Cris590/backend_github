import { Injectable } from '@nestjs/common';
import { Octokit } from '@octokit/rest';
import { GetBranchInterface } from 'src/interfaces/github.interfaces';
// import {GetBranchInterface} from '../../../interfaces/github.interfaces'

@Injectable()
export class GithubService {
  private octokit: Octokit;
  private owner: string;

  constructor() {
    this.owner = 'Cris590';
    this.octokit = new Octokit({
      auth: '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',
    });
  }

  async getUserInfo(username: string) {
    const response = await this.octokit.users.getByUsername({
      username: username,
    });
    return response.data;
  }

  // eslint-disable-next-line prettier/prettier
  async getBranches(repo:string) {
    try {
      const response = await this.octokit.repos.listBranches({
        owner: this.owner,
        repo: repo,
      });
      return response.data;
    } catch (error) {
      console.error('Error getting commits:', error.message);
      return [];
    }
  }

  // eslint-disable-next-line prettier/prettier
  async getCommits( {repo, branch}:GetBranchInterface) {
    try {
      const response = await this.octokit.repos.listCommits({
        owner: this.owner,
        repo: repo,
        sha: branch, // The branch name or commit SHA
      });
      return response.data;
    } catch (error) {
      console.error('Error getting commits:', error.message);
      return [];
    }
  }
}
