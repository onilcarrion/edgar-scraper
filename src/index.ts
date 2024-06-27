// import { fetchEdgarSubmissions } from './fetchEdgarData';

// // Example CIK for Amazon
// const exampleCik = '0001018724';

// // Main function to fetch and log '8-K' filing URLs
// async function main() {
//   try {
//     const txtUrls = await fetchEdgarSubmissions(exampleCik);
//     console.log('8-K Filing URLs:', txtUrls);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// }

// // Execute main function
// main();

import { fetchEdgarData } from './fetchEdgarData';

const CIK = '0001018724'; // Amazon's CIK as an example

fetchEdgarData(CIK)
  .then(urls => {
    console.log('8-K Filing URLs:', urls);
  })
  .catch(error => {
    console.error('Error:', error);
  });




