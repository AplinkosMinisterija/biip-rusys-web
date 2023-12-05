export const removeWhiteSpacesFromNumber = (text: string | number) =>
  parseInt(text?.toString()?.replace(/\s/g, ''));

export const removeWhiteSpacesFromDecimal = (text: string | number) =>
  parseFloat(text?.toString()?.replace(/\s/g, ''));
