import type { KiwiClient } from '@/structures/Client';
import type {
  ChatInputApplicationCommandData,
  CommandInteraction,
  CommandInteractionOptionResolver,
  PermissionResolvable,
} from 'discord.js';

interface RunOptions {
  client: KiwiClient;
  interaction: CommandInteraction;
  args: CommandInteractionOptionResolver;
}

type RunFunctions = (options: RunOptions) => any;

type TCommand = {
  userPermissions?: PermissionResolvable;
  run: RunFunctions;
} & ChatInputApplicationCommandData;

export default TCommand;
