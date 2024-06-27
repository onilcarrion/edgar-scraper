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
//     console.error('Error fetching JSON data:', error);
//     throw error;
//   }
// };

// export { fetchEdgarData };



import axios, { AxiosError } from 'axios';

const fetchEdgarData = async (cik: string) => {
  const url = `https://data.sec.gov/submissions/CIK${cik}.json`;

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'YourCompanyName - your_email@example.com',
      },
    });
    const filings = response.data.filings.recent;

    if (!filings || !filings.accessionNumber || !Array.isArray(filings.accessionNumber)) {
      return []; // Return an empty array if there are no filings
    }

    const txtUrls = filings.accessionNumber.map((accessionNumber: string) => {
      return `https://www.sec.gov/Archives/edgar/data/${cik}/${accessionNumber}.txt`;
    });

    return txtUrls;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 404) {
        throw new Error('CIK not found');
      }
      console.error(`Error fetching JSON data: ${(error as AxiosError).message}`);
      throw new Error('Failed to fetch data');
    } else {
      console.error('Error fetching JSON data:', (error as Error).message);
      throw new Error('Failed to fetch data');
    }
  }
};

export { fetchEdgarData };


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
//       // Handle Axios error
//       console.error(`Error fetching JSON data: ${(error as AxiosError).message}`);
//       throw error; // Re-throw the error to propagate it
//     } else {
//       // Handle other types of errors
//       console.error('Error fetching JSON data:', (error as Error).message);
//       throw new Error('Failed to fetch data');
//     }
//   }
// };

// export { fetchEdgarData };













