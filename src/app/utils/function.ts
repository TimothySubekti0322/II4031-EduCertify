import primeNumbers from "./primeNumbers";

const checkNumberPositivePrime = (number: string | number): string => {
  const bigNumber = BigInt(number);
  
  if (bigNumber < BigInt(0)) {
    return "Number must be positive";
  }
  
  if (bigNumber <= BigInt(10000)) {
    return "Number must be greater than 10000";
  } else if (bigNumber >= BigInt(100000000)) {
    return "Number must be smaller than 100000000";
  }

  let i = 0;

  // Check from 2 to sqrt of num
  while (BigInt(primeNumbers[i]) * BigInt(primeNumbers[i]) <= bigNumber) {
    if (bigNumber % BigInt(primeNumbers[i]) === BigInt(0)) {
      return "Number must be prime";
    }
    i++;
  }

  return "Number is prime";
};

export { checkNumberPositivePrime };
