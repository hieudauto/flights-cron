import dotenv from "dotenv";
const config = dotenv.config({ path: "../.env" });
const env = { ...config.parsed, ...process.env };
export default env
