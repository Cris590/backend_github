/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Octokit } from '@octokit/rest';
import { GetBranchInterface } from 'src/interfaces/github.interfaces';

@Injectable()
export class GithubService {
  private octokit: Octokit;
  private owner: string;

  constructor() {
    this.owner = 'Cris590';
    this.octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });
  }

  // eslint-disable-next-line prettier/prettier
  async getBranches(repo:string) {
    try {
      if ( repo !== 'backend_github' && repo !== 'frontend_github' ) throw new Error('Not allowed to get info of this repository') 
      const response = await this.octokit.repos.listBranches({
        owner: this.owner,
        repo: repo,
      });
      return response.data.map((repository)=>repository.name);
    } catch (error) {
      console.error('Error getting commits:', error.message);
      return {error:error.message};
    }
  }

  // eslint-disable-next-line prettier/prettier
  async getCommits( {repo, branch}:GetBranchInterface) {
    try {
      if ( repo !== 'backend_github' && repo !== 'frontend_github' ) throw new Error('Not allowed to get info of this repository') 
      const response = await this.octokit.repos.listCommits({
        owner: this.owner,
        repo: repo,
        sha: branch, // The branch name or commit SHA
      });
      return response.data.map((repository)=>{

        return {
          sha:repository.sha,
          author:repository.commit.author.name,
          email:repository.commit.author.email,
          date:repository.commit.author.date,
          message:repository.commit.message,
          html_url:repository.html_url
        }
      });
    } catch (error) {
      console.error('Error getting commits:', error.message);
      return {error:error.message};
    }
  }
}
