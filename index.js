const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server running at localhost:${PORT}`);
});