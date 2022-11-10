import {
  ApplicationCommandDataResolvable,
  Client,
  Collection,
  GatewayIntentBits,
  Partials,
} from 'discord.js';
import glob from 'glob';
import { promisify } from 'util';
import botConfig from '@config/botConfig';
import projectPaths from '@util/node/srcPath';
import type TCommand from '@/util/types/Command';

const globPromise = promisify(glob);
export class KiwiClient extends Client {
  commands: Collection<string, TCommand> = new Collection();

  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildBans,
      ],
      partials: [Partials.GuildMember],
    });
  }

  start() {
    this.registerModules();
    this.login(botConfig.token);
  }

  async importFile(filePath: string) {
    return (await import(filePath))?.default;
  }

  async registerModules() {
    const slashCommands: ApplicationCommandDataResolvable[] = [];
    const commandPaths: string[] = await globPromise(
      `${projectPaths.commands}/*/*{.ts,.js}`,
    );

    for await (const path of commandPaths) {
      const command: TCommand = await this.importFile(path);
      if (!command.name) return;

      this.commands.set(command.name, command);
      slashCommands.push(command);
    }
  }
}
