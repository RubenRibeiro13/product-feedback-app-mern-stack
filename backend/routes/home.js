const router = require("express").Router();
const ProductRequest = require("../models/productRequestModel");

router.get("/suggestions", async (req, res) => {
    const productRequests = await ProductRequest.find({});
    res.json(productRequests);
});

router.get("/roadmap", async (req, res) => {
    const productRequests = await ProductRequest.find({status: {$ne: "suggestion"}});
    res.json(productRequests);
});

/* router.get("/new-feedback", (req, res) => {

}); */

/* router.post("/new-feedback", async (req, res) => {
    const {title, category, description} = req.body;
    const id = await ProductRequest.find({}).length + 1;
    const [upvotes, status, comments] = [0, "Planned", []];

    try {
        await ProductRequest.create({id, title, category, upvotes, status, description, comments});
        res.redirect("/");
    } catch(error) {

    }
}); */

module.exports = router;