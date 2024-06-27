// import axios from 'axios';
// import { fetchEdgarSubmissions } from './fetchEdgarData';

// // Mock axios
// jest.mock('axios');
// const mockedAxios = axios as jest.Mocked<typeof axios>;

// describe('fetchEdgarSubmissions', () => {
//   it('fetches and processes 8-K filings correctly', async () => {
//     const exampleCik = '0001018724'; // Example CIK for Amazon

//     // Mock response data
//     const mockData = {
//       cik: '0001018724',
//       entityName: 'Amazon.com Inc',
//       filings: {
//         recent: {
//           form: [
//             "4", "144", "8-K", "10-Q", "8-K"
//           ],
//           dateFiled: [
//             "2022-01-01", "2022-01-02", "2022-01-03", "2022-01-04", "2022-01-05"
//           ],
//           fileNumber: [
//             "000-22513", "001-22513", "002-22513", "003-22513", "004-22513"
//           ],
//           accessionNumber: [
//             "0001104659-24-065117" // Use the specific accession number you want to test
//           ]
//         }
//       }
//     };

//     // Set up the mock to return the expected data
//     mockedAxios.get.mockResolvedValue({ data: mockData });

//     const txtUrls = await fetchEdgarSubmissions(exampleCik);

//     // Adjust the expectation to match the specific URL you want to test against
//     expect(txtUrls).toEqual([
//       'https://www.sec.gov/Archives/edgar/data/1018724/000110465924065117/0001104659-24-065117-index.htm'
//     ]);
//   });

//   it('throws an error when the CIK is invalid', async () => {
//     const invalidCik = 'INVALID_CIK';

//     // Set up the mock to throw an error
//     mockedAxios.get.mockRejectedValue(new Error('Invalid CIK'));

//     await expect(fetchEdgarSubmissions(invalidCik)).rejects.toThrow('Invalid CIK');
//   });
// });

import { fetchEdgarData } from './fetchEdgarData';

describe('fetchEdgarData', () => {
  it('should fetch 8-K filings for a given CIK', async () => {
    const CIK = '0001018724'; // Amazon's CIK as an example
    const urls = await fetchEdgarData(CIK);
    expect(urls.length).toBeGreaterThan(0);
    expect(urls[0]).toContain('https://www.sec.gov/Archives/edgar/data/');
  });
});






