import express, { Request, Response, NextFunction } from "express";
//현재는 실험적인 구문
import { json } from "body-parser";

import todoRoutes from "./routes/todos";

const app = express();

app.use(json());
//제3자 패키지에서 들어오는 요청들은 전부 파싱하는 미들웨어.
//요청에서 찾는 JSON 데이터를 추출 하고 요청 오브젝트의 바디를 그 JSON 데이터로 채움 .

app.use("/todos", todoRoutes);

//에러처리 미들웨어
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});
app.listen(3000);
