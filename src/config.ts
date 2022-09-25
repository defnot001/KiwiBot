import dotenv from 'dotenv';
dotenv.config();
const { BOT_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

if (!BOT_TOKEN || !CLIENT_ID || !GUILD_ID) {
  throw new Error('Missing environment variables');
}

const config: Record<string, string> = {
  BOT_TOKEN,
  CLIENT_ID,
  GUILD_ID,
};

export default config;
