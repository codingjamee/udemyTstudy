export enum ProjectStatus {
  Active,
  Finished,
}

//project type설정하는 class
//type이 아닌 class로 해서 인스턴스화 하기
export class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}
