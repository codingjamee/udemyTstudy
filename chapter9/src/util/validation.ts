export interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  //optional이기 때문에 ?를 추가
}

export function validate(validatableInput: Validatable) {
  let isValid = true;
  if (validatableInput.required) {
    //반드시 채워야하면
    isValid = isValid && validatableInput.value.toString().trim().length !== 0; //number일 수도 있으므로 toString
  }

  if (
    validatableInput.minLength != null &&
    typeof validatableInput.value === "string"
    //minLength가 0일때 에러 날 수 있으므로 !==null 조건 추가
  ) {
    //number일 경우는 minLength가 필요없으므로 넘김
    isValid =
      isValid && validatableInput.value.length >= validatableInput.minLength;
  }

  if (
    validatableInput.maxLength != null &&
    typeof validatableInput.value === "string"
    //maxLength가 0일때 에러 날 수 있으므로 !==null 조건 추가
  ) {
    //number일 경우는 maxLength가 필요없으므로 넘김
    isValid =
      isValid && validatableInput.value.length <= validatableInput.maxLength;
  }

  if (
    validatableInput.min != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }

  if (
    validatableInput.max != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }
  return isValid;
} //매개변수는 validatable 객체
