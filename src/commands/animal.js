const { SlashCommandBuilder } = require('discord.js');
const { fetchAnimal } = require('../util/helper-functions');

module.exports = {
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
          { name: 'Dog', value: 'dog' }
        )
    ),
  async execute(interaction) {
    const animal = interaction.options.getString('animal');
    if (animal === 'fox') {
      const data = await fetchAnimal('https://randomfox.ca/floof/');
      interaction.reply(data.image);
      return;
    }

    if (animal === 'cat') {
      const data = await fetchAnimal(
        'https://api.thecatapi.com/v1/images/search'
      );
      interaction.reply(data[0].url);
      return;
    }

    if (animal === 'dog') {
      const data = await fetchAnimal(
        'https://api.thedogapi.com/v1/images/search'
      );
      interaction.reply(data[0].url);
    }
  },
};
