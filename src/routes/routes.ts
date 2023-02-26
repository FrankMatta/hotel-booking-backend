import express from 'express';
import guestController from '../controllers/guests';
import bookingController from '../controllers/booking';

const router = express.Router();

router.post('/guest', guestController.saveGuestDetails);
router.post('/booking', bookingController.createBooking);
router.get('/booking', bookingController.getBooking);

export = router;