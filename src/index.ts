import { fetchEdgarData } from './fetchEdgarData';

const CIK = '0001018724'; // Amazon's CIK as an example

fetchEdgarData(CIK)
  .then(urls => {
    console.log('8-K Filing URLs:', urls);
  })
  .catch(error => {
    console.error('Error:', error);
  });




