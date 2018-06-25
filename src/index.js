const { searchResultsWhereNameAndType } = require('./services/Search');
const { getInfoFromName, getInfoFromURL } = require('./services/Info');
const { getSeasons } = require('./services/Season');
const { getEpisodesList } = require('./services/Episode');

module.exports = {
    searchResultsWhereNameAndType,
    getInfoFromName,
    getInfoFromURL,
    getSeasons,
    getEpisodesList,
};
