import { EmbedBuilder } from 'discord.js';
import type { User } from 'discord.js';
import EmbedColor from '../../config/embedColors';

export default function defaultEmbed(
  user: User,
  color?: EmbedColor,
): EmbedBuilder {
  return new EmbedBuilder({
    color: color || EmbedColor.default,
    footer: {
      text: `Requested by ${user.username}`,
      iconURL: user.displayAvatarURL(),
    },
    timestamp: Date.now(),
  });
}
