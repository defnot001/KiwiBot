import type { KiwiClient } from '../../structures/KiwiClient';
import type {
  ChatInputApplicationCommandData,
  CommandInteractionOptionResolver,
  PermissionResolvable,
} from 'discord.js';
import type ExtendedInteraction from '../interfaces/ExtendedInteractionInterface';

interface RunOptions {
  client: KiwiClient;
  interaction: ExtendedInteraction;
  args: CommandInteractionOptionResolver;
}

type ExecuteFunctions = (options: RunOptions) => any;

type CommandType = {
  userPermissions?: PermissionResolvable;
  execute: ExecuteFunctions;
} & ChatInputApplicationCommandData;

export default CommandType;
