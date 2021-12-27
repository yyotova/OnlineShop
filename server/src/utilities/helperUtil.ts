const capitalizeFirstLetter = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1);
const lowerCaseFirstLetter = (word: string) =>
  word.charAt(0).toLowerCase() + word.slice(1);

export { capitalizeFirstLetter, lowerCaseFirstLetter };
