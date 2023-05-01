"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//현재는 실험적인 구문
const body_parser_1 = require("body-parser");
const todos_1 = __importDefault(require("./routes/todos"));
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
//제3자 패키지에서 들어오는 요청들은 전부 파싱하는 미들웨어.
//요청에서 찾는 JSON 데이터를 추출 하고 요청 오브젝트의 바디를 그 JSON 데이터로 채움 .
app.use("/todos", todos_1.default);
//에러처리 미들웨어
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
app.listen(3000);
