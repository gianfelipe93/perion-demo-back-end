require('dotenv').config()
const axios = require('axios');

const { STEAM_KEY } = process.env

const STEAM_BASE_API_URL = `http://api.steampowered.com`

const getGames = async (steamId) => {
  const STEAM_API_URL = `${STEAM_BASE_API_URL}/IPlayerService/GetOwnedGames/v0001/?key=${STEAM_KEY}&steamid=${steamId}&format=json&include_appinfo=true&include_played_free_games=true`

  const apiResponse = await axios.get(STEAM_API_URL)

  return apiResponse.data.response
}

const getSteamUser = async (steamId) => {
  const STEAM_API_URL = `${STEAM_BASE_API_URL}/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_KEY}&steamids=${steamId}`

  const apiResponse = await axios.get(STEAM_API_URL)

  return apiResponse.data.response.players[0]
}

module.exports = { getGames, getSteamUser }