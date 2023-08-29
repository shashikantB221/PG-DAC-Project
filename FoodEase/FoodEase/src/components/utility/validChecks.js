export function validObjectCheck(obj) {
  return obj !== undefined && obj !== null && obj !== "" ? true : false;
}
export function validateNumber(event) {
  if (!/[0-9]/.test(event.key)) {
    event.preventDefault();
  }
}

export function validateString(name) {
  return name.match(/[A-Za-z]$/);
}
export function validateEmail(email) {
  return email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
}
