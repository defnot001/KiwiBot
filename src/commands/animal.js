const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('animal')
    .setDescription('Get Random Pictures from Animals.')
    .addStringOption((option) =>
      option
        .setName('animal')
        .setDescription('Select an animal.')
        .setRequired(true)
        .addChoices({ name: 'Fox', value: 'fox', emoji: '🦊' })
    ),
  async execute(interaction) {
    if (interaction.options.getString('animal') === 'fox') {
      const response = await fetch(`https://randomfox.ca/floof/`);
      const data = response.json();

      await interaction.reply(data.image);
    } else {
      await interaction.reply('Failed to get animal.');
    }
  },
};
