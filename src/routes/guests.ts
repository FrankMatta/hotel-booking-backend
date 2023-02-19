import express from 'express';
import controller from '../controllers/guests';
const router = express.Router();

router.post('/guest', controller.saveGuestDetails);

export = router;