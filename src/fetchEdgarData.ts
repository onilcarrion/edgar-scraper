import axios from 'axios';

async function fetchEdgarSubmissions(cik: string): Promise<any> {
  const url = `https://data.sec.gov/submissions/CIK${cik}.json`;
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'YourAppName/1.0'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

// Example usage
const exampleCik = '0000320193'; // Example CIK (Apple Inc.)
fetchEdgarSubmissions(exampleCik)
  .then(data => {
    console.log('Filing data:', data);
    // Process the data as needed
  })
  .catch(error => {
    console.error('Failed to fetch data:', error);
  });

export { fetchEdgarSubmissions };