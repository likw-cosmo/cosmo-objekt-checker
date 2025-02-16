// import { SlashCommandBuilder } from '@discordjs/builders';
const { idScrap } = require("../../scraping/idScrap");
const { SlashCommandBuilder } = require("@discordjs/builders");
const logger = console;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("id")
    .setDescription("Check User ID or Address")
    .addStringOption((option) =>
      option.setName("id").setDescription("ID or Address").setRequired(true)
    ),
  async execute(interaction) {
    const id = interaction.options.getString("id");
    const results = await idScrap(id.toLowerCase());
    if (!results) {
      await interaction.reply({
        content: `Error or the id/ address is not exist!`,
      });
      logger.error(`Error accessing id: ${id} at ${new Date().toISOString()}`);
    }
    await interaction.reply(results);
  },
};
