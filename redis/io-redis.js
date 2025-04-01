const Redis = require('ioredis');

const redis = new Redis();

const ioRedisDemo = async () => {
  try {
    await redis.set('key', 'value');
    const val = await redis.get('key');

    console.log(val);
  } catch (error) {
    console.error(error);
    redis.quit();
  }
};

ioRedisDemo();
