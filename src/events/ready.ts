import { ActivityType } from 'discord.js';
import { Event } from '../structures/Event';

export default new Event('ready', (client) => {
  client.user.setActivity('Commands', { type: ActivityType.Listening });
  console.log(`Bot is ready! Logged in as ${client.user.tag}`);
});
