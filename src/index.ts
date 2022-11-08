import { Client, GatewayIntentBits, Partials } from 'discord.js';
import botConfig from '@config/botConfig';
import ready from '@events/ready';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
  ],
  partials: [Partials.GuildMember],
});

ready(client);

client.login(botConfig.token);
