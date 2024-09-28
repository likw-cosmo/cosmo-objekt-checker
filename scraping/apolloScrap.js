module.exports.apolloScrap = async (
  link,
  seasonTitle,
  memberTitle,
  objektId,
  slug
) => {
  const axios = require("axios");
  // Link
  const objektInfoLink = `https://apollo.cafe/api/objekts/by-slug/`;
  const objektMetaDataLink = `https://apollo.cafe/api/objekts/metadata/`;
  try {
    const [objektInfoResponse, objektMetaDataResponse] = await Promise.all([
      axios.get(objektInfoLink + slug).then(({ data }) => data),
      axios.get(objektMetaDataLink + slug).then(({ data }) => data.metadata),
    ]);
    return {
      objektInfoResponse,
      objektMetaDataResponse,
    };
  } catch (error) {
    console.error(error);
    return null; // or some other default value
  }
};
