const express = require("express")
const handleGetUser = require("../../core/core_user")
const Router = express.Router()

Router.get('/:steamId', handleGetUser)

module.exports = Router