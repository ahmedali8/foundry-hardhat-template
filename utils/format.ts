import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { formatUnits, parseUnits } from "@ethersproject/units";

/**
 * Return the `labelValue` converted to string as Billions, Millions, Thousands etc.
 *
 * @param labelValue number.
 * @return string value or undefined.
 */
export function convertToInternationalCurrencySystem(labelValue: number): string | undefined {
  if (!labelValue) {
    return undefined;
  }
  // Nine Zeroes for Billions
  if (Math.abs(Number(labelValue)) >= 1000000000) {
    return (Math.abs(Number(labelValue)) / 1000000000).toFixed(2).replace(/\.?0+$/, "") + " B";
  }
  // Six Zeroes for Millions
  else if (Math.abs(Number(labelValue)) >= 1000000) {
    return (Math.abs(Number(labelValue)) / 1000000).toFixed(2).replace(/\.?0+$/, "") + " M";
  }
  // Three Zeroes for Thousands
  else if (Math.abs(Number(labelValue)) >= 1000) {
    return (Math.abs(Number(labelValue)) / 1000).toFixed(2).replace(/\.?0+$/, "") + " K";
  } else {
    return Math.abs(Number(labelValue)).toString();
  }
}

/**
 * Return the `value` converted to string and removing the end unnecessary zeros.
 *
 * @param value number.
 * @return string value or undefined.
 */
export function omitEndZeros(value: number): string | undefined {
  if (!value) return undefined;
  return value.toString().replace(/\.?0+$/, "");
}

/**
 * Return the `value` converted to BigNumber.
 *
 * @param value string value preferred.
 * @return BigNumber value
 */
export function toBN(value: string | number | bigint): BigNumber {
  return BigNumber.from(value);
}

/**
 * Return the `value` converted to string.
 *
 * @param value number.
 * @param precision fractionDecimals.
 * @return string value or undefined.
 */
export function numToFix(value: number, precision: number = 4): string | undefined {
  if (!value) return undefined;

  return value.toFixed(precision);
}

/**
 * Return the `gasPrice` converted to gwei.
 * formatUnits(value: BigNumberish, unitName?: BigNumberish | undefined): string
 * BigNumberish -> string, BigNumber, number, BytesLike or BigInt.`https://docs.ethers.io/v5/api/utils/bignumber/#BigNumberish`
 *
 * @param gasPrice BigNumberish value to be converted, preferred is BigNumber.
 * @return string value
 */
export function toGwei(gasPrice: BigNumberish): string {
  return formatUnits(gasPrice, "gwei");
}

/**
 * Return the `value` converted to BigNumber wei.
 * parseUnits(value: string, unitName?: BigNumberish | undefined): BigNumber
 * BigNumberish -> string, BytesLike, BigNumber, number or BigInt.`https://docs.ethers.io/v5/api/utils/bignumber/#BigNumberish`
 *
 * @param value the string value to be converted.
 * @param decimals decimal value or BigNumberish.
 * @return BigNumber value or undefined.
 */
export function toWei(value: string, decimals: number = 18): BigNumber {
  return parseUnits(value, decimals);
}

/**
 * Return the `value` converted to string from wei.
 * formatUnits(value: BigNumberish, unitName?: BigNumberish | undefined): string
 * BigNumberish -> string, BigNumber, number, BytesLike or BigInt.`https://docs.ethers.io/v5/api/utils/bignumber/#BigNumberish`
 *
 * @param value BigNumberish value to be converted, preferred is BigNumber.
 * @param decimals decimal value or BigNumberish.
 * @return string value.
 */
export function fromWei(value: BigNumberish, decimals: number = 18): string {
  return formatUnits(value, decimals);
}

/**
 * Return the `value` converted to number from wei.
 * BigNumberish -> string, BigNumber, number, BytesLike or BigInt.`https://docs.ethers.io/v5/api/utils/bignumber/#BigNumberish`
 *
 * @param value BigNumberish value to be converted, preferred is BigNumber.
 * @param decimals decimal value or BigNumberish.
 * @return number value or undefined.
 */
export function fromWeiToNum(value: BigNumberish, decimals: number = 18): number | undefined {
  if (!value) return undefined;

  const fromWeiString = fromWei(value, decimals) ?? "";
  return parseFloat(fromWeiString);
}

/**
 * Return the `value` converted to fixed point number.
 * BigNumberish -> string, BigNumber, number, BytesLike or BigInt.`https://docs.ethers.io/v5/api/utils/bignumber/#BigNumberish`
 *
 * @param value BigNumberish value to be converted, preferred is BigNumber.
 * @param decimals decimal value or BigNumberish.
 * @param precision fractionDecimals.
 * @return number value or undefined.
 */
export function fromWeiToFixedNum(
  value: BigNumberish,
  decimals: number = 18,
  precision: number = 4
): number | undefined {
  if (!value) return undefined;

  const fromWeiNum = fromWeiToNum(value, decimals) ?? 0;
  const fromWeiNumToFixed = numToFix(fromWeiNum, precision) ?? "";

  return parseFloat(fromWeiNumToFixed);
}

/**
 * Calculates percentage according to `bn` and `percent`.
 * @param {*} bn bignumber
 * @param {*} percent percentage value
 * @returns BigNumber
 */
export function calculatePercentage(bn: BigNumber, percent: number): BigNumber {
  return bn.mul(percent).div("100");
}

export const randomInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomNumber = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};
