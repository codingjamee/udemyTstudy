// function Logger(constructor: Function) {
//   console.log("Logging....");
//   console.log(constructor);
// }

// function Logger(target: Function) {
//   return function (constructor: Function) {
//     console.log("Logging....");
//     console.log(constructor);
//   };
// }

//데코레이터 팩토리 작업하기
function Logger(logString: string) {
  return function (constructor: Function) {
    console.log("Logging....");
    console.log(logString);
    console.log(constructor);
  };
}

// @Logger('LOGGING - PERSON')

//아래처럼 데코레이터 함수에서 새로운 constructor 함수를 return 하게 되면
//class를 정의할 때가 아닌, 인스턴스화 할 때 해당 컨스트럭터가
//실행된다.
function WithTemplate(template: string, hookId: string) {
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    // {new} 이건 컨스트럭터 함수일 것인데 ,
    //새로운 객체를 만들기 위해 new 키워드를 쓴다.
    //T가 기본적으로 가지고 있을 new 메서드는
    //몇 개의 인수든 컨스트럭터에 추가될 수 있다.(...args: any[])
    //new function은 name 속성을 가지고 있는
    //object를 리턴할 것: { name: string }

    //기존의 contructor함수를 유지하기 위해
    //새로운 constructor함수를 return 하는 것이 아니라
    //constructor에서 받은 class를 return 한다
    //이것은 인스턴스화 될 때 return 된다.
    return class extends originalConstructor {
      //*********
      //class 는 문법적 설탕일 뿐 construtor 함수를 return 하는 것일 뿐이다.
      constructor(..._: any[]) {
        super();
        //기존의 constructor 함수를 부르는 super
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
}

@WithTemplate("<h1>My Person Object</h1>", "app")
class Person {
  name = "Jenner";

  constructor() {
    console.log("Creating person object");
  }
}

// const pers = new Person();

// console.log(pers);

function Log(target: any, propertyName: string | Symbol) {
  console.log("property decorater!");
  console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Accessor decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Method decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}
//method에 접근할 수 있는 decorator나
//액세서에 접근할 수 있는 decorator는
//해당 액세서나 method의 구성요소를 변경할 수 있다.

function Log4(target: any, name: string | Symbol, position: number) {
  console.log("parameter decorator!");
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  //클래스 정의가 자바스크립트에 의해 등록되면
  //property decorater가 실행된다.
  @Log //여기에서 decorator 함수를 등록하면
  //prototype을 다루게 됨
  title: string;
  private _price: number;

  @Log2 //여기에서 decorator 함수를 등록하면
  //데코레이터에서 엑세서를 다룰 수 있게 됨
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Please enter a valid price: positive");
    }
  }
  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3 //데코레이터에서 setter function에 엑세스 할수 있게 됨
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

const p1 = new Product("Book", 19);
const p2 = new Product("Book 2 ", 29);

//데코레이터가 엑세서나 메서드를 수정하기

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  //original method에 접근할 수 있음.
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      //this는 getter 메서드를 트리거하는 것은 모든지 참조
      //getter메서드는 그것에 속해있는 확실한 객체로 트리거 된다.
      //getter 메서드 대신 this가
      //우리가 함께 정의한 객체를 항상 참조할 것
      //this는 eventlistner로 재정의되지 않음
      //getter는 실행되고 있는 함수와
      //그것이 속한 객체, 그리고 이벤트 리스너 사이에서의
      //추가적인 계층같은 것이기 때문
      return boundFn;
    },
  };
  return adjDescriptor;
}

class Printer {
  message = "This works!";

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector("button")!;
button.addEventListener("click", p.showMessage);

//데코레이터 유효성 검사

//데이터 불러올때 두세개의 course에서
//데이터를 가져올 수도 있다. 어딘지는 모른다.

//혹은 사용자가 데이터를 입력하게 하고
//그 데이터를 할당만 해서 사용자가 입력한 데이터로
//새로운 코스를 생성할 수 있다.

//이 데이터들은 맞다고 가정하지만 보장할 수 없다.
//입력 내용의 유효성을 검사해보자.
//입력하지 않은경우 / 가격이 0이거나 음수인경우 등

interface ValidatorConfig {
  //property: string은
  //유효한 속성을 등록하고 싶은 클래스 이름
  [property: string]: {
    [validatableProp: string]: string[]; //['required', 'positive']
    //list of validators
  };
  //:{} 여기에 저장할 obj는 validator가
  //첨부할 두가지 속성이 들어있음.
  //값은 array
}

//validatorConfig 타입을 가지는 obj
//초기에는 빈 객체
const registeredValidators: ValidatorConfig = {};

//여기서 regitsteredValidators에 추가함
//두개의 인수 중 target은 프로퍼티가 놓일
//object의 프로토타입
//
function Required(target: any, propName: string) {
  //target.constructor는
  //인스턴스의 프로토타입의 constructor로
  //생성자 함수를 가리킴

  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ["required"],
  };
  //propName은 validator를 키로 추가하려는 프로퍼티
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ["positive"],
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  let isValid;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          return isValid && !!obj[prop];
        case "positive":
          return isValid && obj[prop] > 0;
      }
    }
  }
  return true;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  // if (title.trim().length > 0) {
  // }
  //이렇게 할 수 있지만
  //모든 클래스에 이 로직을 추가해야 한다.

  const createdCourse = new Course(title, price);
  if (!validate(createdCourse)) {
    alert("Invalid input, please try again!");
  }
  console.log(createdCourse);
  console.log(validate);
});
