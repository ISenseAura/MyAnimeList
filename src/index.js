const { searchResultsWhereNameAndType } = require('./services/Search');
const { getInfoFromName, getInfoFromURL } = require('./services/Info');

module.exports = {
    searchResultsWhereNameAndType,
    getInfoFromName,
    getInfoFromURL,
};
