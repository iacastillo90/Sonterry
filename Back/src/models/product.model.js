const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Product name is required'], trim: true, maxlength: 200 },
  description: { type: String, required: [true, 'Description is required'], maxlength: 5000 },
  price: { type: Number, required: [true, 'Price is required'], min: 0 },
  stock: { type: Number, required: [true, 'Stock is required'], min: 0 },
  images: [{
    type: String,
    validate: {
      validator: function (v) {
        return /^https?:\/\/.+/.test(v);
      },
      message: 'Each image must be a valid URL starting with http(s)://',
    },
  }],
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: [true, 'Category is required'] },
  ratings: { type: Number, default: 0, min: 0, max: 5 },
  slug: { type: String, unique: true },
  type: { type: String, enum: ['serigrafia', 'dtf', 'prenda', 'otro', 'mug', 'gorra', 'estampado'], default: 'prenda' },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
}, { timestamps: true });

productSchema.index({ category: 1, price: 1 });
productSchema.index({ isDeleted: 1, category: 1, price: 1 });
productSchema.index({ type: 1, stock: 1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ name: 'text', description: 'text' });
productSchema.pre('save', async function (next) {
  if (this.isModified('name') || !this.slug) {
    const baseSlug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    let slug = baseSlug;
    let counter = 1;

    while (true) {
      const existing = await mongoose.model('Product').findOne({
        _id: { $ne: this._id },
        slug,
      });
      if (!existing) break;
      slug = `${baseSlug}-${counter++}`;
    }

    this.slug = slug;
  }
  next();
});

// ── Meilisearch sync hooks ────────────────────────────────────────────────
// Se requiren inline para evitar circular imports al cargar el modelo

productSchema.post('save', async function (doc) {
  try {
    const { addSearchSyncJob } = require('../jobs/searchSyncQueue');
    if (doc.isDeleted) {
      await addSearchSyncJob('remove', doc._id);
    } else {
      await doc.populate('category', 'name');
      const { indexProduct } = require('../services/search.service');
      await indexProduct(doc);
    }
  } catch (err) {
    // Silently fail — eventual consistency via syncAll
  }
});

productSchema.post('findOneAndUpdate', async function (result) {
  if (!result) return;
  try {
    const { addSearchSyncJob } = require('../jobs/searchSyncQueue');
    if (result.isDeleted) {
      await addSearchSyncJob('remove', result._id);
    } else {
      await result.populate('category', 'name');
      const { indexProduct } = require('../services/search.service');
      await indexProduct(result);
    }
  } catch (err) {
    // Silently fail — eventual consistency via syncAll
  }
});

productSchema.post('findOneAndDelete', async function (result) {
  if (!result) return;
  try {
    const { addSearchSyncJob } = require('../jobs/searchSyncQueue');
    await addSearchSyncJob('remove', result._id);
  } catch (err) {
    // Silently fail
  }
});

module.exports = mongoose.model('Product', productSchema);
