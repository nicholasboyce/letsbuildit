import { GithubUserTable } from "./GithubUser";
import { RCUserTable } from "./RCUser";

export interface Database {
    githubUser: GithubUserTable
    rcUser: RCUserTable
}