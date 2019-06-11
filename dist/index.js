"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _athelete = _interopRequireDefault(require("../data/athelete.json"));

var _noc = _interopRequireDefault(require("../data/noc.json"));

var _olympics = require("../dist/olympics");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const olympicsHostedPerNoc = (0, _olympics.noOfOlympicsHostedPerNoc)(_athelete.default);
const topTenMedalWinnerAfter2000 = (0, _olympics.topTenCountriesWonMedalAfter2000)(_athelete.default, _noc.default);
const averageAgeAthletePerYer = (0, _olympics.perYearAverageAgeOfAthlete)(_athelete.default);
const medalWinnersIndiaPerSeason = (0, _olympics.allMedalWinnersFromIndiaPerSeason)(_athelete.default);
const overDecadeParticipationMaleAndFemale = (0, _olympics.maleAndFemaleParticipationForDecades)(_athelete.default); // converting to string

const jsonObject1 = JSON.stringify(olympicsHostedPerNoc, null, 4);
const jsonObject2 = JSON.stringify(topTenMedalWinnerAfter2000, null, 4);
const jsonObject3 = JSON.stringify(averageAgeAthletePerYer, null, 4);
const jsonObject4 = JSON.stringify(medalWinnersIndiaPerSeason, null, 4);
const jsonObject5 = JSON.stringify(overDecadeParticipationMaleAndFemale, null, 4); // writing File

_fs.default.writeFile('./output/olympicsHostedPerNoc.json', jsonObject1, err => {
  if (err) {
    throw err;
  }

  console.log('The file1 has been Saved');
});

_fs.default.writeFile('./output/topTenCountriesWonMedalAfter2000.json', jsonObject2, err => {
  if (err) {
    throw err;
  }

  console.log('The file2 has been Saved');
});

_fs.default.writeFile('./output/averageAgeAthletePerYer.json', jsonObject3, err => {
  if (err) {
    throw err;
  }

  console.log('The file3 has been Saved');
});

_fs.default.writeFile('./output/medalWinnersIndiaPerSeason.json', jsonObject4, err => {
  if (err) {
    throw err;
  }

  console.log('The file4 has been Saved');
});

_fs.default.writeFile('./output/overDecadeParticipationMaleAndFemale.json', jsonObject5, err => {
  if (err) {
    throw err;
  }

  console.log('The file5 has been Saved');
});