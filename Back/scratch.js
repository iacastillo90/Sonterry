const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://iacastilloili2_db_user:ChwqUwyL7jrF6fiZ@cluster0.hhncmke.mongodb.net/mi-ecommerce?retryWrites=true&w=majority').then(async () => {
  const db = mongoose.connection.db;
  const products = await db.collection('products').find().sort({updatedAt: -1}).limit(1).toArray();
  console.log(JSON.stringify(products[0].images, null, 2));
  process.exit(0);
});
