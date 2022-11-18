import EmbedColor from '../../config/embedColors';
import guildConfig from '../../config/guildConfig';
import { EmbedBuilder } from 'discord.js';
import { isTextChannel } from './typeChecks';
import type { Guild } from 'discord.js';
import type { IErrorOptions } from '../interfaces/Errors';

export function errorLog(options: IErrorOptions): void {
  const { client, guild, type, errorMessage } = options;
  const { botLog } = getLogChannels(guild);

  if (!client.user) {
    throw new Error('This client does not have a user!');
  }

  const errorEmbed = new EmbedBuilder({
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

  botLog.send({ embeds: [errorEmbed] });
}

export function getLogChannels(guild: Guild) {
  const memberLog = guild.channels.cache.get(guildConfig.channels.memberLog);
  const modLog = guild.channels.cache.get(guildConfig.channels.modLog);
  const botLog = guild.channels.cache.get(guildConfig.channels.botLog);

  if (
    !memberLog ||
    !modLog ||
    !botLog ||
    !isTextChannel(memberLog) ||
    !isTextChannel(modLog) ||
    !isTextChannel(botLog)
  ) {
    errorLog({
      client: guild.client,
      guild: guild,
      type: 'error',
      errorMessage: `Failed to get the log-channels.`,
    });
    throw new Error('Cannot get the Log-Channels!');
  }

  return {
    memberLog,
    modLog,
    botLog,
  };
}
