type Combinable1 = string | number;

function add1(a: number, b: number): number;
function add1(a: string, b: string): string;
function add1(a: Combinable1, b: Combinable1) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = add1("Max", "sdfjhe");

//유니온 타입에서 string을 입력하면
//반드시 string 만 나오게 하고 싶은 경우...
//overload를 사용

//optional chaining
const fetchedUserData = {
  id: "u1",
  name: "Mane",
  job: { title: "CEO", description: "My own company" },
};

console.log(fetchedUserData.job.title);
//fetchedUserData.job이 없을 수 있음.
//그럴때 fetchedUserData.job && fetchedUserData.job.title 로 해서
//런타임 에러를 피할 수 있음

//옵셔널 체이닝은
//fetchedUserData?.job?.title 이런식으로 사용
