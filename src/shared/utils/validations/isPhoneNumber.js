const pattern = /^\+380-\d\d-\d\d\d-\d\d-\d\d$/;

const isPhoneNumber = number => pattern.test(number);

export default isPhoneNumber;
