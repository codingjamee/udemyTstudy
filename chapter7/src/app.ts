// const names: Array<string> = []; //generic type

// //promise type

// const promise: Promise<string> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("This is done!");
//   }, 2000);
// }); //이때 타입을 정하지 않은 promise의 타입은 <unknown>
// //Promise<string> 라고 정해줌 >
// //다른 타입과 함께 일하는 array같음
// //return 하는 데이터의 타입을 정해주는 것과 같음

//start with generic function merge two object, return new object

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}
//Object.assign이 두개의 object를 원하므로 명확히하기 위해 extends object로 명시.
//제약조건을 다는 것.
//function merge<T extends object, U extends object>(objA: T, objB: U): T & U

const mergeObj = merge({ name: "max" }, { age: 30 });
//이렇게 했을 경우 mergeObj.name에 접근할 수없다.
//타입스크립트가 모르기때문.
//타입스크립트는 오브젝트를 가져오는것만 알 수 있다.

interface Lengthy {
  length: number;
}

function countAndDescribe<S extends Lengthy>(element: S): [S, string] {
  let descriptionText = "Got no value";
  if (element.length === 1) {
    descriptionText = "Got 1 element.";
  } else if (element.length > 1) {
    descriptionText = "Got " + element.length + " elements";
  }
  return [element, descriptionText];
}

console.log(countAndDescribe("Hi there!"));
console.log(countAndDescribe(["sports", "cooking"]));
console.log(countAndDescribe(""));
//제네릭 타입은 어떤 타입이어도 괜찮다.

//얻는 데이터의 타입을 구체적이지 않게 지정함

// 제약조건의 특정타입 추가
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return obj[key];
  // 타입스크립트 에러 : Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'.
  // No index signature with a parameter of type 'string' was found on type '{}'
}

// extractAndConvert({}, "name");
//이렇게 하면 obj안에 key가 있는지 아닌지 보장할 수 없다
//보장하려면 제네릭타입을 사용
//T와 U 매개변수인데 두번째 매개변수는
//T의 key인 속성... keyof T 라고 명시

//제네릭 클래스

//string, number, boolean타입만 받는데
//해당 클래스에서 사용하는 타입은 받은 타입으로 사용한다.
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item)) return;
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();

///// *********************
// textStorage.addItem(10);
//위와 같이 하면 에러가 난다.

// const objStorage = new DataStorage<object>();
// objStorage.addItem({ name: "Max" });
// objStorage.addItem({ name: "Manu" });

// objStorage.removeItem({ name: "Max" });

// console.log(objStorage.getItems());

//그런데 이렇게 객체로 작업을 할 경우
//indexOf가 작동하지 않는다.
// removeItem(item: T) {
//   this.data.splice(this.data.indexOf(item), 1);
// }
//removeItem를 발동할때 indexOf를 찾지 못해
//-1 을 반환한다.
//key에 원시값을 저장해
//삭제할때도 key로 삭제하면 문제 X
//그러나 원시값으로 작업하도록 하는것이 좋음

///// *********************

//제네릭 유틸리티 타입

//partial type

interface CourseGoal {
  title: string;
  description: string;
  completeUtil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUtil = date;
  return courseGoal as CourseGoal;
}

//파셜타입은 모든 속성이 선택적인 객체 타입으로 바꿈.
//그래서 빈 객체에서 단계적으로 속성을 추가할 수 있음.
//그러나 courseGoal을 반환하지 못함.
//Type 'Partial<CourseGoal>' is not assignable to type 'CourseGoal'.
//return할 시점에 CourseGoal로 형변환을 할 수 있기 때문.

//Ready only type

const names: Readonly<string[]> = ["Jane", "coding"];

// names.push("woman");
//위와같이 names에 추가하려고 하면 에러가 난다.
//Readonly를 하면 타입스크립트에게 읽기만 가능하다고 알려주는 것이다.

//제네릭과 유니언타입 차이
//제네릭은 한 타입을 넣으면 해당 타입으로만 작업할 수 있다.
//그러나 유니언은 모든 타입을 넣을 수 있고
//모든 타입으로 작업할 수 있을 뿐이다.
