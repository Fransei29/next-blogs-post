import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_TOKEN }).base('appaxEuIDKq4Ux5Jk');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, blogurl, feedurl, notes } = req.body;

    try {
      await base('Table 1').create([
        {
          fields: {
            name,
            email,
            blogurl,
            feedurl,
            notes,
            approved: false,
          },
        },
      ]);

      res.status(200).json({ message: 'Form submitted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to save data to Airtable' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
