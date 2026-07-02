const redis = require("../config/redis")

async function redisGetOrSet(key, cb, exp= 3600){
    let cacheData = await redis.get(key)
    if(cacheData){
        console.log(`Cache Hit: ${key}`)
        return cacheData
    }
    console.log(`Cache Miss: ${key}`)

    const cacheLock = await redis.set(
        `lock:${key}`,
        "locked",
    {
        nx: true,
        ex: 30
    });
    
    if(cacheLock){
        try{
            console.log(`${key} locked`)
            const newData = await cb();
            await redis.set(key, newData, {
                ex: exp
            });
            return newData
        }finally{
            await redis.del(`lock:${key}`)
            console.log(`${key} unlocked`)
        }
    }

    console.log("Waiting for cache...")
    for(let i = 0; i<20; i++){
        await new Promise(resolve =>{
            setTimeout(resolve, 100)
        })

        cacheData = await redis.get(key)
        if(cacheData){
            return cacheData
        }
    }
    console.log("Fallback rebuild...")
    return await cb();
  
}
module.exports = redisGetOrSet;