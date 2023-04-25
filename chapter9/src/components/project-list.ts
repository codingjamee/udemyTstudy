import { Component } from "./base-component.js";
import { DragTarget } from "../models/drag-drop.js";
import { Autobind } from "../decorator/autobind.js";
import { ProjectItem } from "./project-item.js";
import { Project } from "../models/project.js";
import { ProjectStatus } from "../models/project.js";
import { projectState } from "../state/project-state.js";

//ProjectList class
//화면에 출력할 수 있는 class
export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  //생성자 필드에만 설정하고
  //addListener함수에서만 참조함
  //생성자에서 바로 실행되지 않게 됨
  assignedProjects: Project[];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);
    //매개변수 앞에 accessor를 붙이고 동일한 이름의 속성 생성,
    //동일 명칭의 속성 내 인자에 전달된 값을 전달
    // this.templateElement = <HTMLTemplateElement>(
    //   document.getElementById("project-list")!
    // );
    // //this.templateElement는 ! (null이 되지도 않을 것이고 )
    // //<> 안의 타입이 될 것을 보장함
    // this.hostElement = <HTMLDivElement>document.getElementById("app")!;
    this.assignedProjects = [];

    this.configure();
    this.renderContent();

    // const importedNode = document.importNode(
    //   this.templateElement.content,
    //   true
    // );

    // this.element = importedNode.firstElementChild as HTMLElement;
    // this.element.id = `${this.type}-projects`;

    // this.attach();
    //base Component에 있으므로
  }

  @Autobind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.add("droppable");
    }
  }

  @Autobind
  dropHandler(event: DragEvent) {
    const prjId = event.dataTransfer!.getData("text/plain");
    projectState.moveProject(
      prjId,
      this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }

  @Autobind
  dragLeaveHandler(_: DragEvent) {
    const listEl = this.element.querySelector("ul")!;
    listEl.classList.remove("droppable");
  }

  configure() {
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
    this.element.addEventListener("drop", this.dropHandler);
    //리스너 함수 등록
    //projectState에서 호출될 때 해당 함수로 프로젝트 목록을 얻을 수 있음.
    projectState.addListener((projects: Project[]) => {
      //필터링하기
      const relevanetProjects = projects.filter((prj) => {
        if (this.type === "active") {
          return prj.status === ProjectStatus.Active;
        }
        return prj.status === ProjectStatus.Finished;
      });
      //새로운 프로젝트로 오버라이딩 함
      this.assignedProjects = relevanetProjects;
      this.renderProjects();
    });
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    //ul태그에 id추가
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }

  //모든 프로젝트를 render하기
  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    listEl.innerHTML = "";
    //목록에서 보유한 모든 프로젝트를 렌더링
    for (const prjItem of this.assignedProjects) {
      new ProjectItem(this.element.querySelector("ul")!.id, prjItem);
    }
    //프로젝트안에서 listId로 감
  }
}
