
export function generatePassword(
  length: number,
  includeUppercase: boolean,
  includeLowercase: boolean,
  includeNumbers: boolean,
  includeSymbols: boolean
): string {
  // Character sets
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_-+=<>?/[]{}|';

  // Build character pool based on options
  let charPool = '';
  if (includeUppercase) charPool += uppercaseChars;
  if (includeLowercase) charPool += lowercaseChars;
  if (includeNumbers) charPool += numberChars;
  if (includeSymbols) charPool += symbolChars;

  // If no character types are selected, use lowercase as default
  if (charPool.length === 0) {
    charPool = lowercaseChars;
  }

  // Generate password
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charPool.length);
    password += charPool[randomIndex];
  }

  // Ensure at least one character from each selected type is included
  let finalPassword = password;
  if (includeUppercase && !containsUppercase(finalPassword)) {
    finalPassword = replaceRandomChar(finalPassword, getRandomChar(uppercaseChars));
  }
  if (includeLowercase && !containsLowercase(finalPassword)) {
    finalPassword = replaceRandomChar(finalPassword, getRandomChar(lowercaseChars));
  }
  if (includeNumbers && !containsNumber(finalPassword)) {
    finalPassword = replaceRandomChar(finalPassword, getRandomChar(numberChars));
  }
  if (includeSymbols && !containsSymbol(finalPassword)) {
    finalPassword = replaceRandomChar(finalPassword, getRandomChar(symbolChars));
  }

  return finalPassword;
}

// Helper functions to check if password contains a specific character type
function containsUppercase(str: string): boolean {
  return /[A-Z]/.test(str);
}

function containsLowercase(str: string): boolean {
  return /[a-z]/.test(str);
}

function containsNumber(str: string): boolean {
  return /[0-9]/.test(str);
}

function containsSymbol(str: string): boolean {
  return /[!@#$%^&*()_\-+=<>?/[\]{}\|]/.test(str);
}

// Helper function to get a random character from a string
function getRandomChar(str: string): string {
  const randomIndex = Math.floor(Math.random() * str.length);
  return str[randomIndex];
}

// Helper function to replace a random character in the password
function replaceRandomChar(str: string, replacement: string): string {
  const randomIndex = Math.floor(Math.random() * str.length);
  return str.substring(0, randomIndex) + replacement + str.substring(randomIndex + 1);
}
