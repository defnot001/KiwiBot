import { Command } from '../../structures/Command';

export default new Command({
  name: 'ping',
  description: 'replies with pong',
  execute: async ({ interaction }) => {
    interaction.reply('pong');
  },
});
