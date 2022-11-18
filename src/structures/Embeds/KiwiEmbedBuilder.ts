import { APIEmbed, EmbedBuilder, EmbedData } from 'discord.js';
import type { User } from 'discord.js';
import EmbedColor from '../../config/embedColors';

export class KiwiEmbedBuilder extends EmbedBuilder {
  constructor(user: User, data?: EmbedData | APIEmbed) {
    super(data);

    this.setColor(EmbedColor.default);

    this.setFooter({
      text: `Requested by ${user.username}`,
      iconURL: user.displayAvatarURL(),
    });

    this.setTimestamp(Date.now());
  }
}
