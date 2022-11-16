import type { ClientEvents } from 'discord.js';

export class Event<Key extends keyof ClientEvents> {
  constructor(
    public name: Key,
    public execute: (...args: ClientEvents[Key]) => any,
  ) {}
}
