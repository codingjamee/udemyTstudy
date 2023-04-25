abstract class Department {
  //클래스의 필드
  //클래스의 키이름만 정의한 것 키밸류 쌍이 아님
  //클래스를 기반으로 만들 객체를 입력하고 키가 갖게 될 값의 타입 정의
  //타입정의는 constructor에서 직접 해도 됨.
  name;
  static fiscalYear = 2020;

  //현재 Department클래스의 문제 : 외부에서 employees를 변경할 수 있음

  //private 속성
  //private속성을 추가해주면 프라이빗 필드로 변환.
  //객체 내부에서만 접근할 수 있는 속성이 됨.
  //제어자라고 표현함. 기본값은 public
  //타입스크립트만이 지원. 자바스크립트는 최근에 추가됨.
  //그래서 javascript에서 컴파일된 파일에서는 에러가 나지 않을 수 있음.
  // private employees: string[] = [];

  //protected는 접근 가능하나, 외부에서 변경 불가능한 속성.
  protected employees: string[] = [];

  //생성자 메서드 constructor
  //객체가 생성되며 실행되는 클래스에 기반하여 만드는 모든 객체에도 연결되는 함수
  constructor(protected id: string, n: string) {
    this.name = n; //this를 붙여야 인스턴스의 메서드와 속성에 접근가능.
    //69. 추상 클래스
    // console.log(Department.fiscalYear); //클래스 명으로 static변수에 접근가능 정적 메서드이므로
    // console.log(this.fiscalYear)//this로 접근하면 불가능(this는 클래스를 기반으로 생성된 인스턴스를 참조.)
  }

  //정적 메서드로 추가   //new키워드 없이 클래스에서 직접 호출(ex: const employee1 = Department.createEmployee("Marx");)
  static createEmployee(name: string) {
    return { name: name };
  }

  //메서드 추가하기
  addEmployee(employees: string) {
    this.employees.push(employees);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }

  //추상클래스
  abstract describe(this: Department): void; //추상클래스 보유해야하는 타입을 추가하지 말고 반환. void
  //이 메서드는 어떤 클래스로든 구현되어야 함(강제)
}

class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment; //클래스 자체에서 접근가능한 정적 속성.
  //타입이 클래스 자체.

  //70. 싱글톤 패턴
  //특정 클래스의 인스턴스를 하나만 갖도록 함.
  //constructor 앞에 private속성을 추가 그러면 외부에서 접근 불가.
  //내부에서 getInstance를 통해 접근하도록 함.

  private constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0];
  }

  static getInstance() {
    //이 클래스의 인스턴스가 있는 지 확인하고 없다면 새 인스턴스를 반환.
    if (this.instance) {
      return this.instance;
    }
    this.instance = new AccountingDepartment("d2", []);
    return this.instance;
  }

  //게터는 값을 가지고 올 때 함수나 메서드를 실행하는 속성
  //게터는 꼭 무언가를 반환하도록 작성.

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No Report Found.");
  }

  //세터는 게터와 비슷/
  //인수를 취해야 함
  //
  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("Please pass in a valid value!");
    }
    this.addReport(value);
  }

  //69강 추상클래스
  //현재 AccountingDepartment클래스는 Department에 기반한 클래스
  //Department의 모든 속성과 메서드에 접근할 수 있음
  //메서드는 재정의 할 수 있음(덮어씌우기)
  //abstract 클래스는 자체적으로 인스턴스화 할 수 없음
  //상속되어야 하는 클래스
  //상속된 클래스가 인스턴스화, 구체적 구현을 제공할 수 있음
  describe() {
    console.log("Accounting Department - ID: " + this.id);
    //id는 21번째 줄에서 private속성의로 정의  변경하려면 protected로 변경
  }

  addEmployee(name: string) {
    if (name === "Max") {
      return;
    }
    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }
}

//클래스 생성하기
// const accounting = new AccountingDepartment("a", ["Accounting"]); //private로 보호했으므로 new로 인스턴스 생성을 막음.

const accounting = AccountingDepartment.getInstance();
const accounting2 = AccountingDepartment.getInstance();

console.log(accounting, accounting2);
accounting.describe();
accounting.name = "NEW NAME";
accounting.printEmployeeInformation();
accounting.addEmployee("Max");
accounting.addEmployee("Manu");

//Department class의 문제 아래 코드처럼 employees에 직접 접근해 추가가 가능한 상태다.
//클래스 외부에서 employees에 접근하는 것을 허용해서는 안된다.
//private라는 속성을 추가했더니 에러가 났다.
// accounting.employees[2] = "Anna";

accounting.printEmployeeInformation();

console.log(accounting);

//아래와 같이 한다면 작동을 할까?
const accountingCopy = { describe: accounting.describe };
//작동은 한다. 그러나 문제는 메서드를 실행할 때 this가 객체를 참조하지 않음.
//decribe 메서드를 요청하는 것이 copy클래스인데,
//그럴 때 this를 호출하려면 점 앞에 있는 accountingCopy를 참조
//해결하려면 describe메서드에 (this)라는 매개변수를 입력
//ex : describe(this) {console.log(this.name)}
//여기서 this의 타입을 할당(그래야 에러도 안난다. ) Department 클래스에 기반한 인스턴스를 참조하는것.
//ex : describe(this:Department) {console.log(this.name)}

//객체는 결국 department 타입이 되므로 밑줄의 코드에 에러가 발생
//accountingCopy.describe();
//그러므로 describe가 에러없이 발동하려면
//Department클래스의 타입인 name 속성을 추가하여
//describe 메서드를 실행시킨다면 에러 없어짐
// accountingCopy.describe();

//상속. 65강
class ITDepartment extends Department {
  constructor(id: string, public admins: string[]) {
    super(id, "IT"); // 함수처럼 super를 실행해야 한다.
    //super는 기본 클래스의 생성자 호출하게 함.
  }

  describe() {
    console.log("IT Department - ID : " + this.id);
  }
}

const it = new ITDepartment("d1", ["Jane"]);

it.addEmployee("Max");
it.addEmployee("Maria");

it.describe();
it.name = "NEW NAME";
it.printEmployeeInformation();

console.log(it);
//메서드로 접근하는 것이 아니라 속성처럼 접근하는 방식을 사용
//this.lastReport가 있어야 접근할 수 있다. (조건문의 조건)
// accounting.addReport("Something went wrong...");

//아래는 setter로 lastReport를 설정하였으므로 에러가 나지 않음.

accounting.mostRecentReport = "Year End Report ";

console.log(accounting.mostRecentReport);

//68강. 정적 속성과 메서드
const employee1 = Department.createEmployee("Marx");
console.log(employee1);
//생성자 블록에서 static 메서드나 변수에는 접근할 수 없음
//this는 클래스를 기반으로 생성된 인스턴스를 참조
//접근하려면 클래스 이름을 사용해야 함.
