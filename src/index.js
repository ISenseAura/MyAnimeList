const { searchResultsWhereNameAndType } = require('./services/Search');
const { getInfoFromName, getInfoFromURL } = require('./services/Info');
const { getSeasons } = require('./services/Season');

module.exports = {
    searchResultsWhereNameAndType,
    getInfoFromName,
    getInfoFromURL,
    getSeasons,
};
