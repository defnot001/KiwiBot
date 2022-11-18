import EmbedColor from '../../config/embedColors';
import { EmbedBuilder } from 'discord.js';
import type { GuildMember, APIEmbed, EmbedData } from 'discord.js';

export class JoinLeaveEmbedBuilder extends EmbedBuilder {
  constructor(
    member: GuildMember,
    action: 'joined' | 'left',
    data?: EmbedData | APIEmbed,
  ) {
    super(data);

    this.setAuthor({
      name: member.user.tag,
    });

    this.setColor(EmbedColor.none);

    this.setFooter({
      text: `User ${action}`,
    });

    this.setTimestamp(Date.now());
  }
}
