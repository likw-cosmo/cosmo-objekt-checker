// import { SlashCommandBuilder } from '@discordjs/builders';
const { apolloScrap } = require("../../scraping/apolloScrap");
const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders");
const logger = console;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("check")
    .setDescription("Check information")
    .addIntegerOption((option) =>
      option.setName("member").setDescription("The member ID").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("season").setDescription("The season").setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("num")
        .setDescription("The objekt number")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("physical")
        .setDescription("The objekt is physical or not")
        .setRequired(false)
        .addChoices({ name: "A", value: "a" }, { name: "Z", value: "z" })
    ),
  async execute(interaction) {
    const member = interaction.options.getInteger("member");
    const season = interaction.options.getString("season");
    const num = interaction.options.getInteger("num");
    const physical = interaction.options.getString("physical") || "z";

    const seasonList = {
      a: "atom",
      b: "binary",
      c: "cream",
      d: "divine",
    };
    // tripleS member name list
    const memberList = {
      1: "seoyeon",
      2: "haerin",
      3: "jiwoo",
      4: "chaeyeon",
      5: "yooyeon",
      6: "soomin",
      7: "nakyoung",
      8: "yubin",
      9: "kaede",
      10: "dahyun",
      11: "kotone",
      12: "yeonji",
      13: "nien",
      14: "sohyun",
      15: "xinyu",
      16: "mayu",
      17: "lynn",
      18: "joobin",
      19: "hayeon",
      20: "shion",
      21: "chaewon",
      22: "sullin",
      23: "seoah",
      24: "jiyeon",
    };
    const objektId = `${num}${physical ? physical : ""}`.trim().toLowerCase();
    const link = `https://apollo.cafe/objekts?id=${seasonList[season]}01-${memberList[member]}-${objektId}`;
    const slug = `${seasonList[season]}01-${memberList[member]}-${objektId}`;
    const seasonTitle = `${
      seasonList[season].charAt(0).toUpperCase() + seasonList[season].slice(1)
    }01`;
    const memberTitle = `${
      memberList[member].charAt(0).toUpperCase() + memberList[member].slice(1)
    }`;

    const objekt = await apolloScrap(
      link,
      seasonTitle,
      memberTitle,
      objektId,
      slug
    );

    if (!objekt) {
      await interaction.reply({
        content: `Error or the objekt is not exist!`,
      });
      logger.error(
        `Error accessing objekt with slug: ${slug} at ${new Date().toISOString()}`,
        error
      );
    }
    // await interaction.reply(`The objekt contect: https://apollo.cafe/objekts?id=${seasonList[season]}01-${memberList[member]}-${objektId}`);
    const imageEmbed = new EmbedBuilder()
      .setTitle(objekt.objektInfoResponse.collectionId)
      .setImage(objekt.objektInfoResponse.frontImage)
      .setDescription(objekt.objektMetaDataResponse.description)
      .setColor(0x0099ff);
    // .addFields(
    //   { name: 'Rarity', value: objekt.rarity },
    // )
    await interaction.reply({ embeds: [imageEmbed] });
    logger.info(
      `Accessed objekt with slug: ${slug} at ${new Date().toISOString()}`
    );
  },
};
