const { GoogleSpreadsheet } = require('google-spreadsheet');

exports.handler = async function(event, context) {
  try {
    console.log('Function started');
    
    // Initialize the sheet - doc ID is the long id in the sheets URL
    const doc = new GoogleSpreadsheet('1m_-JEgVDYE8iBgF8CrCcIOet9uk3qldHRytbDYtyAwY');
    console.log('Google Sheet initialized');

    // Initialize Auth - use service account or OAuth2 client
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    });
    console.log('Auth completed');

    await doc.loadInfo(); // loads document properties and worksheets
    console.log('Document loaded');
    
    const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
    console.log('Sheet accessed');

    const rows = await sheet.getRows(); // can pass in { limit, offset }
    console.log(`${rows.length} rows fetched`);

    const results = rows.map(row => ({
      name: row.name,
      address: row['full address'],
      phone: row.phone,
      website: row.website,
      latitude: row.latitude,
      longitude: row.longitude
    }));
    console.log('Results mapped');

    return {
      statusCode: 200,
      body: JSON.stringify({ results })
    };
  } catch (error) {
    console.error('Error details:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data', details: error.message })
    };
  }
};
