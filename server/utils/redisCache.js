const redis = require("../config/redis")

async function redisGetOrSet(key, cb, exp= 3600){
    const cacheData = await redis.get(key)
    if(cacheData){
        console.log(`Cache Hit: ${key}`)
        return cacheData
    }
    console.log(`Cache Miss: ${key}`)
    const newData = await cb();
    await redis.set(key, newData, {
        ex: exp
    });
    return newData   
}
module.exports = redisGetOrSet;