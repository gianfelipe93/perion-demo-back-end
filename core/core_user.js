const { sortBy } = require("lodash")
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

const handleGetAchievements = async (req, res) => {
  try {
    const { gameId, steamId } = req.params

    if (!gameId || !steamId) {
      return res.status(400).send('Missing required param')
    }

    const achievements = await steamAPI.getAchievements(steamId, gameId)
    const globalStats = await steamAPI.getGlobalStats(gameId)

    const mergedStats = mergeStats(achievements, globalStats)
    const sortedStats = sortBy(mergedStats, ['achieved', 'percent']).reverse()

    return res.status(200).send(sortedStats)
  } catch (error) {
    console.log(`Error in handleGetAchievements: ${error}`)

    if (error?.response?.status === 403) {
      return res.status(403).send(`This user's profile is private. Please make your profile public to view your achievements`)
    }

    return res.status(500).send(`An error occurred. Please try again later.`)
  }
}

const mergeStats = (userAchievements = [], globalStats = []) => {
  const mergedStats = userAchievements.map(achievement => {
    const globalAchievement = globalStats.find(globalAchievement => globalAchievement.name.toLowerCase() === achievement.apiname.toLowerCase())

    return {
      ...achievement,
      percent: parseFloat(globalAchievement?.percent || 0).toFixed(2)
    }
  })

  return mergedStats
}

module.exports = { handleGetUser, handleGetAchievements, mergeStats }