
// console.log('Starting application...');

// import { fetchEdgarSubmissions, Filing, EdgarData } from './fetchEdgarData';

// async function main() {
//   const exampleCik = '0000320193'; // Example CIK (Apple Inc.)
//   try {
//     const data = await fetchEdgarSubmissions(exampleCik);

//     console.log('Company Name:', data.entityName);

//     // Extract and process specific filings
//     const filings = data.recentFilings.map((filing: Filing) => ({
//       form: filing.form,
//       dateFiled: filing.dateFiled,
//       fileNumber: filing.fileNumber,
//       url: `https://www.sec.gov/Archives/edgar/data/${exampleCik.padStart(10, '0')}/${filing.accessionNumber.replace(/-/g, '')}/index.json`
//     }));
//     console.log('Extracted Filings:', filings);

//     return { companyName: data.entityName, filings };
//   } catch (error) {
//     console.error('Failed to fetch data:', error);
//     throw error;
//   }
// }

// export default main();

// console.log('Application finished.');

import { fetchEdgarSubmissions } from './fetchEdgarData';

// Example CIK for Amazon
const exampleCik = '0001018724';

// Main function to fetch and log '8-K' filing URLs
async function main() {
  try {
    const txtUrls = await fetchEdgarSubmissions(exampleCik);
    console.log('8-K Filing URLs:', txtUrls);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Execute main function
main();




