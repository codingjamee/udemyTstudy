import { Project } from "../models/project.js";
import { ProjectStatus } from "../models/project.js";

//Project State Management
//listener는 프로젝트 배열을 수신
type Listener<T> = (items: T[]) => void;
//void 함수가 반환하는 값은 신경쓰지 않음
//리스너가 발동될 때 몇가지 항목들을 얻을 수 있다고만 예상하고 싶음

//앱관리 대상이 되는 상태를 관리하는 클래스
//프로젝트에 하나만 있어야 함.
//여기서는 getInstance를 통해 하나만 관리함

class State<T> {
  //자식클래스에서도 접근할 수 있는 protected
  protected listeners: Listener<T>[] = [];
  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

//각기 다른 부분의 리스너 설정함
export class ProjectState extends State<Project> {
  //any로 말고 Project클래스로 타입을 설정,,,
  private projects: Project[] = [];

  //ProjectState 타입인 instance를 private로 입력
  private static instance: ProjectState;

  private constructor() {
    super();
  }
  //sumitHandler에서 addProject를 부르는 방법
  static getInstance() {
    //인스턴스를 한개만 얻기 위해 (싱글톤)
    if (this.instance) {
      return this.instance;
    }

    //프로젝트에 하나밖에 없는 instance를 생성
    //프로젝트에 하나의 상태관리 객체만 갖기 위해
    this.instance = new ProjectState();
    return this.instance;
  }

  //구독 패턴을 설정 리스너 목록 관리
  //무언가 변경될 때마다 함수목록 호출

  //addProject   //submit button을 클릭할 때마다 this.projects에 추가해줌
  addProject(title: string, description: string, numOfPeople: number) {
    //id를 랜덤으로 추가
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );
    // {
    //   id: Math.random().toString(),
    //   title: title,
    //   description: description,
    //   people: numOfPeople,
    // };
    //projects는 private하지만 class안에서 추가했으므로 가능
    this.projects.push(newProject);

    //projects가 바뀔 때마다
    //모든 리스너 함수를 소환
    //해당 업데이트된 프로젝트들목록을
    //프로젝트 목록 클래스에 전달 하는 방법
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
      //상태와 관련된것, project list를 전달하여 함수로 실행
      //카피된 projects를 전달하여
      //projects가 수정되지 않도록 함
    }
  }

  moveProject(prjId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((prj) => prj.id === prjId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

//항상 동일한 객체로 작업할 수 있게 됨
export const projectState = ProjectState.getInstance();
