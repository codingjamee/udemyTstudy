"use strict";
let add;
class Person {
    constructor(n) {
        if (n) {
            this.name = n;
        }
    }
    greet(phrase) {
        if (this.name) {
            console.log(phrase + " " + this.name);
        }
        else {
            console.log("Hi!");
        }
    }
}
let user1;
user1 = new Person();
user1.greet("Hi there - I am");
console.log(user1);
//# sourceMappingURL=app.js.map