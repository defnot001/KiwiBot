import type { GuildMember, User } from 'discord.js';
import type { ModerationAction } from '../types/moderationAction';

export interface IModerationEmbedOptions {
  target: User;
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
