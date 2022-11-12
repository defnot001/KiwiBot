import { Command } from '../../structures/Command';
import {
  APIEmbed,
  ApplicationCommandOptionType,
  userMention,
} from 'discord.js';
import { isGuildMember } from '../../util/functions/typeChecks';
import { KiwiEmbedBuilder } from '../../structures/KiwiEmbedBuilder';
import trialWelcomeMessage from '../../data/trialWelcomeMessage';
import guildConfig from '../../config/guildConfig';

export default new Command({
  name: 'trialinfo',
  description: 'Posts an embed with information for a new trial member.',
  options: [
    {
      name: 'target',
      description: 'Select a user.',
      type: ApplicationCommandOptionType.User,
      required: true,
    },
  ],
  execute: async ({ interaction, args }) => {
    const target = args.getMember('target');

    if (!isGuildMember(target)) {
      return interaction.reply({
        content: 'The target you chose is not a member of this guild!',
        ephemeral: true,
      });
    }

    const trialEmbed = new KiwiEmbedBuilder(interaction.user, {
      title: `${guildConfig.emojis.kiwi}  Welcome to KiwiTech ${target.user.username}!  ${guildConfig.emojis.kiwi}`,
      thumbnail: {
        url: target.user.displayAvatarURL(),
      },
      fields: trialWelcomeMessage,
    }) as APIEmbed;

    await interaction.reply({
      content: userMention(target.user.id),
      embeds: [],
    });

    interaction.editReply({
      content: '\u200b',
      embeds: [trialEmbed],
    });
  },
});
