const { postitem } = require("../models/category");
const messageschema = require("../models/messages");
const Notification = require("../models/NotificationSchema");
require("dotenv").config({ path: "../../.env" });
const { requireSignin, userMiddleware } = require("../middleware");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");


const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/postitem",
  requireSignin,
  userMiddleware,
  upload.array("itemPictures"),
  async (req, res) => {
    console.log("Hitted the POST successfully ");
    try {
      const { name, description, question, type } = req.body;
      let itemPictures = [];
      if (req.files && req.files.length > 0) {
        itemPictures = req.files.map((file) => {
          return {
            contentType: file.mimetype,
            data: file.buffer.toString("base64"),
          };
        });
      }

      const newPost = await postitem.create({
        name: name,
        description: description,
        question: question,
        type: type,
        createdBy: req.user._id,
        itemPictures: itemPictures,
      });

      // Create a new notification for this item
      const newNotification = await Notification.create({
        itemId: newPost._id,
        type: type === "Lost It" ? "lost" : "found",
      });

      newPost.save((error, item) => {
        if (error) return res.status(400).json({ error });
        if (item) return res.status(201).json({ item, notification: newNotification });
      });
    } catch (err) {
      console.log("Error:", err);
      res.status(401).json({ message: err.message });
    }
  }
);

router.get("/getitem", (req, res) => {
  postitem.find({}, (err, postitems) => {
    if (err) return res.status(400).json({ error: err });
    if (postitems) {
      res.status(200).json({ postitems });
    }
  });
});

router.get("/item/:id", (req, res) => {
  const { id } = req.params;
  // console.log(id)
  postitem.find({ _id: id }).exec((err, item) => {
    if (err) return res.status(400).json({ Error: err });
    // console.log(item)
    messageschema.find({ itemId: item[0]._id }).exec((err, answers) => {
      if (err) return res.status(400).json({ Error: err });

      // console.log(answers)
      res.status(200).json({
        Item: item,
        Answers: answers,
      });
    });
  });
});

router.post("/deleteitem", async (req, res) => {
  const { item_id } = req.body;
  console.log("Item id is :", item_id);
  const deleteitem = await postitem.findOneAndDelete({ _id: item_id });
  const deletemsgs = await messageschema.deleteMany({ itemId: item_id });

  res.status(200).json({
    body: req.body,
  });
});

router.get("/getnumber/:id", (req, res) => {
  const { id } = req.params;
  console.log("Id is :", id);
  SignUp.find({ _id: id }).exec((err, user) => {
    res.status(200).json({
      Number: user[0].number,
    });
  });
});

router.get("/getquestion/:id", (req, res) => {
  const { id } = req.params;
  console.log("Id is :", id);
  postitem.find({ _id: id }).exec((err, item) => {
    if (err) return res.status(400).json({ Error: err });

    // console.log(item)
    // console.log(item[0].createdBy)
    const createdBy = item[0].createdBy;
    SignUp.find({ _id: createdBy }).exec((err, user) => {
      res.status(200).json({
        Question: user[0].number,
      });
    });
  });
});

router.post("/submitAnswer", async (req, res) => {
  console.log(req.body);
  const { itemId, question, answer, location, givenBy, belongsTo } = req.body;
  

  const newmessage = await messageschema.create({
    itemId: itemId,
    belongsTo: belongsTo,
    question: question,
    answer: answer,
    location: location,
    givenBy: givenBy,
  });
  newmessage.save((error, item) => {
    if (error) return res.status(400).json({ error });
    if (item) return res.status(201).json({ item });
  });
});

router.get("/myresponses/:id", (req, res) => {
  const { id } = req.params;
  console.log("Used Id is :", id);
  messageschema.find({ givenBy: id }).exec((err, item) => {
    if (err) return res.status(400).json({ Error: err });

    console.log(item);
    res.status(200).json({
      item: item,
    });
  });
});

router.get("/mylistings/:id", (req, res) => {
  const { id } = req.params;
  console.log("Used Id is :", id);
  postitem.find({ createdBy: id }).exec((err, item) => {
    if (err) return res.status(400).json({ Error: err });

    // console.log(item)
    res.status(200).json({
      item: item,
    });
  });
});


router.get("/notifications/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const notifications = await Notification.find({
      "viewedBy.userId": { $ne: userId },
      status: true,
    }).populate("itemId");

    res.status(200).json({ notifications });
  } catch (err) {
    console.log("Error fetching notifications:", err);
    res.status(500).json({ error: "Could not fetch notifications" });
  }
});


router.post("/notification/respond", async (req, res) => {
  const { notificationId, userId, response } = req.body;

  try {
    const notification = await Notification.findById(notificationId);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    // Update or add the user's response in the `viewedBy` array
    const userResponse = notification.viewedBy.find(
      (view) => view.userId.toString() === userId
    );

    if (userResponse) {
      userResponse.status = response;
    } else {
      notification.viewedBy.push({ userId, status: response });
    }

    // Save the updated notification
    await notification.save();
    res.status(200).json({ message: "Response recorded" });
  } catch (err) {
    console.log("Error updating notification:", err);
    res.status(500).json({ error: "Could not update notification" });
  }
});

router.get("/notifications", async (req, res) => {
  try {
    const notifications = await Notification.find()
      .populate("itemId") 
      .sort({ createdAt: -1 }); 

    res.status(200).json({ notifications });
  } catch (error) {
    console.error("Error fetching all notifications:", error);
    res.status(500).json({ error: "Could not fetch notifications" });
  }
});


router.post("/confirmResponse/:id", (req, res) => {
  const { id } = req.params;
  // console.log("Used Id is :",id)
  console.log(id);
  console.log(req.body);
  messageschema.updateOne(
    { _id: id },
    { $set: { response: req.body.response } },
    { upsert: false },
    (err, updatedMessage) => {
      if (err) return res.status(400).json({ msg: err });

      res.status(200).json({ msg: "Updated" });
    }
  );
});
module.exports = router;