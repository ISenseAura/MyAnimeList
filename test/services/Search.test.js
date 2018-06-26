const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
const serviceSearch = require('../../src/services/Search');

const NAME_NULL = null;
const NAME_TRUE = 'Samurai Champoo';
const NAME_FALSE = '_';

const TYPE_NULL = null;
const TYPE_TRUE = 'manga';
const TYPE_FALSE = 'anim';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe('Search', () => {
    describe('#searchResultsWhereNameAndType', () => {

        it('should throw a Error', () => {
            return serviceSearch.searchResultsWhereNameAndType(NAME_NULL).should.be.rejectedWith(Error);
        })

        it('should throw a Error', () => {
            return serviceSearch.searchResultsWhereNameAndType(NAME_NULL, TYPE_NULL).should.be.rejectedWith(Error);
        })

        it('should throw a Error', () => {
            return serviceSearch.searchResultsWhereNameAndType(NAME_NULL, TYPE_FALSE).should.be.rejectedWith(Error);
        })

        it('should throw a Error', () => {
           return serviceSearch.searchResultsWhereNameAndType(NAME_FALSE, TYPE_FALSE).should.be.rejectedWith(Error);
        })
        
        it('should return a empty Array', () => {
            return serviceSearch.searchResultsWhereNameAndType(NAME_FALSE).should.be.eventually.deep.equal([]);
        })

        it('should return a Array', () => {
            return serviceSearch.searchResultsWhereNameAndType(NAME_TRUE, TYPE_TRUE).should.be.eventually.to.have.length.above(0);
        })
    })
})
