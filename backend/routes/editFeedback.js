const router = require("express").Router();
const ProductRequest = require("../models/productRequestModel");

/* router.get("/", async (req, res) => {
    const productRequests = await ProductRequest.find({});
    res.json(productRequests);
}); */

router.delete("/:suggestionId", async (req, res) => {
    const productRequest = await ProductRequest.findByIdAndDelete(req.params.suggestionId);
    res.json(productRequest);
});

router.patch("/:suggestionId", async (req, res) => {
    const productRequest = await ProductRequest.findByIdAndUpdate(req.params.suggestionId, req.body, {new: true});
    res.json(productRequest);
});

module.exports = router;