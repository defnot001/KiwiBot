import type { CommandInteraction, GuildMember } from 'discord.js';

interface IExtendedInteraction extends CommandInteraction {
  member: GuildMember;
}

export default IExtendedInteraction;
