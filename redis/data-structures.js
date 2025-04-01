const redis = require('redis');

const client = redis.createClient({
  host: 'localhost',
  port: 6379,
});

// Event listener
client.on('Error', (error) => {
  console.log('Redis client error occurred', error);
});

const redisDataStructures = async () => {
  try {
    await client.connect();

    // Strings -> set, get, mSet, mGet
    await client.set('user:name', 'Tunde James');
    const name = await client.get('user:name');
    console.log(name);

    await client.mSet([
      'user:email',
      'tundejames@example.com',
      'user:age',
      '60',
      'user:country',
      'Nigeria',
    ]);

    const [email, age, country] = await client.mGet([
      'user:email',
      'user:age',
      'user:country',
    ]);

    // console.log(email, age, country);

    // List -> lPush, rPush, lRange, lPop, rPop
    await client.rPush('notes', ['note 1', 'note 2', 'note 3']);
    const extractAllNotes = await client.lRange('notes', 0, -1);
    console.log(extractAllNotes);

    const firstNote = await client.lPop('notes');
    console.log(firstNote);

    const remainingNotes = await client.lRange('notes', 0, -1);
    console.log(remainingNotes);

    // Sets -> sAdd, sMembers, sIsMember, sRem
    await client.sAdd('user:nickName', ['john', 'jane', 'varun']);
    const extractUserNickNames = await client.sMembers('user:nickName');
    console.log(extractUserNickNames);

    const isVarunPresent = await client.sIsMember('user:nickName', 'varun');
    console.log(isVarunPresent);

    // Remove a member => 'jane'
    await client.sRem('user:nickName', 'jane');
    const getUpdatedNickNames = await client.sMembers('user:nickName');
    console.log(getUpdatedNickNames);

    // Sorted Sets -> zAdd, zRange, zRank, zRem
    await client.zAdd('cart', [
      {
        score: 100,
        value: 'Cart 1',
      },
      {
        score: 150,
        value: 'Cart 2',
      },
      {
        score: 10,
        value: 'Cart 3',
      },
    ]);

    const getCartItems = await client.zRange('cart', 0, -1);
    console.log(getCartItems);

    const extractAllCartItemsWithScore = await client.zRangeWithScores(
      'cart',
      0,
      -1
    );
    console.log(extractAllCartItemsWithScore);

    const cart2Rank = await client.zRank('cart', 'Cart 2');
    console.log(cart2Rank);

    // Hashes -> hSet, hGet, hGetAll, hDel
    await client.hSet('product:1', {
      name: 'Product 1',
      description: 'Product 1 description',
      rating: 5,
    });

    const getProductRating = await client.hGet('product:1', 'rating');
    console.log(getProductRating);

    const getProductDetails = await client.hGetAll('product:1');
    console.log(getProductDetails);

    await client.hDel('product:1', 'rating');
    const updatedProductDetails = await client.hGetAll('product:1');
    console.log(updatedProductDetails);
  } catch (error) {
    console.error(error);
    client.quit();
  }
};

redisDataStructures();
