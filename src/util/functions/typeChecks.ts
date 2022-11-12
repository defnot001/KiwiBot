import { GuildMember } from 'discord.js';

export function isGuildMember(value: any): value is GuildMember {
  return value instanceof GuildMember;
}
