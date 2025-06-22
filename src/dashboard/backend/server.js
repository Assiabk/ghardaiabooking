import express from 'express';
import cors from 'cors';
import hotelRoutes from './hotels.js';
import wikalatRoutes from './wikalat.js';
import iqamatRoutes from './iqamat.js';

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'http://192.168.1.5:3000'],
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true,
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));


// mount all three under /api/admin
app.use('/api/admin', hotelRoutes);
app.use('/api/admin', wikalatRoutes);
app.use('/api/admin', iqamatRoutes);

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);
