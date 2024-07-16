exports.handler = async (event, context) => {
  // Parse the incoming request
  const { keyword, location, radius } = JSON.parse(event.body);

  // For MVP, we'll return mock data
  const mockResults = [
    { name: "ABC Dentistry", address: "123 Main St, Anytown, USA", distance: "1.2 miles" },
    { name: "Smile Bright Dental", address: "456 Oak Ave, Anytown, USA", distance: "2.5 miles" },
    { name: "Gentle Dental Care", address: "789 Elm St, Anytown, USA", distance: "3.8 miles" }
  ];

  return {
    statusCode: 200,
    body: JSON.stringify({
      results: mockResults,
      searchParams: { keyword, location, radius }
    })
  };
};
