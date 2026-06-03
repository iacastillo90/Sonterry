const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const corsOptions = require('./config/cors');
const notFound = require('./errors/notFound');
const errorHandler = require('./errors/errorHandler');

// Route imports
const authRoutes = require('./routes/auth.routes');
const productsRoutes = require('./routes/products.routes');
const categoriesRoutes = require('./routes/categories.routes');
const usersRoutes = require('./routes/users.routes');
const cartRoutes = require('./routes/cart.routes');
const wishlistRoutes = require('./routes/wishlist.routes');
const ordersRoutes = require('./routes/orders.routes');
const paymentsRoutes = require('./routes/payments.routes');
const reviewsRoutes = require('./routes/reviews.routes');
const ticketsRoutes = require('./routes/tickets.routes');
const bankAccountsRoutes = require('./routes/bankAccounts.routes');
const searchRoutes = require('./routes/search.routes');
const healthRoutes = require('./routes/health.routes');
const contactRoutes = require('./routes/contact.routes');
const n8nWebhooks = require('./webhooks/n8n.webhook');
const stripeWebhooks = require('./webhooks/stripe');

const app = express();

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "blob:", process.env.MINIO_PUBLIC_URL || ''].filter(Boolean),
      connectSrc: ["'self'", ...(process.env.CORS_ORIGIN || '').split(',').map(s => s.trim()).filter(Boolean)],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      frameAncestors: ["'none'"],
    },
  },
}));
app.use(cors(corsOptions));

// Stripe webhook MUST be before express.json() to preserve raw body for signature verification
app.use('/api/webhooks/stripe', stripeWebhooks);

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

// Global rate limiter — protects all /api/ routes
const { generalLimiter } = require('./middlewares/rateLimiter');
app.use('/api/', generalLimiter);

// Endpoints
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/tickets', ticketsRoutes);
app.use('/api/bank-accounts', bankAccountsRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/webhooks/n8n', n8nWebhooks);

// Fallbacks
app.use(notFound);
app.use(errorHandler);

module.exports = app;
