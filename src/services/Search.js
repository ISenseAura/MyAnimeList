const axios = require('axios');

const MY_ANIME_LIST_SEARCH_URI = 'https://myanimelist.net/search/prefix.json';
const MY_ANIME_LIST_DEFAULT_TYPE = 'anime';

/** 
 * Take a name and a type and return a array of object in connection with the name
 * @name searchResultsWhereNameAndType
 * @function
 * @param {string} name - a title or a keyword in connection with the search
 * @param {string} type - can take only 2 values 'anime' & 'manga'
 * 
 * @returns {Object[]} a array of object in connection with the search
 */
exports.searchResultsWhereNameAndType = (name, type = MY_ANIME_LIST_DEFAULT_TYPE) => {
    return new Promise((resolve, reject) => {
        if (!name) throw new Error('[ERROR] searchResultsWhereNameAndType: name must be not null');

        axios.get(MY_ANIME_LIST_SEARCH_URI, {
            params: {
                type,
                keyword: name,
            },
        })
        .then(({data}) => {
            
            const results = [];
            data.categories.forEach(element => {
                element.items.forEach(item => results.push(item))
            });

            resolve(results);
        })
        .catch(error => reject(error));
    });
}
