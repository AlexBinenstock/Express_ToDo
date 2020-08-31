const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
var todo = [];

/* GET todo list. */

router.get("/", function (req, res, next) {
  res.json(todo);
});

/* POST todo item. */

router.post("/", function (req, res) {
  //Make sure there is an item to add:
  if (!req.body.text) {
    res.status(400);
    res.json({ message: "Bad Request" });
  } else {
    const newId = uuidv4();
    todo.push({
      id: newId,
      text: req.body.text,
      isDone: false,
    });
    res.json({
      message: "New to-do item created.",
      location: "/todo/" + newId,
      todo,
    });
  }
});

/* PUT todo item. */

router.put("/:id", function (req, res) {
  //Make sure we've been passed an id so we have an item to change:
  if (!req.body.id) {
    res.status(400);
    res.json({ message: "Bad Request, missing required data" });
  } else {
    //Gets us the index of todo item with given id.
    var updateIndex = todo.findIndex((todoItem) => todoItem.id === req.body.id);
    if (updateIndex === -1) {
      //Todo item not found
      res.json({ message: "Bad Request, item not found" });
    } else {
      //Update existing toDo
      todo[updateIndex].isDone = req.body.isDone;
      res.json({
        message: "Todo id " + req.body.id + " updated.",
        location: "/todo/" + req.body.id,
        todo,
      });
    }
  }
});

/* DELETE todo item. */

router.delete("/:id", function (req, res) {
  var removeIndex = todo.findIndex((todoItem) => todoItem.id === req.params.id);

  if (removeIndex === -1) {
    res.json({ message: "Not found" });
  } else {
    todo.splice(removeIndex, 1);
    res.json({ message: "todo item id " + req.params.id + " removed.", todo });
  }
});

module.exports = router;
