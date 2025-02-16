module.exports.idScrap = async (id) => {
  // if the stalk first two characters are 0x, then it is an address
  const axios = require("axios");
  let data;
  let resp;
  if (id.slice(0, 2) === "0x") {
    try {
      resp = await axios.get(`https://apollo.cafe/api/transfers/${id}`);
    } catch (error) {
      throw error;
    }
    const { results } = resp.data;
    if (results.length === 0) return null;
    data = results.filter((item) => item.hasOwnProperty("nickname"))[0][
      "nickname"
    ];
    return data;
  } else {
    try {
      resp = await axios.get(
        `https://apollo.cafe/api/user/v1/search?query=${id}`
      );
    } catch (error) {
      throw error;
    }
    const { results } = resp.data;
    if (results.length === 0) return null;
    data = results[0]["address"];
    return data;
  }
};
