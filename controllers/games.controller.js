"use strict";
const model = require("../models/games.model");

function getAll(req, res, next) {
  try {
    //res.json(model.getAll());
    req.session.returnTo = req.originalUrl;
    let gamesList = model.getAll();
    res.render("games", { gamesList: gamesList, title: "All Games", user: req.user });
  } catch (err) {
    console.error("Error while getting games ", err.message);
    next(err);
  }
}

function getAllByOneAttribute(req, res, next) {
  let attribute = req.query.attribute;
  let value = req.query.value;
  if (attribute && value) {
    try {
      // res.json(model.getAllByOneAttribute(attribute, value));
      let gamesList = model.getAllByOneAttribute(attribute, value);
      res.render("games", { gamesList: gamesList, title: value + " Games", user: req.user  });
    } catch (err) {
      console.error("Error while getting games: ", err.message);
      next(err);
    }
  }
  else {
    res.status(400).send("Invalid Request");
  }
}

function getOneById(req, res, next) {
  try {
    // res.json(model.getOneById(req.params.id));
    let game = model.getOneById(req.params.id);
    res.render("game-details", { game: game, title: 'Game  #' + req.params.id,  user: req.user  });
  } catch (err) {
    console.error("Error while getting games: ", err.message);
    next(err);
  }
}

function deleteGame(req, res, next) {
  try {
    model.deleteGame(req.params.id);
    // res.json(model.getAll());
    res.render("games", { gamesList: model.getAll(), title: "All Games",  user: req.user  });
  } catch (err) {
    console.error("Error while getting games: ", err.message);
    next(err);
  }
}

function createNew(req, res, next) {
  let name = req.body.name;
  let platform = req.body.platform;
  let release_year = parseInt(req.body.release_year);
  let genre = req.body.genre;
  let publisher = req.body.publisher;
  let developer = req.body.developer;
  let rating = req.body.rating;

  if (name && platform && release_year && genre && publisher && developer && rating) {
    let params = [name, platform, release_year, genre, publisher, developer, rating];
    try {
      // res.json(model.createNew(params));
      model.createNew(params);
      res.render("games", { gamesList: model.getAll(), title: "All Games",  user: req.user  });
    } catch (err) {
      console.error("Error while creating game: ", err.message);
      next(err);
    }
  }
  else {
    res.status(400).send("Invalid Request");
  }
}

module.exports = {
  getAll,
  getAllByOneAttribute,
  getOneById,
  deleteGame,
  createNew
};
