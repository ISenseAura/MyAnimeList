const axios = require('axios');
const match = require('match-sorter');

const serviceParser = require('./Parser');
const serviceSearch = require('./Search');

/** 
 * Take a url and return a object with all informations about that manga or anime
 * @name getInfoFromURL
 * @function
 * @param {string} url of a anime or manga
 * 
 * @returns {Object} a object with all informations about that manga or anime
 */
exports.getInfoFromURL = (url) => {
    return new Promise((resolve, reject) => {
        if (!url || typeof url !== 'string' || !url.toLocaleLowerCase().includes('myanimelist') ) throw new Error('[ERROR] getInfoFromURL: Invalid url');

        axios.get(url)
        .then(({data}) => {

            const results = serviceParser.parsePage(data);        
            resolve(results);
        })
        .catch(error => reject(error));
    });
}

/** 
 * Take a name and return a object with all informations about that manga or anime
 * @name getInfoFromName
 * @function
 * @param {string} name of a anime or manga
 * 
 * @returns {Object} a object with all informations about that manga or anime
 */
exports.getInfoFromName = (name) => {
    return new Promise((resolve, reject) => {
        if (!name || typeof name !== 'string') throw new Error('[ERROR] getInfoFromName: Invalid name');
        
        serviceSearch.searchResultsWhereNameAndType(name)
            .then(async (items) => {
            try {
                const bestMacth = match(items, name, { keys: ['name'] })[0];
                const url = bestMacth ? bestMacth.url : items[0].url;
                const result = await this.getInfoFromURL(url);

                result.url = url;
                resolve(result);
            } catch (error) {
                reject(error);
            }
        })
        .catch(/* istanbul ignore next */ error => reject(error)); 
    })
}
