const axios = require('axios');

const serviceParser = require('./Parser');

const MY_ANIME_LIST_SEASON_BASE_URI = 'https://myanimelist.net/anime/season/';
const POSSIBLE_SEASON = ['winter', 'spring', 'summer', 'fall'];
const MAX_YEAR = (new Date()).getFullYear() + 1;
const MIN_YEAR = 1917;

/** 
 * Take a year and a season and return a object with all types of animes during that period
 * @name getSeasons
 * @function
 * @param {number} year - of release of the anime or manga
 * @param {string} season - of the year 'summer', 'fall', 'winter' or 'spring'
 * 
 * @returns {Object} a object with all s
 */
exports.getSeasons = (year, season) => {
    return new Promise((resolve, reject) => {
        if (!POSSIBLE_SEASON.includes(season)) throw new Error('[ERROR] getSeasons: Invalid season! Possible value "winter", "spring", "summer" and "fall"');

        if ( !(year <= MAX_YEAR) || !(year >= MIN_YEAR)) throw new Error(`[ERROR] getSeasons: year must be between 1917 and ${MAX_YEAR}`);
        
        axios.get(`${MY_ANIME_LIST_SEASON_BASE_URI}${year}/${season}`)
        .then(({data}) => {
            
            const result = {
                TV: serviceParser.getSeasonType('TV', data),
                OVAs: serviceParser.getSeasonType('OVAs', data),
                ONAs: serviceParser.getSeasonType('ONAs', data),
                Movies: serviceParser.getSeasonType('Movies', data),
                Specials: serviceParser.getSeasonType('Specials', data),
            };

            resolve(result);
        })
        .catch(/* istanbul ignore next */ error => reject(error)); 
    });
}
