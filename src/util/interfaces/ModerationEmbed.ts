import type { GuildMember } from 'discord.js';
import type { ModerationAction } from '../types/moderationAction';

export interface IModerationEmbedOptions {
  target: GuildMember;
  executor: GuildMember;
  action: ModerationAction;
  reason?: string | null;
  expiration?: number | null;
}

export interface IModerationDescription {
  member: string;
  action: string;
  reason?: string;
  expiration?: string;
}
