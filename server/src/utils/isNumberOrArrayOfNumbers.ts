function isNumberOrArrayOfNumbers(value: any): boolean {
  if (typeof value === "number") {
    return true;
  }
  if (Array.isArray(value)) {
    return value.every((item) => typeof item === "number");
  }
  return false;
}

export default isNumberOrArrayOfNumbers;
