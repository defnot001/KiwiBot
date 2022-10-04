const {
  SlashCommandBuilder,
  EmbedBuilder,
  time,
  escapeMarkdown,
} = require('discord.js');
const { guild } = require('../../config.json');
const { buildDefaultEmbed } = require('../util/helper-functions');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Get information about our server.')
    .addSubcommand((subcommand) =>
      subcommand
        .setName('server')
        .setDescription('Get information about the KiwiTech Discord Server.')
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('user')
        .setDescription('Get information about a user.')
        .addUserOption((option) =>
          option
            .setName('target')
            .setDescription('Select a user.')
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('members')
        .setDescription('Lists the Members of the KiwiTech Minecraft Servers.')
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('admins')
        .setDescription('Lists the Admins of the KiwiTech Minecraft Servers.')
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('avatar')
        .setDescription('Returns a users avatar image.')
        .addUserOption((option) =>
          option
            .setName('target')
            .setDescription('Select a user.')
            .setRequired(true)
        )
    ),

  async execute(interaction) {
    if (interaction.options.getSubcommand() === 'server') {
      const inviteLink = await interaction.guild.invites.create(
        guild.channelIds.general,
        {
          maxAge: 0,
          maxUses: 0,
          unique: false,
        }
      );

      const serverEmbed = buildDefaultEmbed(interaction.user)
        .setTitle(`Server Info ${interaction.guild.name}`)
        .setThumbnail(interaction.guild.iconURL())
        .addFields([
          {
            name: 'Membercount',
            value: `${interaction.guild.memberCount}`,
          },
          {
            name: 'Guild created',
            value: `${time(interaction.guild.createdAt, 'D')}\n(${time(
              interaction.guild.createdAt,
              'R'
            )})`,
          },
          {
            name: 'Permanent Invite Link',
            value: inviteLink.url,
          },
        ]);

      interaction.reply({ embeds: [serverEmbed] });
    } else if (interaction.options.getSubcommand() === 'user') {
      const targetMember = interaction.options.getMember('target');
      const targetUser = interaction.options.getUser('target');

      if (targetUser && !targetMember) {
        const userEmbed = buildDefaultEmbed(interaction.user)
          .setTitle('User Info')
          .setThumbnail(targetUser.displayAvatarURL())
          .addFields([
            { name: 'Username', value: targetUser.tag },
            { name: 'User ID', value: targetUser.id },
            {
              name: 'Joined Discord on',
              value: `${time(targetUser.createdAt, 'D')}\n(${time(
                targetUser.createdAt,
                'R'
              )})`,
            },
          ]);

        interaction.reply({ embeds: [userEmbed] });
      } else {
        const roles = targetMember.roles.cache
          .filter((role) => role.name !== '@everyone')
          .sort((roleA, roleB) => roleB.position - roleA.position);

        const memberEmbed = new EmbedBuilder({
          color: targetMember.roles.color?.color,
          title: 'User Info',
          thumbnail: { url: targetMember.user.displayAvatarURL() },
          fields: [
            { name: 'Username', value: targetMember.user.tag },
            { name: 'User ID', value: targetMember.user.id },
            {
              name: 'Joined Discord on',
              value: `${time(targetMember.user.createdAt, 'D')}\n(${time(
                targetMember.user.createdAt,
                'R'
              )})`,
              inline: true,
            },
            {
              name: 'Joined this server on',
              value: `${time(targetMember.joinedAt, 'D')}\n(${time(
                targetMember.joinedAt,
                'R'
              )})`,
              inline: true,
            },
            { name: 'Roles', value: roles.toJSON().join(', ') || 'None' },
          ],
          footer: {
            text: `Requested by ${interaction.user.username}.`,
            iconURL: interaction.user.displayAvatarURL(),
          },
          timestamp: Date.now(),
        });

        interaction.reply({ embeds: [memberEmbed] });
      }
    } else if (interaction.options.getSubcommand() === 'members') {
      await interaction.deferReply();
      await interaction.guild.members.fetch();

      const minecraftMembers = interaction.guild.roles.cache
        .get(guild.roleIds.member)
        .members.map((m) => m.user.username)
        .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
        .map(escapeMarkdown)
        .join('\n');

      const minecraftMemberCount = interaction.guild.roles.cache
        .get(guild.roleIds.member)
        .members.map((m) => m.user.username).length;

      const memberEmbed = buildDefaultEmbed(interaction.user)
        .setTitle(`Member Info ${interaction.guild.name}`)
        .setThumbnail(interaction.guild.iconURL())
        .addFields([
          {
            name: 'Membercount',
            value: `${minecraftMemberCount}`,
          },
          {
            name: 'Memberlist',
            value: minecraftMembers,
          },
        ]);

      interaction.editReply({ embeds: [memberEmbed] });
    } else if (interaction.options.getSubcommand() === 'admins') {
      await interaction.deferReply();
      await interaction.guild.members.fetch();

      const admins = interaction.guild.roles.cache
        .get(guild.roleIds.admin)
        .members.map((m) => m.user.username)
        .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
        .map(escapeMarkdown)
        .join('\n');

      const adminCount = interaction.guild.roles.cache
        .get(guild.roleIds.admin)
        .members.map((m) => m.user.username).length;

      const adminEmbed = buildDefaultEmbed(interaction.user)
        .setTitle(`Admin Info ${interaction.guild.name}`)
        .setThumbnail(interaction.guild.iconURL())
        .addFields([
          {
            name: 'Admin Count',
            value: `${adminCount}`,
          },
          {
            name: 'Admin List',
            value: admins,
          },
        ]);

      interaction.editReply({ embeds: [adminEmbed] });
    } else if (interaction.options.getSubcommand() === 'avatar') {
      const targetMember = interaction.options.getMember('target');
      interaction.reply(targetMember.user.displayAvatarURL({ size: 4096 }));
    }
  },
};
