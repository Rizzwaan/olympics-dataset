import fs from 'fs';
import athleteData from '../data/athelete.json';
import nocRegionData from '../data/noc.json';

import {
  noOfOlympicsHostedPerNoc,
  topTenCountriesWonMedalAfter2000,
  perYearAverageAgeOfAthlete,
  allMedalWinnersFromIndiaPerSeason,
  maleAndFemaleParticipationForDecades,
}
  from '../dist/olympics';

const olympicsHostedPerNoc = noOfOlympicsHostedPerNoc(athleteData);
const topTenMedalWinnerAfter2000 = topTenCountriesWonMedalAfter2000(athleteData, nocRegionData);
const averageAgeAthletePerYer = perYearAverageAgeOfAthlete(athleteData);
const medalWinnersIndiaPerSeason = allMedalWinnersFromIndiaPerSeason(athleteData);
const overDecadeParticipationMaleAndFemale = maleAndFemaleParticipationForDecades(athleteData);

// converting to string
const jsonObject1 = JSON.stringify(olympicsHostedPerNoc, null, 4);
const jsonObject2 = JSON.stringify(topTenMedalWinnerAfter2000, null, 4);
const jsonObject3 = JSON.stringify(averageAgeAthletePerYer, null, 4);
const jsonObject4 = JSON.stringify(medalWinnersIndiaPerSeason, null, 4);
const jsonObject5 = JSON.stringify(overDecadeParticipationMaleAndFemale, null, 4);

// writing File


fs.writeFile('./output/olympicsHostedPerNoc.json', jsonObject1, (err) => {
  if (err) {
    throw err;
  }
  console.log('The file1 has been Saved');
});

fs.writeFile('./output/topTenCountriesWonMedalAfter2000.json', jsonObject2, (err) => {
  if (err) {
    throw err;
  }
  console.log('The file2 has been Saved');
});

fs.writeFile('./output/averageAgeAthletePerYer.json', jsonObject3, (err) => {
  if (err) {
    throw err;
  }
  console.log('The file3 has been Saved');
});

fs.writeFile('./output/medalWinnersIndiaPerSeason.json', jsonObject4, (err) => {
  if (err) {
    throw err;
  }
  console.log('The file4 has been Saved');
});

fs.writeFile('./output/overDecadeParticipationMaleAndFemale.json', jsonObject5, (err) => {
  if (err) {
    throw err;
  }
  console.log('The file5 has been Saved');
});
