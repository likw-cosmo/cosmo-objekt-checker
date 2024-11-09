// import { SlashCommandBuilder } from '@discordjs/builders';
const { apolloScrap } = require("../../scraping/apolloScrap");
const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders");
const logger = console;

// season name list
const seasonList = {
  a: "atom",
  b: "binary",
  c: "cream",
  d: "divine",
  e: "ever",
};
// tripleS member name list
const memberList = {
  1: "seoyeon",
  2: "hyerin",
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
// atrms member name list
const atrmsMemberList = {
  1: "heejin",
  3: "haseul",
  6: "kimlip",
  7: "jinsoul",
  8: "choerry",
};

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
    )
    .addBooleanOption((option) =>
      option
        .setName("atrms")
        .setDescription(
          "For checking atrms members, please enter loona member's number in num field"
        )
        .setRequired(false)
    ),
  async execute(interaction) {
    const member = interaction.options.getInteger("member");
    const season = interaction.options.getString("season");
    const num = interaction.options.getInteger("num");
    const physical = interaction.options.getString("physical") || "z";
    const atrms = interaction.options.getBoolean("atrms") || false;
    if (atrms) {
      if (!atrmsMemberList[member]) {
        await interaction.reply({
          content: `Error or the member is not exist!`,
        });
        return;
      }
    }

    const objektId = `${num}${physical ? physical : ""}`.trim().toLowerCase();
    const slug = `${seasonList[season]}01-${
      atrms ? atrmsMemberList[member] : memberList[member]
    }-${objektId}`;

    const objekt = await apolloScrap(slug);

    if (!objekt) {
      await interaction.reply({
        content: `Error or the objekt is not exist!`,
      });
      logger.error(
        `Error accessing objekt with slug: ${slug} at ${new Date().toISOString()}`
      );
      // logger.error(
      //   `Error accessing objekt with slug: ${slug} at ${new Date().toISOString()}`,
      //   error
      // );
    }
    function getRarity(copies) {
      if (copies <= 10) {
        return "impossible";
      }
      if (copies <= 25) {
        return "extremely-rare";
      }
      if (copies <= 50) {
        return "very-rare";
      }
      if (copies <= 100) {
        return "rare";
      }
      if (copies <= 350) {
        return "uncommon";
      }
      return "common";
    }
    // await interaction.reply(`The objekt contect: https://apollo.cafe/objekts?id=${seasonList[season]}01-${memberList[member]}-${objektId}`);
    const imageEmbed = new EmbedBuilder()
      .setTitle(objekt.objektInfoResponse.collectionId)
      .setImage(objekt.objektInfoResponse.frontImage)
      .setDescription(objekt.objektMetaDataResponse.metadata.description)
      .addFields(
        { name: "Class", value: objekt.objektInfoResponse.class, inline: true },
        {
          name: "Copies",
          value: objekt.objektMetaDataResponse.copies.toString(),
          inline: true,
        },
        {
          name: "Rarity",
          value: getRarity(objekt.objektMetaDataResponse.copies).toString(),
          inline: true,
        }
      )
      .setColor(0x0099ff)
      .setFooter({
        text: "Code Credit by Likw, Data from apollo.cafe",
        iconURL:
          "https://resources.cosmo.fans/images/user-profile/2024/07/10/02/600/f77db80ac6d94c3b87448f9eb293a70a20240710023502358.jpeg",
      });
    // .addFields(
    //   { name: 'Rarity', value: objekt.rarity },
    // )
    await interaction.reply({ embeds: [imageEmbed] });
    logger.info(
      `Accessed objekt with slug: ${slug} at ${new Date().toISOString()}`
    );
  },
};
