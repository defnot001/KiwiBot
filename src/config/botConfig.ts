import dotenv from 'dotenv';
import type { IBotConfig, IENV } from '../util/interfaces/Config';

dotenv.config();

const env: IENV = {
  token: process.env.BOT_TOKEN,
  clientID: process.env.CLIENT_ID,
  guildID: process.env.GUILD_ID,
};

const checkConfig = (config: IENV) => {
  for (const [key, value] of Object.values(env)) {
    if (!value) {
      throw new Error(`Missing key ${key} in .env`);
    }
  }
  return config as IBotConfig;
};

const botConfig = checkConfig(env);

export default botConfig;
