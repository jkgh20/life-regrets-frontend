export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};
export const LAMBDA_URL = "https://m8o1q7cin4.execute-api.us-east-2.amazonaws.com/prod";
export const FALLBACK_MESSAGES = [
  "I regret playing the trombone for 8 years instead of learning piano or guitar.",
  "I should have stuck with those piano lessons. Mom you were right!!",
  "I regret not hugging my mom more.",
  "I regret the coffee I just spilled on myself 🤦‍♂️"
]
