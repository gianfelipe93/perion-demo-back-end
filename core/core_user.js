const steamAPI = require("../thirdPartyServices/steamAPI")

const handleGetUser = async (req, res) => {
  try {
    const { steamId } = req.params

    if (!steamId) {
      return res.status(400).send('Missing steamId')
    }

    const steamUser = await steamAPI.getSteamUser(steamId)

    if (!steamUser) {
      return res.status(404).send(`SteamId not found. Please confirm you've entered the correct steamId`)
    }

    const userGames = await steamAPI.getGames(steamId)

    return res.status(200).send({ userDetails: steamUser, userGames })
  } catch (error) {
    console.log(`Error in handleGetGames: ${error}`)
    return res.status(500).send(`An error occurred while getting your steam information`)
  }
}

module.exports = handleGetUser