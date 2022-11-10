import type { CommandInteraction, GuildMember } from 'discord.js';

interface ExtendedInteractionInterface extends CommandInteraction {
  member: GuildMember;
}

export default ExtendedInteractionInterface;
