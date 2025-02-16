const { comoScrap } = require("../../scraping/comoScrap");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const logger = console;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("como")
    .setDescription("Check your Cosmo")
    .addStringOption((option) =>
      option
        .setName("address")
        .setDescription("Your Cosmo Address")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("range")
        .setDescription("Choose Date")
        .setRequired(true)
        .addChoices(
          { name: "1 to 6", value: 0 },
          { name: "7 to 12", value: 1 },
          { name: "13 to 18", value: 2 },
          { name: "19 to 24", value: 3 },
          { name: "25 to 31", value: 4 }
        )
    )
    .addBooleanOption((option) =>
      option
        .setName("artms")
        .setDescription("For checking atrms members")
        .setRequired(false)
    ),
  async execute(interaction) {
    const address = interaction.options.getString("address");
    const dateGroupIndex = interaction.options.getInteger("range");
    const artist = interaction.options.getBoolean("artms")
      ? "artms"
      : "tripleS";
    const dateGroups = [
      "1 to 6",
      "7 to 12",
      "13 to 18",
      "19 to 24",
      "25 to 31",
    ];
    const results = await comoScrap(address, dateGroupIndex, artist);

    if (!results) {
      await interaction.reply({
        content: `Error or the id/ address does not exist!`,
      });
      return;
    }

    const fields = [];
    for (const [date, objekts] of Object.entries(results.groupedObjekts)) {
      const limitedObjekts = objekts.slice(0, 10); // Limit to 10 objekts per date
      const objektsList = limitedObjekts
        .map((objekt) => {
          const formattedName = `${objekt.collectionId} #${objekt.objektNo}`;
          return objekt.comoAmount === 2 ? `*${formattedName}` : formattedName;
        })
        .join(", ");

      // Ensure the string length does not exceed 1024 characters
      if (objektsList.length > 1024) {
        objektsList = objektsList.substring(0, 1021) + "...";
      }
      fields.push({
        name: `Date: ${date}`,
        value: objektsList,
        inline: true,
      });
    }

    const imageEmbed = new EmbedBuilder()
      .setTitle(
        `Your Cosmo information in selected date range in ${dateGroups[dateGroupIndex]}`
      )
      .setDescription(
        `Your Cosmo address: ${address} \n - Each Date only show 10 objekts \n - * means the objekt has 2 COMO`
      )
      .addFields(fields)
      .setColor(0x0099ff)
      .setFooter({
        text: "Code Credit by Likw, Data from apollo.cafe",
        iconURL:
          "https://resources.cosmo.fans/images/user-profile/2024/07/10/02/600/f77db80ac6d94c3b87448f9eb293a70a20240710023502358.jpeg",
      });

    await interaction.reply({ embeds: [imageEmbed] });
  },
};
