import express from "express";
const router = express.Router();
import mongoose from "mongoose";

/*
    Models for making calls to database should be added here, ex:
    const ModelName = mongoose.model('ModelName');
*/

/* Add routes here */
router.get("/some-route", async (req, res) => {
    res.send("I'm alive");
});

export { router };
