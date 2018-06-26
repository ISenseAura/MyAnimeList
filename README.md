# MyAnimeList

[![Build Status](https://travis-ci.org/SombreroElGringo/MyAnimeList.svg?branch=master)](https://travis-ci.org/SombreroElGringo/MyAnimeList)
[![codecov](https://codecov.io/gh/SombreroElGringo/MyAnimeList/branch/master/graph/badge.svg)](https://codecov.io/gh/SombreroElGringo/MyAnimeList)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

A web scraper for myanimelist.net allowing you to recover any information on your favorite animes or mangas.

## Install

Terminal:
```shell
$ npm install --save myanimelists
```

Node.js:
```js
  // Load the full build
  const myanimelist = require('myanimelists');
  
  // Load the method build
  const { getSeasons } = require('myanimelists');
```


## Methods

That method return a list of anime or manga in connection with the name specified.

### searchResultsWhereNameAndType(name, type?)

| Params | Type | Description |
| --- | --- | --- |
| name | string | The name or a keyword in connection with the anime or manga |
| type | string | 'manga' or 'anime', default value equal to 'anime' |

#### Example

```js
  const { searchResultsWhereNameAndType } = require('myanimelists');
  
  searchResultsWhereNameAndType('meagalobox', 'anime')
    .then(result => console.log(result))
    .catch(error => console.log(error));
    
```

### getInfoFromName(name)

That method get all informations about the anime specified.

| Params | Type | Description |
| --- | --- | --- |
| name | string | The name of the anime to search, the best match will be returned |

#### Example

```js
  const { getInfoFromName } = require('myanimelists');
  
  getInfoFromName('Samurai Champloo')
    .then(result => console.log(result))
    .catch(error => console.log(error));
    
```

### getInfoFromURL(url)

That method get all informations about the anime specified.

| Params | Type | Description |
| --- | --- | --- |
| url | string | The URL of the anime |

#### Example

```js
  const { searchResultsWhereNameAndType } = require('myanimelists');
  
  searchResultsWhereNameAndType('https://myanimelist.net/anime/205/Samurai_Champloo', 'anime')
    .then(result => console.log(result))
    .catch(error => console.log(error));
    
```

### getSeasons(year, season)

That method get the list of anime, OVAs, ONAs, movies and specials released or planned to be released during the season of the specified year.

| Params | Type | Description |
| --- | --- | --- |
| year | number | The year |
| season | string | The season must be `summer`, `fall`, `winter`or `spring` |

#### Example

```js
  const { getSeasons } = require('myanimelists');
  
  getSeasons(2018, 'summer')
    .then(result => console.log(result))
    .catch(error => console.log(error));
    
```

### getEpisodesList(obj)

That method get the list of all episode of the anime specified.

| Params | Type | Description |
| --- | --- | --- |
| year | Object or string | If an object, it must have a name and a id properties, else just pass the name of the anime |

#### Example

```js
  const { getEpisodesList } = require('myanimelists');
  
  // If param is a string 
  const obj = 'Samurai Champloo';
  getEpisodesList(obj)
    .then(result => console.log(result))
    .catch(error => console.log(error));
    
  // If param is an object
  const obj = { id: 205, name: 'Samurai Champloo' };
  getEpisodesList(obj)
    .then(result => console.log(result))
    .catch(error => console.log(error));
    
```

## License

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
