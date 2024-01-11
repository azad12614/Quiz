const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const router = express.Router();

const questionSchema = require("../collectionSchemas/questionSchema.js");
const Question = new mongoose.model("Question", questionSchema);

router.post("/upload", async (req, res) => {
  const newQuestion = new Question(req.body);
  await newQuestion
    .save()
    .then(() => {
      res.status(200).json(`Question uploaded`);
    })
    .catch(() => {
      res.status(400).json({
        error: "Oops! Something went wrong!",
      });
    });
});
router.put("/:id", async (req, res) => {
  await Question.updateOne(
    { _id: req.params.id },
    {
      $push: { answers: req.body.answer },
    }
  )
    .then(() => {
      res.status(200).json(`Question Answered`);
      console.log(`Question Answered = ${req.body.answer}`);
    })
    .catch(() => {
      res.status(400).json({
        error: "Oops! Something went wrong!",
      });
    });
});
router.get("/", async (req, res) => {
  const arr = await Question.find({})
    .select({ answers: 0 })
    .then((data) => res.json(data));
});
router.get("/:answer/:id", async (req, res) => {
  const arr = await Question.findOne({ _id: req.params.id });
  //   const uniqueAnswers = [...new Set(arr)];
  const count =
    (arr.answers.filter((el) => el === req.params.answer).length * 100) /
    arr.answers.length;
  //   const count = uniqueAnswers.map((element) => [
  //     element,
  //     arr.filter((el) => el === element).length*100/arr.length,
  //   ]);
  if (count < 40 && count >= 0)
    res.json({
      result: "You're answer is unique. Less people matches to your answer",
      count,
      category: "UNDER",
    });
  else if (count >= 40 && count <= 60)
    res.json({
      result: "Many people think like you",
      count,
      category: "LIKE OTHERS",
    });
  else if (count < 60 )
    res.json({ result: "Almost Everyone think like you", count, category: "UPPER" });
  else if (count == 100)
    res.json({ result: "Everyone think like you", count, category: "UPPER" });
});

// export the router
module.exports = router;
