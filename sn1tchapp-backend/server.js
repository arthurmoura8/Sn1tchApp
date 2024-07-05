const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importando cors
const userRoutes = require('./routes/users');
const groupRoutes = require('./routes/groups');
const contributionRoutes = require('./routes/contributions');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors()); // Usando cors para permitir requisições de qualquer origem

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/users', userRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/contributions', contributionRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
