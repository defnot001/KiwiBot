import { EmbedBuilder } from 'discord.js';
import EmbedColor from '../../config/embedColors';
import getLogChannels from './logChannels';
import type ErrorOptionsInterface from '../interfaces/ErrorOptionsInterface';

export default function generateWarningError(options: ErrorOptionsInterface) {
  const { client, guild, type, errorMessage } = options;
  const { botLog } = getLogChannels(guild);

  if (!client.user) {
    throw new Error('This cliebt does not have a user!');
  }

  const errorWarnEmbed = new EmbedBuilder({
    author: {
      name: client.user.username,
      iconURL: client.user.displayAvatarURL(),
    },
    description: `${errorMessage}`,
    color: type === 'warn' ? EmbedColor.yellow : EmbedColor.red,
    footer: {
      text: 'KiwiBot Error Logging',
    },
    timestamp: Date.now(),
  });

  botLog.send({ embeds: [errorWarnEmbed] });
}
