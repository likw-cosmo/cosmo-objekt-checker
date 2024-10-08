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
      // 1. Objekt Info
      axios.get(objektInfoLink + slug).then(({ data }) => data),
      // 2. Objekt MetaData and Copies
      axios.get(objektMetaDataLink + slug).then(({ data }) => data),
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
