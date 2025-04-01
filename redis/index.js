const redis = require('redis');

const client = redis.createClient({
  host: 'localhost',
  port: 6379,
});

// Event listener
client.on('Error', (error) =>
  console.log('Redis client error occurred', error)
);

const testRedisConnection = async () => {
  try {
    await client.connect();
    console.log('Redis connected successfully');

    await client.set('name', 'James');

    const extractValue = await client.get('name');
    console.log(extractValue);

    const deleteName = await client.del('name');
    console.log(deleteName);

    const extractUpdatedValue = await client.get('name');
    console.log(extractUpdatedValue);

    await client.set('count', '100');
    const incrementCount = await client.incr('count');
    console.log(incrementCount);

    const decrementCount = await client.decr('count');
    console.log(decrementCount);
  } catch (error) {
    console.error(error);
    await client.quit();
  }
};

testRedisConnection();
