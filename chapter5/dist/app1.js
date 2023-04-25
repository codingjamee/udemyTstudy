"use strict";
class Department {
    constructor(id, n) {
        this.id = id;
        this.employees = [];
        this.name = n;
    }
    static createEmployee(name) {
        return { name: name };
    }
    addEmployee(employees) {
        this.employees.push(employees);
    }
    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
Department.fiscalYear = 2020;
class AccountingDepartment extends Department {
    constructor(id, reports) {
        super(id, "Accounting");
        this.reports = reports;
        this.lastReport = reports[0];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new AccountingDepartment("d2", []);
        return this.instance;
    }
    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error("No Report Found.");
    }
    set mostRecentReport(value) {
        if (!value) {
            throw new Error("Please pass in a valid value!");
        }
        this.addReport(value);
    }
    describe() {
        console.log("Accounting Department - ID: " + this.id);
    }
    addEmployee(name) {
        if (name === "Max") {
            return;
        }
        this.employees.push(name);
    }
    addReport(text) {
        this.reports.push(text);
        this.lastReport = text;
    }
}
const accounting = AccountingDepartment.getInstance();
const accounting2 = AccountingDepartment.getInstance();
console.log(accounting, accounting2);
accounting.describe();
accounting.name = "NEW NAME";
accounting.printEmployeeInformation();
accounting.addEmployee("Max");
accounting.addEmployee("Manu");
accounting.printEmployeeInformation();
console.log(accounting);
const accountingCopy = { describe: accounting.describe };
class ITDepartment extends Department {
    constructor(id, admins) {
        super(id, "IT");
        this.admins = admins;
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
accounting.mostRecentReport = "Year End Report ";
console.log(accounting.mostRecentReport);
const employee1 = Department.createEmployee("Marx");
console.log(employee1);
//# sourceMappingURL=app1.js.map