export function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  //original method에 접근할 수 있음.
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      //this는 getter 메서드를 트리거하는 것은 모든지 참조
      //getter메서드는 그것에 속해있는 확실한 객체로 트리거 된다.
      //getter 메서드 대신 this가
      //우리가 함께 정의한 객체를 항상 참조할 것
      //this는 eventlistner로 재정의되지 않음
      //getter는 실행되고 있는 함수와
      //그것이 속한 객체, 그리고 이벤트 리스너 사이에서의
      //추가적인 계층같은 것이기 때문
      return boundFn;
    },
  };
  return adjDescriptor;
}
