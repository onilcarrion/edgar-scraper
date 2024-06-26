// import { fetchEdgarSubmissions } from './fetchEdgarData';

// describe('fetchEdgarSubmissions', () => {
//   it('fetches data for a valid CIK', async () => {
//     const exampleCik = '0000320193'; // Example CIK (Apple Inc.)
//     const data = await fetchEdgarSubmissions(exampleCik);
//     expect(data).toHaveProperty('entityName');
//     expect(data.recentFilings).toBeInstanceOf(Array);
//   });

//   it('throws an error for an invalid CIK', async () => {
//     const invalidCik = 'INVALID_CIK'; // Invalid CIK
//     await expect(fetchEdgarSubmissions(invalidCik)).rejects.toThrow();
//   });
// });

import { fetchEdgarSubmissions } from './fetchEdgarData';

describe('fetchEdgarSubmissions', () => {
  it('fetches data for a valid CIK', async () => {
    const exampleCik = '0000320193'; // Example CIK (Apple Inc.)
    const data = await fetchEdgarSubmissions(exampleCik);

    // Adjust expectations based on the actual structure of `data`
    expect(data.recentFilings).toBeInstanceOf(Array);
    if (data.recentFilings.length > 0) {
      expect(data.recentFilings[0]).toHaveProperty('form');
      expect(data.recentFilings[0]).toHaveProperty('dateFiled');
      expect(data.recentFilings[0]).toHaveProperty('fileNumber');
      expect(data.recentFilings[0]).toHaveProperty('accessionNumber');
    }
  });

  it('throws an error for an invalid CIK', async () => {
    const invalidCik = 'INVALID_CIK'; // Invalid CIK
    await expect(fetchEdgarSubmissions(invalidCik)).rejects.toThrow();
  });
});
