const { SlashCommandBuilder } = require('discord.js');
const {
  getServerStatus,
  buildDefaultEmbed,
  queryMSPT,
  queryMobcap,
} = require('../helper-functions');
const { server } = require('../../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('Get the status of a Minecraft Server.')
    .addStringOption((option) =>
      option
        .setName('server')
        .setDescription('The server you want info about.')
        .setRequired(true)
        .addChoices(
          { name: 'smp', value: 'smp' },
          { name: 'cmp', value: 'cmp' },
          { name: 'cmp2', value: 'cmp2' },
          { name: 'copy', value: 'copy' },
          { name: 'snapshots', value: 'snapshots' }
        )
    ),
  async execute(interaction) {
    await interaction.deferReply();

    const choice = interaction.options.getString('server');
    const { ip, port, rconPort, rconPassword } = server[choice];

    try {
      const result = await getServerStatus(ip, port);
      const playerlist =
        result.players.list.join('\n') || 'There is currently nobody online!';

      const { mspt, tps } = await queryMSPT(ip, rconPort, rconPassword);
      const mobcap = await queryMobcap(ip, rconPort, rconPassword);

      const statusEmbed = buildDefaultEmbed(interaction.user)
        .setTitle(`KiwiTech ${choice.toUpperCase()}`)
        .setThumbnail(interaction.guild.iconURL())
        .addFields([
          { name: 'Status', value: 'Online' },
          { name: 'Version', value: result.version },
          { name: 'Performance', value: `**${mspt}** mspt | **${tps}** TPS` },
          {
            name: 'Hostile Mobcaps',
            value: `Overworld: ${mobcap.overworld}\n The Nether: ${mobcap.the_nether}\n The End: ${mobcap.the_end}`,
          },
          {
            name: 'Playercount',
            value: `online: **${result.players.online}** | max: **${result.players.max}**`,
          },
          { name: 'Playerlist', value: playerlist },
        ]);

      statusEmbed.setColor('Green');

      if (mspt > 30 && mspt < 50) {
        statusEmbed.setColor('Yellow');
      } else if (mspt >= 50) {
        statusEmbed.setColor('Red');
      }

      await interaction.editReply({ embeds: [statusEmbed] });
    } catch (err) {
      console.error(err);
      await interaction.editReply('Server offline or unreachable!');
    }
  },
};
