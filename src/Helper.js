export const LAMBDA_URL = "https://m8o1q7cin4.execute-api.us-east-2.amazonaws.com/prod";
export const DEFAULT_MESSAGES = [
  "Not getting divorced sooner. Spent too much time being miserable.",
  "Not spending enough time with my son when he was younger.",
  "Spending too much time on side projects at the expense of spending time with my kids.",
  "Not pursuing mathematics when I was doing my cs degree in college.",
  "Holding back in life",
  "Not marrying my high school sweetheart.",
  "Having children. Decided it wasn't for me.",
  "Spending way too much time at work instead of investing it in myself.",
  "Not buying a thousand bitcoins when they were worth $3!",
  "Being born.",
];

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
