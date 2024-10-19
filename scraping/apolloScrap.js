module.exports.apolloScrap = async (slug) => {
  const axios = require("axios");
  const { data: objektInfoResponse } = await axios.get(
    `https://apollo.cafe/api/objekts/by-slug/${slug}`
  );
  const { data: objektMetaDataResponse } = await axios.get(
    `https://apollo.cafe/api/objekts/metadata/${slug}`
  );
  return {
    objektInfoResponse,
    objektMetaDataResponse,
  };
};
