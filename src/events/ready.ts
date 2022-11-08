import { ActivityType } from 'discord.js';
import type { Client } from 'discord.js';

export default (client: Client): void => {
  client.once('ready', async () => {
    if (!client.user || !client.application) return;

    client.user.setActivity('Commands', {
      type: ActivityType.Listening,
    });
    console.log(`Ready! Logged in as ${client.user.tag}.`);
  });
};
