const { GoogleSpreadsheet } = require('google-spreadsheet');

exports.handler = async function(event, context) {
  try {
    // Initialize the sheet - doc ID is the long id in the sheets URL
    const doc = new GoogleSpreadsheet('1m_-JEgVDYE8iBgF8CrCcIOet9uk3qldHRytbDYtyAwY');

    // Initialize Auth - use service account or OAuth2 client
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    });

    await doc.loadInfo(); // loads document properties and worksheets
    const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]

    const rows = await sheet.getRows(); // can pass in { limit, offset }

    const results = rows.map(row => ({
      name: row.name,
      address: row['full address'],
      phone: row.phone,
      website: row.website,
      latitude: row.latitude,
      longitude: row.longitude
    }));

    return {
      statusCode: 200,
      body: JSON.stringify({ results })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' })
    };
  }
};
