// import { fetchEdgarData } from './fetchEdgarData';

// describe('fetchEdgarData', () => {
//   it('should fetch 8-K filings for a given CIK', async () => {
//     const CIK = '0001018724'; // Amazon's CIK as an example
//     const urls = await fetchEdgarData(CIK);
//     expect(urls.length).toBeGreaterThan(0);
//     expect(urls[0]).toContain('https://www.sec.gov/Archives/edgar/data/');
//   });
// });


//WORKING CODE---------------
import axios from 'axios';
import { fetchEdgarData } from './fetchEdgarData';

jest.mock('axios');

describe('fetchEdgarData', () => {
  afterEach(() => {
    jest.restoreAllMocks(); // Restore mocked functions after each test
  });

  it('should fetch 8-K filings for a given CIK', async () => {
    const cik = '0001018724'; // Example CIK
    const mockResponse = {
      data: {
        filings: {
          recent: {
            accessionNumber: ['0001234567']
          }
        }
      }
    };
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(mockResponse);

    const urls = await fetchEdgarData(cik);

    expect(urls).toBeInstanceOf(Array);
    expect(urls.length).toBeGreaterThan(0);
    expect(urls[0]).toBe('https://www.sec.gov/Archives/edgar/data/0001018724/0001234567.txt');
  });

  it('should handle an invalid CIK format', async () => {
    const invalidCik = '12345ABC'; // Invalid CIK
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(new Error('Network Error'));

    await expect(fetchEdgarData(invalidCik)).rejects.toThrow('Failed to fetch data');
  });

  it('should handle a nonexistent CIK', async () => {
    const nonexistentCik = '0000000000'; // Nonexistent CIK
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue({
      response: {
        status: 404,
        statusText: 'Not Found',
      }
    });

    await expect(fetchEdgarData(nonexistentCik)).rejects.toThrow('Failed to fetch data');
  });

  it('should handle a valid CIK with no filings', async () => {
    const noFilingsCik = '0001067983'; // Example CIK with no recent filings
    const mockResponse = {
      data: {
        filings: {
          recent: []
        }
      }
    };
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(mockResponse);

    const urls = await fetchEdgarData(noFilingsCik);
    expect(urls).toEqual([]);
  });

  it('should handle API rate limiting', async () => {
    const cik = '0001018724'; // Example CIK
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue({
      response: {
        status: 429,
        statusText: 'Too Many Requests',
      }
    });

    await expect(fetchEdgarData(cik)).rejects.toThrow('Failed to fetch data');
  });

  it('should handle network errors', async () => {
    const cik = '0001018724'; // Example CIK
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(new Error('Network Error'));

    await expect(fetchEdgarData(cik)).rejects.toThrow('Failed to fetch data');
  });
});

// import axios from 'axios';
// import { fetchEdgarData } from './fetchEdgarData';

// jest.mock('axios');

// describe('fetchEdgarData', () => {
//   afterEach(() => {
//     jest.restoreAllMocks();
//   });

//   it('should fetch 8-K filings for a given CIK', async () => {
//     const cik = '0001018724';
//     const mockResponse = {
//       data: {
//         filings: {
//           recent: {
//             accessionNumber: ['0001234567']
//           }
//         }
//       }
//     };
//     (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(mockResponse);

//     const urls = await fetchEdgarData(cik);

//     expect(urls).toBeInstanceOf(Array);
//     expect(urls.length).toBeGreaterThan(0);
//     expect(urls[0]).toBe('https://www.sec.gov/Archives/edgar/data/0001018724/0001234567.txt');
//   });

//   it('should handle an invalid CIK format', async () => {
//     const invalidCik = '12345ABC';
//     (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(new Error('Network Error'));

//     await expect(fetchEdgarData(invalidCik)).rejects.toThrow('Failed to fetch data');
//   });

//   it('should handle a nonexistent CIK', async () => {
//     const nonexistentCik = '0000000000';
//     (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue({
//       response: {
//         status: 404,
//         statusText: 'Not Found',
//       }
//     });

//     await expect(fetchEdgarData(nonexistentCik)).rejects.toThrow('CIK not found');
//   });

//   it('should handle a valid CIK with no filings', async () => {
//     const noFilingsCik = '0001067983';
//     const mockResponse = {
//       data: {
//         filings: {
//           recent: []
//         }
//       }
//     };
//     (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(mockResponse);

//     const urls = await fetchEdgarData(noFilingsCik);
//     expect(urls).toEqual([]);
//   });

//   it('should handle API rate limiting', async () => {
//     const cik = '0001018724';
//     (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue({
//       response: {
//         status: 429,
//         statusText: 'Too Many Requests',
//       }
//     });

//     await expect(fetchEdgarData(cik)).rejects.toThrow('API rate limit exceeded');
//   });

//   it('should handle network errors', async () => {
//     const cik = '0001018724';
//     (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(new Error('Network Error'));

//     await expect(fetchEdgarData(cik)).rejects.toThrow('Failed to fetch data');
//   });

//   it('should handle request timeout', async () => {
//     const cik = '0001018724';
//     (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue({ code: 'ECONNABORTED' });

//     await expect(fetchEdgarData(cik)).rejects.toThrow('Request timeout');
//   });
// });
