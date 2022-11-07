import { REST } from '@discordjs/rest';
import { Routes } from 'discord.js';
import { botEnv } from '../config/environment.js';

const rest = new REST({ version: '10' }).setToken(botEnv.token);

// for guild-based commands
rest
  .delete(
    Routes.applicationGuildCommand(botEnv.clientId, botEnv.guildId, 'commandId')
  )
  .then(() => console.log('Successfully deleted guild command'))
  .catch(console.error);

// for global commands
rest
  .delete(Routes.applicationCommand(botEnv.clientId, 'commandId'))
  .then(() => console.log('Successfully deleted application command'))
  .catch(console.error);