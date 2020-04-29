const pattern = /^\+380-\d\d-\d\d\d-\d\d-\d\d$/;

const isPhoneNumber = (number: string): boolean => pattern.test(number);

export default isPhoneNumber;
