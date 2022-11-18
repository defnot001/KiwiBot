import type { ApplicationCommandDataResolvable } from 'discord.js';

interface RegisterCommandOptionsInterface {
  guildID: string;
  commands: ApplicationCommandDataResolvable[];
}

export default RegisterCommandOptionsInterface;
