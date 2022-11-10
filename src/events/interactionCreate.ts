import type {
  TextBasedChannel,
  CommandInteractionOptionResolver,
} from 'discord.js';
import { client } from '..';
import { Event } from '../structures/Event';
import type ExtendedInteractionInterface from '../util/interfaces/ExtendedInteractionInterface';

export default new Event('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command)
    return interaction.reply({
      content: `This interaction does not exist!`,
      ephemeral: true,
    });

  try {
    command.execute({
      args: interaction.options as CommandInteractionOptionResolver,
      client,
      interaction: interaction as ExtendedInteractionInterface,
    });
  } catch (err) {
    console.error(err);

    interaction.reply({
      content: 'There was an error trying to execute this command',
      ephemeral: true,
    });
  }

  const getChannelName = (channel: TextBasedChannel | null): string | void => {
    if (channel && 'name' in channel) {
      return channel.name;
    }
  };

  const channelNameAddon: string =
    `in #${getChannelName(interaction.channel)}` || '';

  console.log(
    `${interaction.user.tag} ${channelNameAddon} triggered an interaction.`,
  );
});
