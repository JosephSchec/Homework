export interface BlogInfo {
  id: number;
  name: string;
  website: string;
  companyName: string;
  companyCatchPhrase: string;
  companyBs: string;
}
export interface BlogInfoServerResponse {
  map(arg0: (blog: any) => { id: any; name: any; website: any; companyName: any; companyCatchPhrase: any; companyBs: any; }): any;
  id: number;
  name: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  }
}
