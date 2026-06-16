const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://iacastilloili2_db_user:ChwqUwyL7jrF6fiZ@cluster0.hhncmke.mongodb.net/mi-ecommerce?retryWrites=true&w=majority').then(async () => {
  const Product = mongoose.connection.collection('products');
  const products = await Product.find({}).toArray();
  for (const p of products) {
    if (p.images && p.images.length > 0) {
      const newImages = p.images.map(img => img.replace('https://vibiharfwemqfgdnwbzg.supabase.co/storage/v1/s3/object/public/sonterry/sonterry/', 'https://vibiharfwemqfgdnwbzg.supabase.co/storage/v1/object/public/sonterry/'));
      await Product.updateOne({ _id: p._id }, { $set: { images: newImages } });
    }
  }
  console.log("URLs arregladas en DB.");
  process.exit(0);
});
