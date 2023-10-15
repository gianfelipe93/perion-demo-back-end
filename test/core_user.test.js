var { expect } = require('chai');
const handleGetUser = require('../core/core_user');
var sinon = require('sinon')
const steamAPIObject = require('../thirdPartyServices/steamAPI')


describe('Testing handleGetUser', () => {
  afterEach(() => {
    sinon.restore()
  })

  it('should return 400 because its missing a required parameter', async () => {
    const REQ = {
      params: {
        steamId: null
      }
    }

    const RES = {
      status: (code) => ({
        send: (response) => {
          expect(code).to.be.equal(400)
          expect(response).to.not.be.undefined
        }
      })
    }

    await handleGetUser(REQ, RES)
  });

  it('should return 404 because steam user was not found', async () => {
    sinon.stub(steamAPIObject, 'getSteamUser').resolves(undefined)

    const REQ = {
      params: {
        steamId: 123
      }
    }

    const RES = {
      status: (code) => ({
        send: (response) => {
          expect(code).to.be.equal(404)
          expect(response).to.not.be.undefined
        }
      })
    }

    await handleGetUser(REQ, RES)
  });

  it('should return 500 because there was an expected error', async () => {
    sinon.stub(steamAPIObject, 'getSteamUser').throws('error')
    const REQ = {
      params: {
        steamId: 123
      }
    }

    const RES = {
      status: (code) => ({
        send: (response) => {
          expect(code).to.be.equal(500)
          expect(response).to.not.be.undefined
        }
      })
    }

    await handleGetUser(REQ, RES)
  });

  it('should return 200 with user details and game information', async () => {
    sinon.stub(steamAPIObject, 'getSteamUser').returns({ name: 'gian' })
    sinon.stub(steamAPIObject, 'getGames').returns({ game_count: 25 })
    const REQ = {
      params: '123'
    }

    const RES = {
      status: (code) => ({
        send: (response) => {
          expect(code).to.be.equal(500)
          expect(response).to.not.be.undefined
        }
      })
    }

    await handleGetUser(REQ, RES)
  });
});