const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
const serviceEpisode = require('../../src/services/Episode');

const NAME_NULL = null;
const NAME_FALSE = 6;
const NAME_TRUE = 'Samurai Champloo';

const OBJECT_NULL = null;
const OBJECT_INVALID = { id: -2, name: '_'};
const OBJECT_INVALID_NUMBER = { id: 205, name: 6};
const OBJECT_TRUE = { id: 205, name: 'Samurai Champloo'};

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe('Episode', () => {
    
    describe('#getEpisodesList', () => {
        it('should throw a Error', () => {
            return serviceEpisode.getEpisodesList(NAME_NULL).should.be.rejectedWith(Error);
        })

        it('should throw a Error', () => {
            return serviceEpisode.getEpisodesList(NAME_FALSE).should.be.rejectedWith(Error);
        })
        
        it('should return a object', () => {
            return serviceEpisode.getEpisodesList(NAME_TRUE).should.be.fulfilled;
        })

        it('should throw a Error', () => {
            return serviceEpisode.getEpisodesList(OBJECT_NULL).should.be.rejectedWith(Error);
        })

        it('should throw a Error', () => {
            return serviceEpisode.getEpisodesList(OBJECT_INVALID).should.be.rejectedWith(Error);
        })
        
        it('should throw a Error', () => {
            return serviceEpisode.getEpisodesList(OBJECT_INVALID_NUMBER).should.be.rejectedWith(Error);
        })

        it('should return a object', () => {
            return serviceEpisode.getEpisodesList(OBJECT_TRUE).should.be.fulfilled;
        })
    });
});
