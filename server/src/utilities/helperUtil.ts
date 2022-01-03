const capitalizeFirstLetter = (word: string): string =>
  word.charAt(0).toUpperCase() + word.slice(1);

const lowerCaseFirstLetter = (word: string): string =>
  word.charAt(0).toLowerCase() + word.slice(1);

export { capitalizeFirstLetter, lowerCaseFirstLetter };
