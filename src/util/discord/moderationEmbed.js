import { EmbedBuilder, inlineCode } from 'discord.js';

const buildModerationEmbed = (
  member,
  action,
  reason,
  executor,
  expiration = null,
) => {
  const descriptionObject = {
    member: `**Member**: ${member.user.tag} (${inlineCode(member.user.id)})`,
    action: `**Action**: ${action}`,
    reason: `**Reason**: ${reason}`,
    expiration: `**Expiration**: ${expiration}`,
  };

  if (!expiration) {
    delete descriptionObject.expiration;
  }

  const description = Object.values(descriptionObject).join('\n');

  const moderationEmbed = new EmbedBuilder({
    author: {
      name: executor.user.tag,
      icon_url: executor.user.displayAvatarURL(),
    },
    description: description,
    footer: { text: 'Moderation Logger' },
    timestamp: Date.now(),
  });

  switch (action) {
    case 'Kick':
      moderationEmbed.setColor('Orange');
      break;
    case 'Ban':
      moderationEmbed.setColor('Red');
      break;
    case 'Unban':
      moderationEmbed.setColor(3_092_790);
      break;
    case 'Timeout':
      moderationEmbed.setColor('Yellow');
      break;
    case 'Remove Timeout':
      moderationEmbed.setColor(3_092_790);
      break;

    default:
      moderationEmbed.setColor(3_092_790);
  }

  return moderationEmbed;
};

export default buildModerationEmbed;
