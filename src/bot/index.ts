import botConfig from '../config/botConfig';
import type { ClientOptions } from 'discord.js';

import { Client, Collection, GatewayIntentBits, Partials } from 'discord.js';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
  ],
  partials: [Partials.GuildMember],
});
