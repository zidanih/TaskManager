const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Initialisation
const app = express();
app.use(cors());
app.use(express.json());

// Connexion MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connecté à MongoDB avec succès"))
  .catch(err => console.error("Erreur MongoDB:", err));

// Routes
app.use('/api/users', require('./routes/userRoutes'));

// Middleware 404 (si route inexistante)
app.use((req, res) => {
  res.status(404).json({ error: "Route non trouvée" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur sur http://localhost:${PORT}`));
