const crypto = require('crypto');

const generateAccountNumber = () => {
    const accountNumberLength = 10; // Set the desired length for the account number
    const maxNumber = Math.pow(10, accountNumberLength) - 1; // Calculate the maximum number for the desired length
    const randomNumber = crypto.randomInt(0, maxNumber + 1); // Generate a random integer
    return randomNumber.toString().padStart(accountNumberLength, '0'); // Convert to string and pad with leading zeros if necessary
};

module.exports = generateAccountNumber;
