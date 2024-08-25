module.exports.webScrap = (link, seasonTitle, memberTitle, objektId) => {
  const axios = require('axios'); 
  const cheerio = require('cheerio'); 
  const altTitle = `${seasonTitle} ${memberTitle} ${objektId}`;
  console.log(altTitle);
  const response = axios.get(link) 
    .then(({ data }) => { 
      const $ = cheerio.load(data); 
     
      const image = $(`img[alt*="${altTitle}" i]`);
    //   const parentElement = $('.flex.grow.flex-col.justify-between.gap-2.p-4');
    //   const paragraphElement = parentElement.find('p');
    //   const commonTextElement = parentElement.find('.flex.items-center.gap-1.rounded-full.px-2.py-1.text-sm');
        // console.log(image.attr('src'));
      return {
        link: image.attr('src'),
        // rarity: commonTextElement.text().trim(),
        // desc: paragraphElement.text().trim()
      };
    });
  
  return response;
}