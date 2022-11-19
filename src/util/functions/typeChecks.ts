import { GuildBasedChannel, GuildMember, TextChannel } from 'discord.js';
import type { PartialGuildMember } from 'discord.js';

export function isGuildMember(value: unknown): value is GuildMember {
  return value instanceof GuildMember;
}

export function isTextChannel(
  channel: GuildBasedChannel,
): channel is TextChannel {
  return channel instanceof TextChannel;
}
