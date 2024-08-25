module.exports.webScrap = (link) => {
  const axios = require('axios'); 
  const cheerio = require('cheerio'); 
  const response = axios.get(link) 
    .then(({ data }) => { 
      const $ = cheerio.load(data); 
     
      const image = $('img[alt*="Divine01 YooYeon 204Z"]');
      const parentElement = $('.flex.grow.flex-col.justify-between.gap-2.p-4');
      const paragraphElement = parentElement.find('p');
      const commonTextElement = parentElement.find('.flex.items-center.gap-1.rounded-full.px-2.py-1.text-sm');

      return {
        link: image.attr('src'),
        // rarity: commonTextElement.text().trim(),
        // desc: paragraphElement.text().trim()
      };
    });
  
  return response;
}