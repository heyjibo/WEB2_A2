const express = require('express'); // Import the express library
const pool = require('./db'); // Import the database connection pool
const app = express(); // Create an express application
const port = 3000; // Set the port number for the server

app.use(express.static('public')); // Serve static files from the 'public' directory
app.use(express.json()); // Parse JSON request bodies

// Route for the homepage API to fetch all fundraisers
app.get('/api', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT FUNDRAISER.FUNDRAISE_ID, ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, ACTIVE, FUNDRAISER.CATEGORY_ID, CATEGORY.NAME AS CATEGORY_NAME FROM FUNDRAISER INNER JOIN CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID');
    res.send(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Route to get all categories
app.get('/api/categories', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM CATEGORY');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Route to search fundraisers
app.get('/api/search', async (req, res) => {
  let query = 'SELECT FUNDRAISER.FUNDRAISE_ID, ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, ACTIVE, FUNDRAISER.CATEGORY_ID, CATEGORY.NAME AS CATEGORY_NAME FROM FUNDRAISER INNER JOIN CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID WHERE 1=1';
  if (req.query.organizer) {
    query += ` AND ORGANIZER LIKE '%${req.query.organizer}%'`;
  }
  if (req.query.city) {
    query += ` AND CITY LIKE '%${req.query.city}%'`;
  }
  if (req.query.CATEGORY_ID) {
    query += ` AND FUNDRAISER.CATEGORY_ID = '${req.query.CATEGORY_ID}'`;
  }

  try {
    const [rows] = await pool.query(query);
    if (rows.length === 0) {
      res.json(null);
    } else {
      res.json(rows);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Route to get detailed information for a specific fundraiser
app.get('/api/fundraiser/:id', async (req, res) => {
  try {
    const [row] = await pool.query('SELECT * FROM FUNDRAISER WHERE FUNDRAISE_ID = ?', [req.params.id]);
    if (row.length === 0) {
      res.status(404).send('Fundraiser not found');
    } else {
      res.json(row[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Start the server and log the port number
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});