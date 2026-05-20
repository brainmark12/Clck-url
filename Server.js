const express = require("express");
const mongoose = require("mongoose");
const shortid = require("shortid");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const UrlSchema = new mongoose.Schema({
  original: String,
  short: String,
  clicks: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Url = mongoose.model("Url", UrlSchema);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/shorten", async (req, res) => {
  try {
    const { original, custom } = req.body;

    let short = custom || shortid.generate();

    const existing = await Url.findOne({ short });

    if (existing) {
      return res.json({
        error: "Custom link already exists",
      });
    }

    const newUrl = await Url.create({
      original,
      short,
    });

    res.json({
      success: true,
      shortUrl: `${req.protocol}://${req.get("host")}/${newUrl.short}`,
    });

  } catch (err) {
    res.json({ error: "Server error" });
  }
});

app.get("/analytics/:short", async (req, res) => {
  const url = await Url.findOne({ short: req.params.short });

  if (!url) {
    return res.json({ error: "Not found" });
  }

  res.json({
    original: url.original,
    short: url.short,
    clicks: url.clicks,
    createdAt: url.createdAt,
  });
});

app.get("/:short", async (req, res) => {
  const url = await Url.findOne({
    short: req.params.short,
  });

  if (url) {
    url.clicks += 1;
    await url.save();

    res.redirect(url.original);
  } else {
    res.send("Link not found");
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});
