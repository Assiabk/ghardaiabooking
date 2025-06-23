// ✅ /api/admins/login.js
import express from 'express';
import admin from 'firebase-admin';
import jwt from 'jsonwebtoken';

// ✅ Use a strong JWT secret (you can also load this from .env)
const JWT_SECRET = 'yourStrongSecretKey';

// ✅ Initialize Firebase Admin SDK (only once)
if (!admin.apps.length) {
  const serviceAccount = await import('../../../serviceAccountKey.json', {
    assert: { type: 'json' }
  });

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount.default),
  });
}

const router = express.Router();

// ✅ Test Route
router.get('/ping', (req, res) => {
  res.send('✅ Login route is working');
});

// ✅ Login Route
router.post('/login', async (req, res) => {
  console.log('📥 Login request received');
  const { email, password } = req.body;

  try {
    // 🔍 Find the admin by email in Firestore
    const snapshot = await admin.firestore()
      .collection('admins')
      .where('email', '==', email)
      .limit(1)
      .get();

    if (snapshot.empty) {
      console.log('❌ Admin not found');
      return res.status(401).json({ message: 'Email not found' });
    }

    const adminData = snapshot.docs[0].data();

    // ✅ Compare plain text password
    const passwordMatch = password === adminData.password;

    if (!passwordMatch) {
      console.log('❌ Wrong password');
      return res.status(401).json({ message: 'Password incorrect' });
    }

    // ✅ Generate JWT Token
    const token = jwt.sign(
      { email: adminData.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log('✅ Login successful');
    res.status(200).json({ token }); // Send token to frontend

  } catch (error) {
    console.error('🔥 Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
