import dotenv from 'dotenv';

dotenv.config();

const botEnv = {
  token: process.env.BOT_TOKEN,
  clientId: process.env.CLIENT_ID,
  guildId: process.env.GUILD_ID,
};

const errors = [];

for (const prop in botEnv) {
  if (!botEnv[prop]) {
    errors.push(`Missing ${prop} in .env`);
  }
}

const undefinedEnv = errors.join('\n');

if (errors.length > 0) {
  throw new Error(undefinedEnv);
}

export default botEnv;
