function convertToCamelCase(sentence: string): string {
  const words = sentence.trim().split(/\s+/);
  // const words = sentence.split(" ");

  let result = "";

  for (let i = 0; i < words.length; i++) {
    const word = words[i]!.toLowerCase();

    // if (word === undefined) continue;

    if (i === 0) {
      result += word;
    } else {
      // result += word[0]!.toUpperCase() + word.slice(1);
      // result += word.charAt(0).toUpperCase() + word.slice(1);
      result += word.slice(0, 1).toUpperCase() + word.slice(1);
    }
  }

  return result;
}

console.log(convertToCamelCase("Hello world"));
console.log(convertToCamelCase(" jAvAsCrIpT   Is        AwEsOmE"));
