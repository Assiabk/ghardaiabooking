
import express from 'express';
import cors from 'cors';

import hotelRoutes from './hotels.js';
import wikalatRoutes from './wikalat.js';
import iqamatRoutes from './iqamat.js';
import loginRoutes from '../../../api/admins/login.js';

const app = express();
const PORT = 5000;

app.use(cors({
  origin: ['http://localhost:3000', 'http://192.168.1.5:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use('/api/admins', loginRoutes);       // Ex: /api/admins/login
app.use('/api/admin', hotelRoutes);        // Ex: /api/admin/hotels
app.use('/api/admin', wikalatRoutes);      // Ex: /api/admin/wikalat
app.use('/api/admin', iqamatRoutes);       // Ex: /api/admin/iqamat

app.get('/', (req, res) => {
  res.send('✅ Backend server is running');
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
