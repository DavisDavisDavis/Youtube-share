import express from "express";
const router = express.Router();
import mongoose from "mongoose";

/*
    Models for making calls to database should be added here, ex:
    const ModelName = mongoose.model('ModelName');
*/

const video = mongoose.model("Video");

/* Add routes here */
router.get("/entries", async (req, res) => {
  const videos = await video.find().sort({
    name: "ascending",
  });

  res.json(videos);
});

router.post("/entries", async (req, res) => {
  const { comment, name, response, youtubeId } = req.body;
  const newVideo = new video({
    comment,
    name,
    youtubeId,
  });

  const r = await newVideo.save();
  res.send(r);
});

router.delete("/entries/:id", async (req, res) => {
  const id = req.body.id;
  console.log("This is the id: " + id);

  video.deleteOne({ _id: id }, function (err, docs) {
    if (err) {
      res.send("wront id 404! 😖");
    } else {
      res.json(docs);
    }
  });
});

export { router };
