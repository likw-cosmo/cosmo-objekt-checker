module.exports.comoScrap = async (address, dateGroupIndex, artist) => {
  const axios = require("axios");
  const apiUrl = `https://apollo.cafe/api/objekts/by-address/${address}?sort=newest&class=Special,Premier&artist=${artist}`;
  let response;

  try {
    response = await axios.get(apiUrl);
  } catch (error) {
    throw error;
  }

  const dateGroups = [
    [1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24],
    [25, 26, 27, 28, 29, 30, 31],
  ];
  const selectedDateGroup = dateGroups[dateGroupIndex];
  let { hasNext, objekts, nextStartAfter } = response.data;

  while (hasNext) {
    try {
      response = await axios.get(`${apiUrl}&page=${nextStartAfter}`);
      objekts = objekts.concat(response.data.objekts);
      hasNext = response.data.hasNext;
      nextStartAfter = response.data.nextStartAfter;
    } catch (error) {
      throw error;
    }
  }

  const mappedObjekts = objekts.map((objekt) => ({
    collectionId: objekt.collectionId,
    comoAmount: objekt.comoAmount,
    objektNo: objekt.objektNo,
    mintDate: new Date(objekt.mintedAt).getDate(),
  }));

  const filteredObjekts = mappedObjekts.filter((objekt) =>
    selectedDateGroup.includes(objekt.mintDate)
  );
  const filteredObjektsLength = filteredObjekts.length;
  const groupedObjekts = filteredObjekts.reduce((acc, curr) => {
    if (!acc[curr.mintDate]) {
      acc[curr.mintDate] = [];
    }
    acc[curr.mintDate].push(curr);
    return acc;
  }, {});

  return {
    totalObjekts: filteredObjektsLength,
    groupedObjekts,
  };
};

// (async () => {
//   try {
//     const result = await module.exports.comoScrap(
//       "0x3E134E7eF0A6C9caa6d7dA9c944402f1BfEAD1BD",
//       2,
//       "tripleS"
//       // "artms"
//     );
//     console.log(result);
//   } catch (error) {
//     console.error(error);
//   }
// })();
