import { ActivityType } from 'discord.js';

export const event = {
  name: 'ready',
  once: true,
  execute(client) {
    client.user.setActivity('Minecraft Servers', {
      type: ActivityType.Watching,
    });
    console.log(`Ready! Logged in as ${client.user.tag}.`);
  },
};
