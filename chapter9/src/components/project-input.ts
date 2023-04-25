import { Validatable, validate } from "../util/validation.js";
import { Component } from "./base-component.js";
import { Autobind } from "../decorator/autobind.js";
import { projectState } from "../state/project-state.js";

//ProjectInput class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");
    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    // this.templateElement = <HTMLTemplateElement>(
    //   document.getElementById("project-input")!
    // );
    // //this.templateElement는 ! (null이 되지 않을 것이고 )
    // //<> 안의 타입이 될 것을 보장함
    // this.hostElement = <HTMLDivElement>document.getElementById("app")!;

    // const importedNode = document.importNode(
    //   this.templateElement.content,
    //   true
    // );

    // this.element = importedNode.firstElementChild as HTMLFormElement;
    // this.element.id = "user-input";

    this.configure();
    // this.attach();
    //templateElement는 템플릿의 내용을 참조.
    //content 는 HTMLtemplateElement에 존재하는 프로퍼티

    //importedNode는 documentFragment
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler);
    // private attach() {
    //   this.hostElement.insertAdjacentElement("afterbegin", this.element);
    //   //특정 위치에 노드 삽입
    //   //1번째. 인수 어디에 삽입할지
    // }
  }

  renderContent() {}

  //사용자 입력을 취합
  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };

    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };

    const peopleValidatable: Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };
    //validate
    if (
      //하나라도 false면 alert를 띄운다.
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert("Invalid input, please try again!");
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    console.log(this.titleInputElement.value);
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      //array인 경우 튜플
      const [title, desc, people] = userInput;
      //sumitHandler에서 addProject를 부르는 방법
      projectState.addProject(title, desc, people);
      console.log(title, desc, people);
      this.clearInputs();
    }
  }
}
