import { SlashCommandBuilder } from 'discord.js';

export const command = {
  data: new SlashCommandBuilder()
    .setName('animal')
    .setDescription('Get Random Pictures from Animals.')
    .addStringOption((option) =>
      option
        .setName('animal')
        .setDescription('Select an animal.')
        .setRequired(true)
        .addChoices(
          { name: 'Fox', value: 'fox' },
          { name: 'Cat', value: 'cat' },
          { name: 'Dog', value: 'dog' },
        ),
    ),
  async execute(interaction) {
    await interaction.deferReply();

    const animal = interaction.options.getString('animal');
    if (animal === 'fox') {
      const response = await fetch('https://randomfox.ca/floof/');
      const data = await response.json();
      interaction.editReply(data.image);
      return;
    }

    if (animal === 'cat') {
      const response = await fetch(
        'https://api.thecatapi.com/v1/images/search',
      );
      const data = await response.json();
      interaction.editReply(data[0].url);
      return;
    }

    if (animal === 'dog') {
      const response = await fetch(
        'https://api.thedogapi.com/v1/images/search',
      );
      const data = await response.json();
      interaction.editReply(data[0].url);
    }
  },
};
