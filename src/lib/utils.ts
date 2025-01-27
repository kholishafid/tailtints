export function addPadAndSeparator(str: string) {
  str = str.padStart(4, "0");
  let result = "";
  let count = 0;

  // Loop through the string from the end
  for (let i = str.length - 1; i >= 0; i--) {
    result = str[i] + result; // Add the current character to the result
    count++;

    // Add a comma after every 3 characters (except at the end)
    if (count % 3 === 0 && i !== 0) {
      result = " " + result;
    }
  }

  // addPad
  return result.trim();
}
