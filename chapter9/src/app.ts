//슬래시 세개 namespace와 reference 태그
//outFile 주석해제

// / <reference path="./util/validation.ts" />

import { ProjectInput } from "./components/project-input.js";
import { ProjectList } from "./components/project-list.js";

//enum타입 두가지만 선택하려고 하므로 적합

//validation

new ProjectInput();
new ProjectList("active");
new ProjectList("finished");
