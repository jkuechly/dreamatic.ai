const { GoogleSpreadsheet } = require('google-spreadsheet');
const { haversineDistance } = require('./haversineDistance_serverless');

exports.handler = async function(event, context) {
  try {
    console.log('Function started');
    
    const { keyword, location, radius } = JSON.parse(event.body);
    const [anchorLat, anchorLng] = location.split(',').map(coord => parseFloat(coord.trim()));
    const maxRadius = parseFloat(radius);

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

    const results = rows
      .map(row => ({
        name: row.name,
        address: row.address,
        phone: row.phone,
        website: row.website,
        latitude: parseFloat(row.latitude),
        longitude: parseFloat(row.longitude),
        distance: row.distance
      }))
      .filter(result => {
        const distance = haversineDistance(anchorLat, anchorLng, result.latitude, result.longitude);
        return distance <= maxRadius;
      });

    console.log(`${results.length} results after filtering`);

    return {
      statusCode: 200,
      body: JSON.stringify({
        results: results,
        totalResults: results.length,
        message: 'Data fetched and filtered successfully'
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
