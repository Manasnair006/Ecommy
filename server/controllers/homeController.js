const redisGetOrSet = require("../services/redisCache");
const buildHomeData = require("../services/homeService");

exports.getHomeData = async (req, res) => {
    try {

        const homeData = await redisGetOrSet("home", buildHomeData);

        res.json(homeData);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }
};