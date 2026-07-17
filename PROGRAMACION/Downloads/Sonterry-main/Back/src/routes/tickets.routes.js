const express = require('express');
const router = express.Router();
const ticketsControllers = require('../controllers/tickets.controllers');
const { protect, restrictTo } = require('../middlewares/auth.middleware');

const upload = require('../middlewares/upload.middleware');

router.use(protect);

router.post('/', ticketsControllers.createTicket);
router.get('/', ticketsControllers.getUserTickets);

router.get('/all', restrictTo('admin'), ticketsControllers.getAllTickets);
router.patch('/:id/status', restrictTo('admin'), ticketsControllers.updateTicketStatus);
router.post('/:id/reply', upload.single('attachment'), ticketsControllers.replyToTicket);
router.delete('/:id', restrictTo('admin'), ticketsControllers.deleteTicket);

module.exports = router;
