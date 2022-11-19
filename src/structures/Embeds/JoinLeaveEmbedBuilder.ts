import EmbedColor from '../../config/embedColors';
import { EmbedBuilder, PartialGuildMember } from 'discord.js';
import type { GuildMember, APIEmbed, EmbedData } from 'discord.js';

export class JoinLeaveEmbedBuilder extends EmbedBuilder {
  constructor(
    member: GuildMember | PartialGuildMember,
    action: 'joined' | 'left',
    data?: EmbedData | APIEmbed,
  ) {
    super(data);

    this.setAuthor({
      name: member.user.tag,
      iconURL: member.user.displayAvatarURL(),
    });

    this.setColor(EmbedColor.none);

    this.setFooter({
      text: `User ${action}`,
    });

    this.setTimestamp(Date.now());
  }
}
