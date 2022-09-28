import {
  ApplicationCommandDataResolvable,
  Client,
  Collection,
  GatewayIntentBits,
  Partials,
} from 'discord.js';
import botConfig from '../../config/botConfig';
import { CommandType } from '../types/Command';
import glob from 'glob';
import { promisify } from 'util';
import { RegisterCommandsOptions } from '../interfaces/RegisterCommandOptions';

const globPromise = promisify(glob);

export class ExtendedClient extends Client {
  commands: Collection<string, CommandType> = new Collection();

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
    this.login(botConfig.BOT_TOKEN);
  }

  async importFile(filePath: string) {
    return (await import(filePath))?.default;
  }

  // async registerCommands({ commands, guildId }: RegisterCommandsOptions) {
  //   if (guildId) {
  //     this.guilds.cache.get(guildId)?.commands.set(commands);
  //     console.log(`Registering commands to ${guildId}`);
  //   } else {
  //     this.application?.commands.set(commands);
  //     console.log('Registering global commands');
  //   }
  // }

  async registerModules() {
    // Commands
    const slashCommands: ApplicationCommandDataResolvable[] = [];
    const commandFiles = await globPromise(
      `${__dirname}/../bot/commands/*/*{.ts,.js}`
    );
    commandFiles.forEach(async (filePath) => {
      const command: CommandType = await this.importFile(filePath);
      if (!command.name) return;
      console.log(command);

      this.commands.set(command.name, command);
      slashCommands.push(command);
    });
  }
}
