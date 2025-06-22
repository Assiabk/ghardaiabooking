// src/dashboard/backend/wikalat.js

import express from 'express';
import admin from 'firebase-admin';
import serviceAccount from './ghardaia-booking-firebase-adminsdk-fbsvc-bcf0fb40d3.json' assert { type: 'json' };

// ─── Sanity check ───────────────────────────────────────────────────────────────
console.log('🛠️  Loaded wikalat.js (agency routes)');

// ─── Firebase Admin Initialization ─────────────────────────────────────────────
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
const router = express.Router();

// ─── Test GET ────────────────────────────────────────────────────────────────────
// GET  /api/admin/wikalat
router.get('/wikalat', (req, res) => {
  console.log('🔍 Received GET /api/admin/wikalat');
  return res.json({ ok: true, msg: 'Wikalat endpoint is up!' });
});

// ─── POST: Add New Agency ────────────────────────────────────────────────────────
// POST /api/admin/wikalat
router.post('/wikalat', async (req, res) => {
  try {
    console.log('📥 Incoming Wikalat POST body:', req.body);

    const {
      name = '',
      description = '',
      address = '',
      phone = '',
      email = '',
      website = '',
      licenseNumber = '',
      services = [],
      images = [],
      location = '',
    } = req.body;

    // Basic validation
    if (!name) {
      return res.status(400).json({ error: 'Name is required.' });
    }

    // Prepare the data object
    const agencyData = {
      name,
      description,
      address,
      phone,
      email,
      website,
      licenseNumber,
      services: Array.isArray(services) ? services : [],
      images: Array.isArray(images) ? images : [],
      location,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    console.log('✅ Saving to Firestore (wikalat):', agencyData);

    // Save to Firestore
    const docRef = await db.collection('wikalat').add(agencyData);

    return res
      .status(201)
      .json({ id: docRef.id, message: 'Agency added successfully' });
  } catch (error) {
    console.error('❌ Error in POST /api/admin/wikalat:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
