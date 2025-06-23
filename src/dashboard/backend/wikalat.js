// ✅ /src/dashboard/backend/wikalat.js
import express from 'express';
import admin from 'firebase-admin';
import serviceAccount from './ghardaia-booking-firebase-adminsdk-fbsvc-bcf0fb40d3.json' assert { type: 'json' };

console.log('🛠️ Loaded wikalat.js (agency routes)');

// ─── Initialize Firebase Admin ───────────────────────────
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
const db = admin.firestore();
const router = express.Router();

// ─── 1) LIST: GET /api/admin/wikalat ─────────────────────
router.get('/wikalat', async (req, res) => {
  try {
    const snap = await db.collection('wikalat')
      .orderBy('createdAt', 'desc')
      .get();

    const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    console.log(`📦 Fetched ${list.length} agencies`);
    return res.json(list);

  } catch (e) {
    console.error('❌ Failed to fetch agencies:', e);
    return res.status(500).json({ error: 'Failed to fetch agencies' });
  }
});

// ─── 2) DETAIL: GET /api/admin/wikalat/:id ────────────────
router.get('/wikalat/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`🔍 GET /api/admin/wikalat/${id}`);
  try {
    const doc = await db.collection('wikalat').doc(id).get();
    if (!doc.exists) {
      console.warn(`⚠️ Agency ${id} not found`);
      return res.status(404).json({ error: 'Agency not found' });
    }
    return res.json({ id: doc.id, ...doc.data() });
  } catch (e) {
    console.error('❌ Error fetching agency detail:', e);
    return res.status(500).json({ error: 'Server error' });
  }
});

// ─── 3) CREATE: POST /api/admin/wikalat ──────────────────
router.post('/wikalat', async (req, res) => {
  console.log('📥 POST /api/admin/wikalat body:', req.body);
  try {
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

    if (!name) {
      return res.status(400).json({ error: 'Name is required.' });
    }

    const agencyData = {
      name,
      description,
      address,
      phone,
      email,
      website,
      licenseNumber,
      services: Array.isArray(services) ? services : [],
      images:   Array.isArray(images)   ? images   : [],
      location,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await db.collection('wikalat').add(agencyData);
    console.log('✅ Agency saved:', docRef.id);
    return res.status(201).json({ id: docRef.id });

  } catch (e) {
    console.error('❌ Error creating agency:', e);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ─── 4) RESERVE: POST /api/admin/wikalat/:id/reserve ─────
router.post('/wikalat/:id/reserve', async (req, res) => {
  const { id } = req.params;
  const { name, phone } = req.body;
  console.log(`✉️ POST /api/admin/wikalat/${id}/reserve`, req.body);

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone required' });
  }

  try {
    const reservations = db
      .collection('wikalat')
      .doc(id)
      .collection('reservations');

    const ref = await reservations.add({
      name,
      phone,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log('✅ Reservation saved:', ref.id);
    return res.json({ message: 'Reservation saved' });

  } catch (e) {
    console.error('❌ Error saving reservation:', e);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
