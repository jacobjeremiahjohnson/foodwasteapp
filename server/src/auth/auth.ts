import express from "express";

const router = express.Router();

router.post("/create-account", (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
});

module.exports = router;