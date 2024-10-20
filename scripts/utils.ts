// Calculates percentage of a number
export function percentageOf(percentage: number, number: number) {
    return percentage / 100 * number
}

// Calculates what percentage a number is of another number
export function getPercentage(number1: number, number2: number) {
    if (number2 === 0) {
        throw new Error("number2 cannot be zero, as it would result in a division by zero.");
    }
    return (number1 / number2) * 100;
}

export function formatNumber(num: number | string) {
    if (typeof num === "string") {
        return num
    }
    if (num >= 1e6) {
        return (num / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';  // Million
    }
    if (num >= 1e3) {
        return (num / 1e3).toFixed(1).replace(/\.0$/, '') + 'k';  // Thousand
    }
    return num.toString();  // Less than 1000 stays the same
}