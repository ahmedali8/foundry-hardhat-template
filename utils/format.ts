import { BigNumber } from "@ethersproject/bignumber";
import { BigNumberish, formatUnits } from "ethers";
import { fromBn, toBn } from "evm-bn";

/**
 * Converts a number to a string representation in the International Currency System (e.g., Billions, Millions, Thousands).
 *
 * @param labelValue - The number to be converted.
 * @returns The string value in the International Currency System, or undefined if the input is falsy.
 */
export function convertToInternationalCurrencySystem(labelValue: number): string | undefined {
  if (!labelValue) {
    return undefined;
  }

  const absValue = Math.abs(labelValue);

  if (absValue >= 1e9) {
    // Billion
    return (absValue / 1e9).toFixed(2).replace(/\.?0+$/, "") + " B";
  } else if (absValue >= 1e6) {
    // Million
    return (absValue / 1e6).toFixed(2).replace(/\.?0+$/, "") + " M";
  } else if (absValue >= 1e3) {
    // Thousand
    return (absValue / 1e3).toFixed(2).replace(/\.?0+$/, "") + " K";
  } else {
    return absValue.toString();
  }
}

/**
 * Returns the string representation of a number, removing unnecessary trailing zeros.
 *
 * @param value - The number to be converted.
 * @returns The string value with trailing zeros removed.
 */
export function removeTrailingZeros(value: number): string {
  return value.toString().replace(/\.?0+$/, "");
}

/**
 * Returns the string representation of a number with a specified precision.
 *
 * @param value - The number to be converted.
 * @param precision - The number of decimal places to include in the string representation.
 * @returns The string value with the specified precision.
 */
export function numWithPrecision(value: number, precision: number = 4): string {
  return value.toFixed(precision);
}

/**
 * Converts a gas price value to gwei.
 *
 * formatUnits(value: BigNumberish, unit?: string | Numeric | undefined): string
 * BigNumberish -> string | Numeric
 * Numeric -> number | bigint
 *
 * @param gasPrice - The gas price value to be converted.
 * @returns The string value of the gas price in gwei.
 */
export function toGwei(gasPrice: BigNumberish): string {
  return formatUnits(gasPrice, "gwei");
}

/**
 * Converts a value to wei.
 *
 * parseUnits(value: string, unit?: string | Numeric): bigint
 * BigNumberish -> string | Numeric
 * Numeric -> number | bigint
 *
 * @param value - The value to be converted.
 * @param decimals - The number of decimal places in the value.
 * @returns The bigint value in wei.
 */
export function toWei(value: string, decimals: number = 18): bigint {
  return toBn(value, decimals).toBigInt();
}

/**
 * Converts a value from wei to a string representation.
 *
 * formatUnits(value: BigNumberish, unit?: string | Numeric | undefined): string
 * BigNumberish -> string | Numeric
 * Numeric -> number | bigint
 *
 * @param value - The value to be converted from wei.
 * @param decimals - The number of decimal places in the value.
 * @returns The string representation of the value.
 */
export function fromWei(value: BigNumberish, decimals: number = 18): string {
  return fromBn(BigNumber.from(value), decimals);
}

/**
 * Converts a value from wei to a floating-point number.
 *
 * BigNumberish -> string | Numeric
 * Numeric -> number | bigint
 *
 * @param value - The value to be converted from wei.
 * @param decimals - The number of decimal places in the value.
 * @returns The floating-point number representation of the value.
 */
export function fromWeiToNum(value: BigNumberish, decimals: number = 18): number {
  const fromWeiString = fromWei(value, decimals);
  return parseFloat(fromWeiString);
}

/**
 * Converts a value from wei to a fixed-point number with a specified precision.
 *
 * BigNumberish -> string | Numeric
 * Numeric -> number | bigint
 *
 * @param value - The value to be converted from wei.
 * @param decimals - The number of decimal places in the value.
 * @param precision - The number of decimal places to include in the fixed-point number.
 * @returns The fixed-point number representation of the value.
 */
export function fromWeiTodNumWithPrecision(
  value: BigNumberish,
  decimals: number = 18,
  precision: number = 4
): number {
  const fromWeiNum = fromWeiToNum(value, decimals);
  const fromWeiNumToFixed = numWithPrecision(fromWeiNum, precision);

  return parseFloat(fromWeiNumToFixed);
}

/**
 * Calculates the percentage of a BigNumber value.
 *
 * @param bn - The BigNumber value.
 * @param percent - The percentage value.
 * @returns The calculated percentage as a BigNumber.
 */
export function calculatePercentageInBn(bn: BigNumber, percent: number): BigNumber {
  return bn.mul(percent).div(100);
}

/**
 * Calculates the percentage of a bigint value.
 *
 * @param bn - The bigint value.
 * @param percent - The percentage value.
 * @returns The calculated percentage as a bigint.
 */
export function calculatePercentageInBi(bn: bigint, percent: number): bigint {
  return (bn * BigInt(percent)) / 100n;
}

/**
 * Generates a random integer between a minimum and maximum value (inclusive).
 *
 * @param min - The minimum value.
 * @param max - The maximum value.
 * @returns The random integer.
 */
export const randomInteger = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Generates a random number between a minimum and maximum value.
 *
 * @param min - The minimum value.
 * @param max - The maximum value.
 * @returns The random number.
 */
export const randomNumber = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};
