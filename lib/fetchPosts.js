import Airtable from 'airtable';

// Configuración de Airtable
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_TOKEN }).base('appaxEuIDKq4Ux5Jk');

// Función para obtener los posts
export async function fetchPosts() {
  const posts = [];

  try {
    // Log: Intento de obtener registros de Airtable
    console.log('Fetching records from Airtable');
    
    // Obtener registros de la primera página
    const records = await base('Table 1').select({}).firstPage();

    // Mapear todos los registros
    records.forEach((record) => {
      const post = {
        id: record.id,
        name: record.get('name'),
        blogurl: record.get('blogurl'),
        feedurl: record.get('feedurl'),
        notes: record.get('notes'),
        approved: record.get('approved'),
        date: record.get('date')
      };
      posts.push(post);
    });

    // Log: Mostrar todos los posts
    console.log('All posts:', posts);
  } catch (err) {
    console.error('Error fetching data from Airtable:', err);
  }

  return posts;
}
