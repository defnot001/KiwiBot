import { SlashCommandBuilder, userMention } from 'discord.js';
import guildconfig from '../config/guildConfig.js';
import buildDefaultEmbed from '../util/discord/defaultEmbed.js';

export const command = {
  data: new SlashCommandBuilder()
    .setName('trialinfo')
    .setDescription('Posts an embed with information for a new trial member.')
    .addUserOption((option) =>
      option
        .setName('target')
        .setDescription('Select a user.')
        .setRequired(true),
    ),
  async execute(interaction) {
    const target = interaction.options.getMember('target');

    const trialEmbed = buildDefaultEmbed(interaction.user)
      .setTitle(
        `${guildconfig.emojis.kiwi}  Welcome to KiwiTech ${target.user.username}!  ${guildconfig.emojis.kiwi}`,
      )
      .setThumbnail(target.user.displayAvatarURL())
      .addFields([
        {
          name: `${guildconfig.emojis.owoKiwi}  Server Tour`,
          value:
            'Please let us know, when you have time for the server tour. Make sure to take your time, it will most likely take around two hours. You will be whitelisted once the tour starts.',
        },
        {
          name: `${guildconfig.emojis.owoKiwi}  Mods & Resources`,
          value: `On KiwiTech we share our waypoints with a mod that Earthcomputer wrote. You can find it in <#${guildconfig.resourcesChannelId}>. Also make sure to put the mod for instamineable deepslate in your mods-folder.`,
        },
        {
          name: `${guildconfig.emojis.owoKiwi}  Server Info`,
          value: `You can find the IPs of our servers in <#${guildconfig.serverInfoChannelId}>. There is also instructions on how to connect to KiwiTech using KCP. This is especially useful if you live outside of Europe and/or have unstable connection. Make sure to also read the SMP rules.`,
        },
        {
          name: `${guildconfig.emojis.owoKiwi}  Todo on KiwiTech`,
          value: `When you got your trial member role, we also gave you the Kiwi Inc. role. This role gets pinged from time to time to inform active SMP players about new projects or important things to do on our servers. You can check out our <#${guildconfig.todoChannelId}> to see what needs to be done or bring your own ideas and discuss them with us.`,
        },
        {
          name: '\u200b',
          value: `*The most important thing on KiwiTech is to have fun! If you have any questions, you can always ask us anything in member channels or ingame. We are also active in VC!*  ${guildconfig.emojis.froghypers}`,
        },
      ]);

    await interaction.reply({
      content: userMention(target.user.id),
      embeds: [trialEmbed],
    });

    interaction.editReply({
      content: '\u200b',
      embeds: [trialEmbed],
    });
  },
};
