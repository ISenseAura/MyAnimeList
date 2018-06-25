const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
const serviceInfo = require('../../src/services/Info');

const URL_NULL = null;
const URL_FALSE = 'https://google.com?q=Samurai_Champloo';
const URL_TRUE = 'https://myanimelist.net/anime/205/Samurai_Champloo';
const URL_NO_RESULT = 'https://myanimelist.net/anime/_';

const NAME_NULL = null;
const NAME_TRUE = 'Samurai Champoo';
const NAME_FALSE = '_';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe('Info', () => {
    
    describe('#getInfoFromURL', () => {
        it('should throw a Error', () => {
            return serviceInfo.getInfoFromURL(URL_NULL).should.be.rejectedWith(Error);
        })

        it('should throw a Error', () => {
            return serviceInfo.getInfoFromURL(URL_FALSE).should.be.rejectedWith(Error);
        })

        it('should throw a Error', () => {
            return serviceInfo.getInfoFromURL(URL_NO_RESULT).should.be.rejectedWith(Error);
        })

        it('should return a object', () => {
            return serviceInfo.getInfoFromURL(URL_TRUE).should.be.fulfilled;
        })

    });
    
    describe('#getInfoFromName', () => {

        it('should throw a Error', () => {
            return serviceInfo.getInfoFromName(NAME_NULL).should.be.rejectedWith(Error);
        })

        it('should throw a Error', () => {
            return serviceInfo.getInfoFromName(NAME_FALSE).should.be.rejectedWith(Error);
        })

        it('should return a object', () => {
            return serviceInfo.getInfoFromName(NAME_TRUE).should.be.fulfilled;
        })
    });

});
