import { EmbedBuilder } from 'discord.js';
import guildconfig from '../../config/guildConfig.js';

export default function buildDefaultEmbed(user) {
  const defaultEmbed = new EmbedBuilder({
    color: parseInt(guildconfig.embedColor, 16),
    footer: {
      text: `Requested by ${user.username}.`,
      iconURL: user.displayAvatarURL(),
    },
    timestamp: Date.now(),
  });
  return defaultEmbed;
}
