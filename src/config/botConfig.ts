import path from 'path';
import dotenv from 'dotenv';
import { ENV } from '../util/interfaces/ENV';
import { Config } from '../util/interfaces/Config';

dotenv.config({ path: path.resolve(__dirname, './bot.env') });

const getConfig = (): ENV => {
  return {
    BOT_TOKEN: process.env.BOT_TOKEN,
    CLIENT_ID: process.env.CLIENT_ID,
    GUILD_ID: process.env.GUILD_ID,
  };
};

const getCleanConfig = (botConfig: ENV) => {
  for (const [key, value] of Object.entries(botConfig)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in bot.env`);
    }
  }
  return botConfig as Config;
};

const botConfig = getConfig();
const cleanConfig = getCleanConfig(botConfig);

export default cleanConfig;
