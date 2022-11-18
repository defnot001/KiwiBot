import type { Guild } from 'discord.js';
import guildConfig from '../../config/guildConfig';
import { isTextChannel } from './typeChecks';

export default function getLogChannels(guild: Guild) {
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
    throw new Error('Cannot get the Log-Channels!');
  }

  return {
    memberLog,
    modLog,
    botLog,
  };
}
