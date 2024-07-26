const { GoogleSpreadsheet } = require('google-spreadsheet');

exports.handler = async function(event, context) {
  try {
    console.log('Function started');
    
    const doc = new GoogleSpreadsheet('1m_-JEgVDYE8iBgF8CrCcIOet9uk3qldHRytbDYtyAwY');
    console.log('Google Sheet initialized');

    const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');
    console.log('Private key prepared');

    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: privateKey,
    });
    console.log('Auth completed');

    await doc.loadInfo();
    console.log('Document loaded');
    
    const sheet = doc.sheetsByIndex[0];
    console.log('Sheet accessed');

    const rows = await sheet.getRows();
    console.log(`${rows.length} rows fetched`);

    const results = rows.map(row => ({
      name: row.name,
      address: row.address,
      phone: row.phone,
      website: row.website,
      latitude: row.latitude,
      longitude: row.longitude
    }));
    console.log('Results mapped');

    return {
      statusCode: 200,
      body: JSON.stringify({
        results: results,
        totalResults: results.length,
        message: 'Data fetched successfully'
      })
    };
  } catch (error) {
    console.error('Detailed error:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data', details: error.message })
    };
  }
};
