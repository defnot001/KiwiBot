import EmbedColor from '../../config/embedColors';
import { EmbedBuilder, inlineCode } from 'discord.js';
import { ModerationAction } from '../../util/types/moderationAction';
import type {
  IModerationDescription,
  IModerationEmbedOptions,
} from '../../util/interfaces/ModerationEmbed';

export class ModerationEmbedBuilder extends EmbedBuilder {
  constructor(options: IModerationEmbedOptions) {
    super();

    const { target, executor, action, reason, expiration } = options;

    const descriptionObject: IModerationDescription = {
      member: `**Member**: ${target.tag} (${inlineCode(target.id)})`,
      action: `**Action**: ${action}`,
    };

    if (reason) {
      descriptionObject.reason = `**Reason**: ${reason}`;
    }

    if (expiration) {
      descriptionObject.expiration = `**Expiration**: ${expiration}`;
    }

    const description = Object.values(descriptionObject).join('\n');

    let color: number;

    switch (action) {
      case ModerationAction.kick:
        color = EmbedColor.orange;
        break;
      case ModerationAction.ban:
        color = EmbedColor.red;
        break;
      case ModerationAction.unban:
        color = EmbedColor.none;
        break;
      case ModerationAction.timeout:
        color = EmbedColor.yellow;
        break;
      case ModerationAction.timeoutRemove:
        color = EmbedColor.none;
        break;

      default:
        color = EmbedColor.none;
    }

    this.setColor(color);

    this.setAuthor({
      name: executor.user.tag,
      iconURL: executor.user.displayAvatarURL(),
    });

    this.setDescription(description);

    this.setFooter({
      text: 'Moderation Log',
    });

    this.setTimestamp(Date.now());
  }
}
