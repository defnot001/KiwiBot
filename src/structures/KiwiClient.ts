import {
  ApplicationCommandDataResolvable,
  Client,
  ClientEvents,
  Collection,
  GatewayIntentBits,
  Partials,
} from 'discord.js';
import glob from 'glob';
import { promisify } from 'util';
import botConfig from '../config/botConfig';
import projectPaths from '../util/node/projectPaths';
import type { Event } from './Event';
import type CommandType from '../util/types/CommandType';
import type RegisterCommandOptionsInterface from '../util/interfaces/RegisterCommandOptionsInterface';

const globPromise = promisify(glob);

export class KiwiClient extends Client {
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
    this.login(botConfig.token);
  }

  async importFile(filePath: string) {
    return (await import(filePath))?.default;
  }

  async registerCommands({
    commands,
    guildID,
  }: RegisterCommandOptionsInterface) {
    if (guildID) {
      const guild = this.guilds.cache.get(guildID);
      guild?.commands.set(commands);
      console.log(`Registering commands to ${guild?.name}...`);
    } else {
      this.application?.commands.set(commands);
      console.log('Registering global commands');
    }
  }

  async registerModules() {
    // commands
    const slashCommands: ApplicationCommandDataResolvable[] = [];
    const commandPaths: string[] = await globPromise(
      `${projectPaths.commands}/*/*{.ts,.js}`,
    );

    for await (const path of commandPaths) {
      const command: CommandType = await this.importFile(path);
      if (!command.name) return;

      this.commands.set(command.name, command);
      slashCommands.push(command);
    }

    this.on('ready', () => {
      this.registerCommands({
        guildID: botConfig.guildID,
        commands: slashCommands,
      });
    });
    // events

    const eventPaths: string[] = await globPromise(
      `${projectPaths.events}/*{.ts,.js}`,
    );

    for await (const path of eventPaths) {
      const event: Event<keyof ClientEvents> = await this.importFile(path);
      this.on(event.event, event.run);
    }
  }
}
