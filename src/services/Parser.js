const cheerio = require('cheerio');

/** 
 * Take a html body and return a object with all informations parsed
 * @name parsePage
 * @function
 * @param {string} html - a html body
 * 
 * @returns {Object} a object with all informations parsed
 */
exports.parsePage = (html) => {
    const $ = cheerio.load(html);
    const result = {};

    result.title = $('span[itemprop="name"]').first().text();
    result.synopsis = $('.js-scrollfix-bottom-rel span[itemprop="description"]').text();
    result.picture = $('img.ac').attr('src');

    const staffAndCharacters = getCharactersAndStaff($);
    result.characters = staffAndCharacters.characters;
    result.staff = staffAndCharacters.staff;
    result.trailer = $('a.iframe.js-fancybox-video.video-unit.promotion').attr('href');
    result.englishTitle = getFromBorder($, 'English:');
    result.japaneseTitle = getFromBorder($, 'Japanese:');
    result.synonyms = getFromBorder($, 'Synonyms:');
    result.type = getFromBorder($, 'Type:');
    result.episodes = getFromBorder($, 'Episodes:');
    result.status = getFromBorder($, 'Status:');
    result.aired = getFromBorder($, 'Aired:');
    result.premiered = getFromBorder($, 'Premiered:');
    result.broadcast = getFromBorder($, 'Broadcast:');
    result.producers = getFromBorder($, 'Producers:').split(',       ');
    result.studios = getFromBorder($, 'Studios:').split(',       ');
    result.source = getFromBorder($, 'Source:');
    result.genres = getFromBorder($, 'Genres:').split(', ');
    result.duration = getFromBorder($, 'Duration:');
    result.rating = getFromBorder($, 'Rating:');
    result.score = getFromBorder($, 'Score:').split(' ')[0].slice(0, -1);
    result.scoreStats = getFromBorder($, 'Score:').split(' ').slice(1).join(' ').slice(1, -1);
    result.ranked = getFromBorder($, 'Ranked:').slice(0, -1);
    result.popularity = getFromBorder($, 'Popularity:');
    result.members = getFromBorder($, 'Members:');
    result.favorites = getFromBorder($, 'Favorites:');

    return result;
}

const getCharactersAndStaff = ($) => {
    const results = {
      characters: [],
      staff: [],
    };
  
    // Characters
    const leftC = $('div.detail-characters-list').first().find('div.left-column');
    const rightC = $('div.detail-characters-list').first().find('div.left-right');
  
    const nbLeftC = leftC.children('table').length;
    const nbRightC = rightC.children('table').length;
  
    // Staff
    const leftS = $('div.detail-characters-list').last().find('div.left-column');
    const rightS = $('div.detail-characters-list').last().find('div.left-right');
  
    const nbLeftS = leftS.children('table').length;
    const nbRightS = rightS.children('table').length;
  
    // Characters
    for (let i = 1; i <= nbLeftC; ++i) {
      results.characters.push(parseCharacterOrStaff(leftC.find(`table:nth-child(${i}) > tbody > tr`)));
    }
  
    for (let i = 1; i <= nbRightC; ++i) {
      results.characters.push(parseCharacterOrStaff(rightC.find(`table:nth-child(${i}) > tbody > tr`)));
    }
  
    // Staff
    for (let i = 1; i <= nbLeftS; ++i) {
      results.staff.push(parseCharacterOrStaff(leftS.find(`table:nth-child(${i}) > tbody > tr`), true));
    }
  
    for (let i = 1; i <= nbRightS; ++i) {
      results.staff.push(parseCharacterOrStaff(rightS.find(`table:nth-child(${i}) > tbody > tr`), true));
    }
  
    return results;
}

const getFromBorder = ($, t) => {
    return $(`span:contains("${t}")`).parent().text().trim().split(' ').slice(1).join(' ').split('\n')[0].trim();
}
  
const parseCharacterOrStaff = (tr, isStaff = false) => {
    return JSON.parse(
        JSON.stringify({
            link: tr.find('td:nth-child(1)').find('a').attr('href'),
            name: tr.find('td:nth-child(2)').text().trim().split('\n')[0],
            role: tr.find('td:nth-child(2)').text().trim().split('\n')[2].trim(),
            seiyuu: !isStaff ? {
                link: tr.find('td:nth-child(3)').find('a').attr('href'),
                name: tr.find('td:nth-child(3)').find('a').text().trim()
            } : undefined,
        })
    );
}
