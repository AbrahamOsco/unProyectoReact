export interface Sub {
    nick: string;
    avatar: string;
    subMonths: number;
    description: string;
  }
  
  export type SubsResponsiveFromApi = Array<{
    nick: string,
    months: number,
    profileUrl: string, 
    description: string
  }>
  