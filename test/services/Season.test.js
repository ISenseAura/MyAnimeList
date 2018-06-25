const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
const serviceSeason = require('../../src/services/Season');

const SEASON_NULL = null;
const SEASON_FALSE = 'fuyu';
const SEASON_TRUE = 'summer';

const YEAR_NULL = null;
const YEAR_FALSE = 1600;
const YEAR_TRUE = 2018;

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe('Season', () => {
    
    describe('#getSeasons', () => {
        it('should throw a Error', () => {
            return serviceSeason.getSeasons(YEAR_NULL, SEASON_TRUE).should.be.rejectedWith(Error);
        })

        it('should throw a Error', () => {
            return serviceSeason.getSeasons(YEAR_FALSE, SEASON_TRUE).should.be.rejectedWith(Error);
        })
        
        it('should throw a Error', () => {
            return serviceSeason.getSeasons(YEAR_TRUE, SEASON_NULL).should.be.rejectedWith(Error);
        })

        it('should throw a Error', () => {
            return serviceSeason.getSeasons(YEAR_TRUE, SEASON_FALSE).should.be.rejectedWith(Error);
        })

        it('should return a object', () => {
            return serviceSeason.getSeasons(YEAR_TRUE, SEASON_TRUE).should.be.fulfilled;
        })
    });
});
