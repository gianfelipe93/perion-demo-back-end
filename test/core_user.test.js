var { expect } = require('chai');
const { handleGetUser, mergeStats } = require('../core/core_user');
var sinon = require('sinon')
const steamAPIObject = require('../thirdPartyServices/steamAPI')

describe('Testing mergeStats', () => {
  it('should return a proper array', async () => {
    const globalStats = [
      {
        "name": "use_gas_station",
        "percent": 72.9000015258789063
      },
      {
        "name": "use_rest_stop",
        "percent": 68.6999969482421875
      }]

    const userAchievements = [
      {
        "apiname": "use_rest_stop",
        "achieved": 0,
        "unlocktime": 0,
        "name": "I Am a GPS",
        "description": "Discover more than 60% of the map"
      },
      {
        "apiname": "use_gas_station",
        "achieved": 0,
        "unlocktime": 0,
        "name": "Pathfinder",
        "description": "Discover 100% of the map"
      }]

    const expectedResult = [
      {
        "apiname": "use_rest_stop",
        "achieved": 0,
        "unlocktime": 0,
        "name": "I Am a GPS",
        "description": "Discover more than 60% of the map",
        "percent": "68.70"
      }, {
        "apiname": "use_gas_station",
        "achieved": 0,
        "unlocktime": 0,
        "name": "Pathfinder",
        "description": "Discover 100% of the map",
        "percent": "72.90"
      }
    ]

    const result = mergeStats(userAchievements, globalStats)

    expect(result).to.deep.equal(expectedResult)
  });
});


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
    sinon.stub(steamAPIObject, 'getSteamUser').returns(null)

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