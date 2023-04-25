//72 첫번째 인터페이스
//인터페이스란 : 객체의 구조나 함수의 구조를 정의함
//함수의 구조를 정의하는 것은 exception
//inerface 키워드로 인터페이스를 생성. 타입스크립트에만 존재.

//추상클래스와 다른점 :
//인터페이스에는 실행이 없고
//추상클래스에서 강제로 구현되어야 했던 부분이 여기선 없음

//how to create function type AddFn
type AddFn = (a: number, b: number) => number;
let add: AddFn;

//how to define a function with interface
interface AddFn2 {
  (a: number, b: number): number;
} // it's like define method without name
//now we have an anonymous function
//ts will understand this interface as function type

interface Named {
  readonly name?: string; //구조만 있으며 구체적 값은 할당할 수 없음.
  ouputName?: string; //it's optional property
}

//이름은 대문자인것이 관례
interface Greetable extends Named {
  //can implement inheritance and interfaces
  // interface Greetable extends Named, AnotherInterface { //can merge interface with comma
  //interface에서는 public 이나 private속성을 추가할 수 없음.

  //readonly속성을 사용하면 오로지 한번만 초기화 할 수 있게 됨. 그 다음은 리드온리. 수정될 수 없음.

  //메서드도 입력할 수 있음.
  //구조는 메서드 이름(인수이름:인수의 타입):메서드 반환타입
  greet(phrase: string): void; //return is void(nothing to return a value)
}

class Person implements Greetable {
  //implements라는 키워드로 인터페이스의 약속을 지켜야 한다고 알려줄 수 있음.
  //여러개의 인터페이스를 구현할 수 있음. (상속과의 차이점)
  name?: string;
  constructor(n?: string) {
    if (n) {
      //if n were truthy, we could set in block
      this.name = n;
    }
  }
  greet(phrase: string) {
    if (this.name) {
      console.log(phrase + " " + this.name);
    } else {
      console.log("Hi!");
    }
  }
}

let user1: Greetable; //인터페이스를 타입으로 사용할 수 있음

user1 = new Person();
user1.greet("Hi there - I am");
console.log(user1);
// user1 = {
//   // name: "Jane",
//   // age: 20, //이 부분은 Greetable에 없는 요소이므로 에러남.
//   greet(phrase: string) {
//     console.log("Hi " + phrase + this.name);
//   },
// };

//인터페이스의 필요성과 type과의 차이점
//인터페이스는 객체의 구조를 설명하기 위해서만 사용
//인터페이스와 유니언 타입의 차이:
//인터페이스가 더 깔끔할 수 있음
//이행하고 준수해야 하는 약속처럼 사용.
//위의 Greetable 인터페이스는 이름과 greet 메서드를 지닌 객체여야 함.
