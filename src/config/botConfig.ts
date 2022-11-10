import dotenv from 'dotenv';
import type ENVInterface from '../util/interfaces/ENVinterface';
import type BotConfigInterface from '../util/interfaces/BotConfigInterface';

dotenv.config();

const env: ENVInterface = {
  token: process.env.BOT_TOKEN,
  clientID: process.env.CLIENT_ID,
  guildID: process.env.GUILD_ID,
};

const checkConfig = (config: ENVInterface) => {
  for (const [key, value] of Object.values(env)) {
    if (!value) {
      throw new Error(`Missing key ${key} in .env`);
    }
  }
  return config as BotConfigInterface;
};

const botConfig = checkConfig(env);

export default botConfig;
