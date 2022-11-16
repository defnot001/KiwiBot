import { GuildMember } from 'discord.js';

export function isGuildMember(value: unknown): value is GuildMember {
  return value instanceof GuildMember;
}
