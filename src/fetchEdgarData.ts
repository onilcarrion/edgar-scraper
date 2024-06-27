// import axios from 'axios';

// export interface Filing {
//   form: string;
//   dateFiled: string;
//   fileNumber: string;
//   accessionNumber: string;
// }

// export interface EdgarData {
//   cik: string;
//   entityName: string;
//   filings: {
//     recent: {
//       form: string[];
//       dateFiled: string[];
//       fileNumber: string[];
//       accessionNumber: string[];
//     };
//   };
// }

// export async function fetchEdgarSubmissions(cik: string): Promise<string[]> {
//   const paddedCik = cik.padStart(10, '0');
//   const url = `https://data.sec.gov/submissions/CIK${paddedCik}.json`;

//   try {
//     const response = await axios.get<EdgarData>(url, {
//       headers: {
//         'User-Agent': 'YourAppName/1.0'
//       }
//     });

//     const filings = response.data.filings.recent;
//     const baseArchiveUrl = "https://www.sec.gov/Archives/";

//     const txtUrls = filings.accessionNumber.map((accessionNumber, index) => {
//       if (filings.form[index] === '8-K') {
//         const formattedAccessionNumber = accessionNumber.replace(/-/g, '');
//         return `${baseArchiveUrl}edgar/data/${paddedCik}/${formattedAccessionNumber}/${accessionNumber}-index.htm`;
//       }
//       return null;
//     }).filter(url => url !== null) as string[];

//     console.log('Fetched URLs:', txtUrls); // Log the URLs to console (CAN BE REMOVED)

//     return txtUrls;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error;
//   }
// }

import axios from 'axios';

const fetchEdgarData = async (cik: string) => {
  const url = `https://data.sec.gov/submissions/CIK${cik}.json`;

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'YourCompanyName - your_email@example.com',
      },
    });
    const filings = response.data.filings.recent;

    const txtUrls = filings.accessionNumber.map((accessionNumber: string, index: number) => {
      return `https://www.sec.gov/Archives/edgar/data/${cik}/${accessionNumber}.txt`;
    });

    return txtUrls;
  } catch (error) {
    console.error('Error fetching JSON data:', error);
    throw error;
  }
};

export { fetchEdgarData };







