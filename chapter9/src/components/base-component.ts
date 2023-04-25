//Component Base Class
//user Interface component
//abstract를 붙임으로서 인스턴스화 하지 않게 함 상속받기 위해서만 사용
export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;

  //hostElement는 언제나 div태그일 필요가 없음
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    //어디에 이요소를 렌더링 할지

    insertAtStart: boolean,
    //어디에 둘지 true면 처음부분에 둘것
    //필수 매개변수는 선택 매개변수 다음에 올 수 없음 위치잘기억!
    newElementId?: string
  ) {
    this.templateElement = <HTMLTemplateElement>(
      document.getElementById(templateId)!
    );
    //this.templateElement는 ! (null이 되지도 않을 것이고 )
    //<> 안의 타입이 될 것을 보장함
    this.hostElement = <T>document.getElementById(hostElementId)!;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      //선택사항이므로 확인하여 추가
      this.element.id = newElementId;
    }
    this.attach(insertAtStart);
  }

  private attach(insertAtBeginning: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtBeginning ? "afterbegin" : "beforeend",
      this.element
    );
  }

  //component class를 상속받는 모든 클래스에 두 메서드 추가
  abstract configure(): void;
  abstract renderContent(): void;
}
