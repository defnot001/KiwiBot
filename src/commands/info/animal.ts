import { ApplicationCommandOptionType } from 'discord.js';
import { Command } from '../../structures/Command';
import axios from 'axios';

export default new Command({
  name: 'animal',
  description: 'Get random pictures from animals.',
  options: [
    {
      name: 'animal',
      description: 'Select an animal.',
      type: ApplicationCommandOptionType.String,
      choices: [
        { name: 'Fox', value: 'fox' },
        { name: 'Cat', value: 'cat' },
        { name: 'Dog', value: 'dog' },
      ],
      required: true,
    },
  ],
  execute: async ({ interaction, args }) => {
    await interaction.deferReply();

    const choice: string | null = args.getString('animal');

    // this check is technically not needed, because the command will not be executed if the user does not select an animal
    if (!choice) return interaction.editReply('Please select an animal.');

    const apiURL: { [key: string]: string } = {
      fox: 'https://randomfox.ca/floof/',
      cat: 'https://api.thecatapi.com/v1/images/search',
      dog: 'https://api.thedogapi.com/v1/images/search',
    } as const;

    try {
      const { data }: any = await axios.get(apiURL[choice]);
      const imageURL: string = choice === 'fox' ? data.image : data[0].url;

      interaction.editReply({ files: [imageURL] });
    } catch (err) {
      console.error(err);

      return interaction.editReply(
        `An error occurred trying to get a picture of a ${choice}.`,
      );
    }
  },
});
