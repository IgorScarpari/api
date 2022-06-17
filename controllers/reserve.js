const Reserve = require("../models/reserve");

//GET: Search all reserves.
exports.findAll = async (req, res) => {
    try {
        const reserves = await Reserve.find({
            order: [["name", "ASC"]],
            raw: true,
        });
        res.json(reserves);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};