// //intersection type

type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date; //Date is type
};

//intersection type
//related to interface inheritance
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "Man",
  privileges: ["server"],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

//blow is exact same effect:
//but above intersection type is preferred.

// interface Admin {
//   name: string;
//   privileges: string[];
// }

// interface Employee {
//   name: string;
//   startDate: Date; //Date is type
// }

// interface ElevatedEmployee extends Admin, Employee {}

// const e1: ElevatedEmployee = {
//   name: "Nam",
//   privileges: ["coding"],
//   startDate: new Date(),
// };

//type Guard

function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("Name: " + emp.name);

  // if (typeof emp === 'object') {
  if ("privileges" in emp) {
    // if there are privileges property on employee
    // if (typeof emp === 'Employee') {//this doesn't works
    console.log("Privileges: " + emp.privileges);
  }
}

printEmployeeInformation(e1);

//working classes with type guard

class Car {
  drive() {
    console.log("Driving...");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck...");
  }

  loadCargo(amount: number) {
    console.log("Loading cargo..." + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();

const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  // if ("loadCargo" in vehicle) {//eliminates mistyping
  if (vehicle instanceof Truck) {
    //instanceof is  normal operator built into vanilla js
    vehicle.loadCargo(1000); //this occured problem because only truck has this.
  }
}

useVehicle(v1);
useVehicle(v2);

//type guard can be easier when working with union types
interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

// function moveAnimal(animal: Animal) {
//   if ("flyingSpeed" in animal) {
//     console.log("Moving with speed: " + animal.flyingSpeed);
//   } //but more and more things will have to be checked.
//   // console.log('Moving with speed: ' + animal.flyingSpeed)
//   // above log can't be. because flying speed isn't always be.
// }

//구별된 유니언

//we can be do this:
//1. add type property to every interfaces,
//2. add switch statement

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
      break;
  }
  console.log("Moving at speed : " + speed);
}

moveAnimal({ type: "bird", flyingSpeed: 10 });
// moveAnimal({ type: 'bird', runnigSpeed: 10 });  // this will be error because type bird, there isn't runningSpeed property.

//type casting
// type casting is a method or process that converts a data type into another data type
//in both ways manually and automatically.
//when we use getElementById, typescript doesn't know that is the input element.
//so typescript doesn't know that there can be value property.

const userInputElement = <HTMLInputElement>(
  document.getElementById("user-input")!
);
//exclamaion mark tells to typescript that it will never yield null
//if we were not clear that there will never be yield null,
// //we can check if statement like below
if (userInputElement) {
  (userInputElement as HTMLInputElement).value = "Hi there!";
}

//or we can do this.
const userInputElement1 = document.getElementById(
  "user-input"
)! as HTMLInputElement;

userInputElement.value = "Hi there!";
// userInputElement.value = "Hi there!" //there is an error. typescript doesn't know that there can be value property.
//infront of that we can add something like this : <HTMLInputElement>

interface ErrorContainer {
  [prop: string]: string; //index type
}

const errorBag: ErrorContainer = {
  email: "Not a valid email",
  user: "Must start with a capital character",
};
