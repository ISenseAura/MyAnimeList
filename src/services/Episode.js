const axios = require('axios');
const _ = require('lodash');

const serviceParser = require('./Parser');
const serviceSearch = require('./Search');

const MY_ANIME_LIST_SEASON_BASE_URI = 'https://myanimelist.net/anime/';

/** 
 * Take a html body and return a array of object with all informations parsed
 * @name getEpisodesList
 * @function
 * @param {string|Object} obj - a string or Object with the id or/and the name of the anime or the manga
 * 
 * @returns {Object[]} a array of object with all informations parsed
 */
exports.getEpisodesList = (obj) => {
    return new Promise((resolve, reject) => {
        if (!obj) throw new Error('[ERROR] getEpisodesList: No id nor name received.');
    
        if (typeof obj === 'object' && !obj[0]) {
            const {id, name} = obj
    
            if (!id || !name || isNaN(+id) || typeof name !== 'string') throw new Error('[ERROR] getEpisodesList: id or name is invalid or missing.');
    
            getEpisodesFromNameAndId(id, name)
                .then((data) => resolve(data))
                .catch(/* istanbul ignore next */ error => reject(error));
        } else {
            getEpisodesFromName(obj)
                .then((data) => resolve(data))
                .catch(error => reject(error));
        }
    });
}

const getEpisodesFromName = (name) => {
    return new Promise((resolve, reject) => {
        if (typeof name !== 'string') throw new Error('[ERROR] getEpisodesFromName: The name must be a String');

        serviceSearch.searchResultsWhereNameAndType(name)
            .then(data => {
                const {url} = data[0];
                
                searchPage(`${encodeURI(url)}/episode`)
                    .then((data) => resolve(data))
                    .catch(/* istanbul ignore next */ error => reject(error));
            })
            .catch(/* istanbul ignore next */ error => reject(error));
    });
}

const getEpisodesFromNameAndId = (id, name) => {
    return new Promise((resolve, reject) => {
        if (typeof name !== 'string'  || id < 0) throw new Error('[ERROR] getEpisodesFromNameAndId: The name or id are not valid');
        searchPage(`${MY_ANIME_LIST_SEASON_BASE_URI}${id}/${encodeURI(name)}/episode`)
            .then((data) => resolve(data))
            .catch(/* istanbul ignore next */ error => reject(error));
    });
}

const searchPage = (url, offset = 0, res = []) => {
    return new Promise((resolve, reject) => {
        
        axios.get(url, {
            params: {
            offset,
            }
        })
        .then(({data}) => {
            const tmpRes = serviceParser.parseEpisodePage(data);
            res = _.concat(res, tmpRes);
    
            if (tmpRes.length) {
                searchPage(url, offset + 100, res)
                .then((data) => resolve(data))
                .catch(/* istanbul ignore next */ error => reject(error));
            } else {
                resolve(res);
            }
        })
        .catch(/* istanbul ignore next */ error => reject(error));
    });
}
