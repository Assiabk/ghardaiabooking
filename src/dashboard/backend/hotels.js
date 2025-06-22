// hotels.js
import express from 'express';
import admin from 'firebase-admin';
import serviceAccount from './ghardaia-booking-firebase-adminsdk-fbsvc-bcf0fb40d3.json' assert { type: 'json' };

const router = express.Router();

// Initialize Firebase Admin SDK once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
const hotelsCollection = db.collection('hotels');

/**
 * POST /api/admin/hotels
 * Create a new hotel document
 */
router.post('/hotels', async (req, res) => {
  try {
    const {
      name = '',
      description = '',
      address = '',
      phone = '',
      email = '',
      price = 0,
      rating = 0,
      reviews = 0,
      services = [],
      images = [],
      location = '',
      rooms = [],
      hasWomenSection = false,
      hasMenSection = false,
      isAccessible = false,
      includesBreakfast = false,
    } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({ error: 'Name and price are required' });
    }

    const hotelData = {
      name,
      description,
      address,
      phone,
      email,
      price: Number(price),
      rating: Number(rating),
      reviews: Number(reviews),
      services: Array.isArray(services) ? services : [],
      images: Array.isArray(images) ? images.filter((img) => typeof img === 'string') : [],
      location,
      rooms: Array.isArray(rooms) ? rooms : [],
      hasWomenSection: Boolean(hasWomenSection),
      hasMenSection: Boolean(hasMenSection),
      isAccessible: Boolean(isAccessible),
      includesBreakfast: Boolean(includesBreakfast),
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await hotelsCollection.add(hotelData);
    return res.status(201).json({ id: docRef.id, message: 'Hotel added successfully' });
  } catch (error) {
    console.error('Error adding hotel:', error);
    return res.status(500).json({ error: 'Failed to add hotel' });
  }
});

/**
 * GET /api/admin/hotels
 * Get all hotels sorted by creation date descending
 */
router.get('/hotels', async (req, res) => {
  try {
    const snapshot = await hotelsCollection.orderBy('createdAt', 'desc').get();
    const hotels = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return res.status(200).json(hotels);
  } catch (error) {
    console.error('Error fetching hotels:', error);
    return res.status(500).json({ error: 'Failed to fetch hotels' });
  }
});

/**
 * GET /api/admin/hotels/:id
 * Get one hotel by Firestore document ID
 */
router.get('/hotels/:id', async (req, res) => {
  const { id } = req.params;
  console.log('🔍 GET /api/admin/hotels/:id — looking up:', id);
  try {
    const doc = await hotelsCollection.doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Hotel not found' });
    }
    return res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error('Error fetching hotel by ID:', error);
    return res.status(500).json({ error: 'Failed to fetch hotel' });
  }
});

/**
 * POST /api/admin/hotels/:id/check-availability
 * Dummy availability check (replace with real logic)
 */
router.post('/hotels/:id/check-availability', async (req, res) => {
  const { checkIn, checkOut } = req.body;
  if (!checkIn || !checkOut) {
    return res.status(400).json({ available: false, message: 'Missing check-in or check-out dates' });
  }

  // TODO: implement actual availability logic based on existing bookings
  // For now, always return available=true
  return res.status(200).json({ available: true });
});

/**
 * POST /api/admin/hotels/:id/book
 * Save a new booking under this hotel's subcollection
 */
router.post('/hotels/:id/book', async (req, res) => {
  const { id } = req.params;
  const bookingData = {
    ...req.body,  // expect { name, phone, roomType, checkIn, checkOut, nights, total }
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  try {
    const hotelDoc = hotelsCollection.doc(id);
    // Ensure hotel exists
    const doc = await hotelDoc.get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    // Save booking in "bookings" subcollection
    await hotelDoc.collection('bookings').add(bookingData);
    return res.status(201).json({ message: 'Booking saved successfully' });
  } catch (error) {
    console.error('Error saving booking:', error);
    return res.status(500).json({ error: 'Failed to save booking' });
  }
});

export default router;
