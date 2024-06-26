
// console.log(`Start`);
// // src/fetchEdgarData.ts

// import axios from 'axios';

// // Define the Filing interface
// export interface Filing {
//   form: string;
//   dateFiled: string;
//   fileNumber: string;
//   accessionNumber: string;
// }

// // Define the EdgarData interface
// export interface EdgarData {
//   entityName: string;
//   recentFilings: Filing[];
// }

// // Function to fetch Edgar submissions based on CIK
// export async function fetchEdgarSubmissions(cik: string): Promise<EdgarData> {
//   const paddedCik = cik.padStart(10, '0');
//   const url = `https://data.sec.gov/submissions/CIK${paddedCik}.json`;
//   try {
//     const response = await axios.get(url, {
//       headers: {
//         'User-Agent': 'YourAppName/1.0'
//       }
//     });
//     console.log(response.data); // line to inspect response (for dubgging)
//     return response.data as EdgarData;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error;
//   }
// }

// console.log(`End`);

import axios, { AxiosError } from 'axios';

// Define the Filing interface
export interface Filing {
  form: string;
  dateFiled: string;
  fileNumber: string;
  accessionNumber: string;
}

// Define the EdgarData interface
export interface EdgarData {
  entityName: string;
  recentFilings: Filing[];
}

// Function to fetch Edgar submissions based on CIK
export async function fetchEdgarSubmissions(cik: string): Promise<EdgarData> {
  const paddedCik = cik.padStart(10, '0');
  const url = `https://data.sec.gov/submissions/CIK${paddedCik}.json`;
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'YourAppName/1.0'
      }
    });
    return response.data as EdgarData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404 && typeof axiosError.response.data === 'string' && axiosError.response.data.includes('<Code>NoSuchKey</Code>')) {
        // Handle specific NoSuchKey error
        console.error('SEC API Error: NoSuchKey - Invalid CIK');
        throw new Error('Invalid CIK');
      }
    }
    // Handle other errors or generic error case
    console.error('Error fetching data:', error);
    throw error;
  }
}

