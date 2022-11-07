import fs from 'fs';
import path from 'path';
import botEnv from './config/environment.js';
import { fileURLToPath } from 'url';
import { Client, Collection, GatewayIntentBits, Partials } from 'discord.js';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
  ],
  partials: [Partials.GuildMember],
});

client.commands = new Collection();

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = await import(filePath);
  client.commands.set(command.command.data.name, command);
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = await import(filePath);
  if (event.once) {
    client.once(event.event.name, event.event.execute);
  } else {
    client.on(event.event.name, event.event.execute);
  }
}

client.login(botEnv.token);
