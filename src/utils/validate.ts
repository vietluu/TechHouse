export const emailValiate = (value: string) => {
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  return re.test(value);
};
export const phoneValidate = (value: string) => {
  const re = /[0-9]{4}[0-9]{3}[0-9]{3}/i;
  return re.test(value);
};
