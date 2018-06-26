const cheerio = require('cheerio');

const MY_ANIME_LIST_TYPE = {
    TV: 1,
    OVAs: 2,
    Movies: 3,
    Specials: 4,
    ONAs: 5,
};

/** 
 * Take a type and a html body and return a array of object with all informations parsed
 * @name getSeasonType
 * @function
 * @param {string} type - a type of diffusion
 * @param {string} html - a html body
 * 
 * @returns {Object[]} a array of object with all informations parsed
 */
exports.getSeasonType = (type, html) => {
    const $ = cheerio.load(html);
    const result = [];
    const classToSearch = `.js-seasonal-anime-list-key-${MY_ANIME_LIST_TYPE[type]} .seasonal-anime.js-seasonal-anime`;

    $(classToSearch).each((i, element) => {

        const title = $(element).find('.title').find('p').find('a');
        const synopsis = $(element).find('.synopsis').find('.preline');
        const licensor = $(element).find('.synopsis').find('.licensors');
        const picture = $(element).find('.image').find('img');
        const link = $(element).find('.title').find('a');
        const genres = $(element).find('.genres').find('.genres-inner');
        const producer = $(element).find('.producer');
        const fromType = $(element).find('.source');
        const numberOfEpisode = $(element).find('.eps').find('a');
        const releaseDate = $(element).find('.info').find('span');
        const rating = $(element).find('.scormem').find('.score');

        if (!$(element).hasClass('kids') && !$(element).hasClass('r18')) {
            result.push({
                title: title.text(),
                synopsis: synopsis.text(),
                licensor: licensor.attr('data-licensors').slice(0, -1),
                picture: picture.attr(picture.hasClass('lazyload') ? 'data-src' : 'src'),
                link: link.attr('href').replace('/video', ''),
                genres: genres.text().trim().split('\n      \n        '),
                producers: producer.text().trim().split(', '),
                fromType: fromType.text().trim(),
                numberOfEpisode: numberOfEpisode.text().trim().replace(' eps', ''),
                releaseDate: releaseDate.text().trim(),
                rating: rating.text().trim(),
            })
        }
    });
    return result;
}

/** 
 * Take a html body and return a array of object with all informations parsed
 * @name parseEpisodePage
 * @function
 * @param {string} html - a html body
 * 
 * @returns {Object[]} a array of object with all informations parsed
 */
exports.parseEpisodePage = (html) => {
    const $ = cheerio.load(html);
    const allItems = $('tr.episode-list-data');
    const result = [];

    const items = allItems.slice(0, allItems.length / 2);

    items.each((i, element) => {
        result.push({
            episodeNumber: +$(element).find('td.episode-number').text().trim(),
            aired: $(element).find('td.episode-aired').text().trim(),
            discussionLink: $(element).find('td.episode-forum > a').attr('href'),
            title: $(element).find('td.episode-title > a').text().trim(),
            originalTitle: $(element).find('td.episode-title > span').text().trim(),
        });
    });
    return result;
}

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
    const results = {};
  
    results.characters = [];
    const leftC = $('div.detail-characters-list').first().find('div.left-column');
    const rightC = $('div.detail-characters-list').first().find('div.left-right');
    const nbLeftC = leftC.children('table').length;
    const nbRightC = rightC.children('table').length;
  
    results.staff = [];
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
