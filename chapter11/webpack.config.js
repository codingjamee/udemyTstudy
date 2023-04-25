const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/app.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "dist",
  },

  //파일을 어떻게 처리할 지, 파일내 import들을 어떻게 처리할지 전달
  //ts-loader가 웹팩에게 타입스크립트 처리 방식을 전달하는 것을 지원

  //module
  //test는 이 규칙이 해당 파일에 적용되는지 여부를 알아내기 위해 파일을 시험함
  //use는 웹팩이 무엇을 사용할지
  //여기서는 ts-loader
  //자동으로 tsconfig.json파일을 고려

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    // ...
    devMiddleware: { publicPath: "/dist/" },
    static: { directory: path.resolve(__dirname) },
  },

  //sourceMap
  // sourceMap이 true로 되어있는지 확인
  // 코드의 디버그를 지원, 웹팩도 이를 지원함.
  //source-map은 이미 존재한다는 것을 웹팩에게 전달

  devtool: "inline-source-map",
  //resolve
  //찾아낸 임포트에 추가할 파일 확장자를 웹팩에 전달.
  //지금은 스스로 전달하게 함.
  //이 확장자의 파일들을 찾고 해당 확장자의 모든 파일들을
  //bundle할 것
  resolve: {
    extensions: [".ts", ".js"],
  },
};
