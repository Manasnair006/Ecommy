const redisGetOrSet = require("./redisCache")
const buildHomeData = require("./homeService");

async function cacheWarmer(){
    try{
        console.log("Caching up homepage....")
        await redisGetOrSet("home", buildHomeData)
        console.log("Homepage cached...!")
    }catch(err){
        console.log(err)
    }
}

module.exports = cacheWarmer;