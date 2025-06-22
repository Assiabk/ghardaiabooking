// src/dashboard/backend/iqamat.js

import express from 'express';
import admin from 'firebase-admin';
import serviceAccount from './ghardaia-booking-firebase-adminsdk-fbsvc-bcf0fb40d3.json' assert { type: 'json' };

// ─── Sanity check: log when this file is loaded ────────────────────────────────
console.log('🛠️  iqamat.js module loaded');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
const router = express.Router();

// ─── Heartbeat GET ─────────────────────────────────────────────────────────────
// Visit GET /api/admin/iqamat to confirm this router is live
router.get('/iqamat', (req, res) => {
  console.log('🔍 GET /api/admin/iqamat hit');
  res.json({ ok: true, msg: 'iqamat router is up!' });
});

// ─── POST /iqamat ────────────────────────────────────────────────────────────────
router.post('/iqamat', async (req, res) => {
  try {
    console.log('📥 Incoming Iqama Body:', req.body);

    const {
      name = '',
      description = '',
      address = '',
      phone = '',
      email = '',
      location = '',
      price = 0,
      rating = 0,
      reviews = 0,
      services = [],
      images = [],
      rooms = [],
    } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({ error: 'Name and price are required.' });
    }

    const iqamaData = {
      name,
      description,
      address,
      phone,
      email,
      location,
      price: Number(price),
      rating: Number(rating),
      reviews: Number(reviews),
      services: Array.isArray(services) ? services : [],
      images:   Array.isArray(images)   ? images   : [],
      rooms:    Array.isArray(rooms)    ? rooms    : [],
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    console.log('✅ Saving Iqama to Firestore:', iqamaData);
    const ref = await db.collection('iqamat').add(iqamaData);
    return res.status(201).json({ id: ref.id, message: 'Iqama added successfully' });
  } catch (err) {
    console.error('❌ Error in POST /api/admin/iqamat:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
