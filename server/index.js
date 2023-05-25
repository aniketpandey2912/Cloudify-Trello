require("dotenv").config();

const port = process.env.PORT;
const APIKey = process.env.APIKey;
const token = process.env.TOKEN;

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/formdata", async (req, res) => {
  let { name, description, dueDate, startDate } = req.body;

  // console.log({ name, description, dueDate, startDate });
  try {
    let response = await axios.post(
      `https://trello.com/1/cards?idList=646f384f8b7f240aa12aab03&key=${APIKey}&token=${token}`,
      {
        name: name,
        desc: description,
        due: dueDate,
        start: startDate,
      }
    );

    if (response.status === 200) {
      let card = res.data;
      // console.log("Card created :", card);
      res.sendStatus(200);
    } else {
      throw new Error("Failed to create card");
    }
  } catch (err) {
    // console.log(err);
    res.sendStatus(500);
  }
});

app.listen(port || 3001, () => {
  console.log("Server running at port", port || 3001);
});
