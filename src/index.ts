import { fetchEdgarSubmissions } from './fetchEdgarData';

async function main() {
  const exampleCik = '0000320193'; // Example CIK (Apple Inc.)
  try {
    const data = await fetchEdgarSubmissions(exampleCik);
    console.log('Company Name:', data.entityName);
    console.log('Recent Filings:', data.recentFilings); // Adjust based on the actual structure

    // Extract and process specific filings
    const filings = data.recentFilings.map((filing: any) => ({
      form: filing.form,
      dateFiled: filing.dateFiled,
      fileNumber: filing.fileNumber,
      url: `https://www.sec.gov/Archives/edgar/data/${exampleCik}/${filing.accessionNumber.replace(/-/g, '')}/index.json`
    }));
    console.log('Extracted Filings:', filings);

  } catch (error) {
    console.error('Error:', error);
  }
}

main();
