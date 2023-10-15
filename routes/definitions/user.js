const express = require("express")
const { handleGetUser, handleGetAchievements } = require("../../core/core_user")
const Router = express.Router()

Router.get('/:steamId', handleGetUser)
Router.get('/:steamId/games/:gameId/achievements', handleGetAchievements)

module.exports = Router