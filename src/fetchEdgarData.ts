
// import axios from 'axios';

// const fetchEdgarData = async (cik: string) => {
//   const url = `https://data.sec.gov/submissions/CIK${cik}.json`;

//   try {
//     const response = await axios.get(url, {
//       headers: {
//         'User-Agent': 'YourCompanyName - your_email@example.com',
//       },
//     });
//     const filings = response.data.filings.recent;

//     const txtUrls = filings.accessionNumber.map((accessionNumber: string, index: number) => {
//       return `https://www.sec.gov/Archives/edgar/data/${cik}/${accessionNumber}.txt`;
//     });

//     return txtUrls;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//             if (error.response) {
//               const { status, statusText } = error.response;
//               if (status === 404) {
//                 throw new Error('CIK not found');
//               } else if (status === 429) {
//                 throw new Error('API rate limit exceeded');
//               } else {
//                 throw new Error(`Request failed with status ${status}: ${statusText}`);
//               }
//             } else if (error.code === 'ECONNABORTED') {
//               throw new Error('Request timeout');
//             } else {
//               console.error('Error fetching JSON data:', (error as Error).message);
//               throw new Error('Failed to fetch data');
//             }
//           } else {
//             console.error('Error fetching JSON data:', (error as Error).message);
//             throw new Error('Failed to fetch data');
//           }
//         }
//       };

// export { fetchEdgarData };

//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=


// import axios, { AxiosError } from 'axios';

// const fetchEdgarData = async (cik: string) => {
//   const url = `https://data.sec.gov/submissions/CIK${cik}.json`;

//   try {
//     const response = await axios.get(url, {
//       headers: {
//         'User-Agent': 'YourCompanyName - your_email@example.com',
//       },
//     });

//     const filings = response.data.filings.recent;

//     if (!filings || !filings.accessionNumber || !Array.isArray(filings.accessionNumber)) {
//       return []; // Return an empty array if there are no filings
//     }

//     const txtUrls = filings.accessionNumber.map((accessionNumber: string) => {
//       return `https://www.sec.gov/Archives/edgar/data/${cik}/${accessionNumber}.txt`;
//     });

//     return txtUrls;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       if (error.response) {
//         const { status, statusText } = error.response;
//         if (status === 404) {
//           throw new Error('CIK not found');
//         } else if (status === 429) {
//           throw new Error('API rate limit exceeded');
//         } else {
//           throw new Error(`Request failed with status ${status}: ${statusText}`);
//         }
//       } else if (error.code === 'ECONNABORTED') {
//         throw new Error('Request timeout');
//       } else {
//         console.error('Error fetching JSON data:', (error as Error).message);
//         throw new Error('Failed to fetch data');
//       }
//     } else {
//       console.error('Error fetching JSON data:', (error as Error).message);
//       throw new Error('Failed to fetch data');
//     }
//   }
// };

// export { fetchEdgarData };


import axios from 'axios';

const fetchEdgarData = async (cik: string): Promise<string[]> => {
  const url = `https://data.sec.gov/submissions/CIK${cik}.json`;

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'YourCompanyName - your_email@example.com',
      },
    });

    const filings = response.data.filings.recent;

    if (!filings || !Array.isArray(filings.accessionNumber)) {
      return []; // Return an empty array if no filings or no accession numbers
    }

    // Filter for 8-K filings specifically
    const txtUrls: string[] = filings.accessionNumber.map((accessionNumber: string, index: number) => {
      // Check if the filing form is '8-K'
      if (filings.form[index] === '8-K') {
        const formattedAccessionNumber = accessionNumber.replace(/-/g, '');
        return `https://www.sec.gov/Archives/edgar/data/${cik}/${formattedAccessionNumber}/${accessionNumber}.txt`;
      }
      return null;
    }).filter((url: string | null) => url !== null); // Remove null values

    return txtUrls;
  } catch (error) {
    console.error('Error fetching JSON data:', error);
    throw new Error('Failed to fetch data');
  }
};

export { fetchEdgarData };







