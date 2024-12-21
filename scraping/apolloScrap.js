module.exports.apolloScrap = async (slug) => {
  let responseSlug = slug;
  const axios = require("axios");
  let objektInfoResponse;
  try {
    objektInfoResponse = await axios.get(
      `https://apollo.cafe/api/objekts/by-slug/${responseSlug}`
    );
  } catch (error) {
    // cut the last word in slug from z to a and try again
    try {
      responseSlug = slug.slice(0, -1) + "a";
      const link = `https://apollo.cafe/api/objekts/by-slug/${responseSlug}`;
      objektInfoResponse = await axios.get(link);
    } catch (error) {
      return null;
    }
  }
  const { data: objektMetaDataResponse } = await axios.get(
    `https://apollo.cafe/api/objekts/metadata/${responseSlug}`
  );
  return {
    objektInfoResponse: objektInfoResponse.data,
    objektMetaDataResponse,
  };
};
