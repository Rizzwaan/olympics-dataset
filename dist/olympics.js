"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.maleAndFemaleParticipationForDecades = exports.allMedalWinnersFromIndiaPerSeason = exports.perYearAverageAgeOfAthlete = exports.topTenCountriesWonMedalAfter2000 = exports.noOfOlympicsHostedPerNoc = void 0;

/* eslint-disable radix */
//  first function  --- Number of olympics hosted by each cities ---//
const noOfOlympicsHostedPerNoc = athleteData => {
  const noOFOlymopicEachHosted = athleteData.reduce((hostCity, hostingYear) => {
    if (!hostCity[hostingYear.City]) {
      hostCity[hostingYear.City] = [];
      hostCity[hostingYear.City].push(hostingYear.Year);
    } else if (!hostCity[hostingYear.City].includes(hostingYear.Year)) {
      hostCity[hostingYear.City].push(hostingYear.Year);
    }

    return hostCity;
  }, {});
  const hostingByEachCity = Object.keys(noOFOlymopicEachHosted).reduce((city, hostCity) => {
    city[hostCity] = noOFOlymopicEachHosted[hostCity].length;
    return city;
  }, {});
  return hostingByEachCity;
}; // console.log(noOfOlympicsHostedPerNoc(athleteData));
// ----------first function ends here------------------
// --------------------Second Function starts here ---------------------------------


exports.noOfOlympicsHostedPerNoc = noOfOlympicsHostedPerNoc;

const topTenCountriesWonMedalAfter2000 = (athleteData, nocData) => {
  const dataAfter2000 = dataFilter(athleteData, 2000);
  const medalWonEachNoc = dataAfter2000.reduce((nameOfCountry, player) => {
    if (!nameOfCountry[player.NOC]) {
      nameOfCountry[player.NOC] = {};
      nameOfCountry[player.NOC][player.Medal] = 1;
    } else if (!nameOfCountry[player.NOC][player.Medal]) {
      nameOfCountry[player.NOC][player.Medal] = 1;
    } else {
      nameOfCountry[player.NOC][player.Medal] += 1;
    }

    return nameOfCountry;
  }, {});
  const heighestWonMedalsDescending = sortDecending(medalWonEachNoc);
  const topTenMedalsWinnerCountryName = slicer(heighestWonMedalsDescending, 10);
  const topMedalWinnersValue = objectCreator(topTenMedalsWinnerCountryName, medalWonEachNoc);
  const topMedalWinnersWithProperName = nocToNameConvertor(topMedalWinnersValue, nocData);
  return topMedalWinnersWithProperName;
}; // /--------------------------Helpers for second function ----------------------------


exports.topTenCountriesWonMedalAfter2000 = topTenCountriesWonMedalAfter2000;

const dataFilter = (athleteData, year) => athleteData.filter(item => item.Year > year && item.Medal !== 'NA');

const sortDecending = medalWonEachNoc => {
  const sort = Object.keys(medalWonEachNoc).reduce((country, medals) => {
    country[medals] = Object.values(medalWonEachNoc[medals]).reduce((sum, medal) => sum + medal);
    return country;
  }, {});
  return Object.keys(sort).sort((first, second) => sort[second] - sort[first]);
};

const slicer = (data, times) => data.slice(0, times);

const objectCreator = (countryArr, medalWonEachNoc) => countryArr.reduce((countryName, each) => {
  countryName[each] = medalWonEachNoc[each];
  return countryName;
}, {});

const nocToNameConvertor = (targetObject, nocData) => {
  const nameMap = nocData.reduce((acc, item) => {
    acc[item.NOC] = item.region;
    return acc;
  }, {});
  const properName = Object.keys(targetObject).reduce((acc, item) => {
    acc[nameMap[item]] = targetObject[item];
    return acc;
  }, {});
  return properName;
}; // console.log(topTenCountriesWonMedalAfter2000(athleteData,nocData));
// -----------------second function ends here---------------------
// ---------------forth section starts here------------------


const perYearAverageAgeOfAthlete = athleteData => {
  const ageWithoutNan = removeNan(athleteData);
  const ageObject = ageWithoutNan.reduce((year, item) => {
    if (item.Event === "Boxing Men's Heavyweight") {
      if (!year[item.Year]) {
        year[item.Year] = {};
        year[item.Year].totalAge = parseFloat(item.Age);
        year[item.Year].count = 1;
      } else {
        year[item.Year].totalAge += parseFloat(item.Age);
        year[item.Year].count += 1;
      }
    }

    return year;
  }, {});
  const averageAge = Object.keys(ageObject).reduce((acc, item) => {
    acc[item] = Math.trunc(ageObject[item].totalAge / ageObject[item].count);
    return acc;
  }, {});
  return averageAge;
};

exports.perYearAverageAgeOfAthlete = perYearAverageAgeOfAthlete;

const removeNan = athleteData => athleteData.filter(value => !isNaN(value.Age)); // console.log(perYearAverageAgeOfAthlete(athleteData));
// -------------------Forth function ends here ------------------------------//
// // ----------------Fifth Function starts here -------------------------- ////


const allMedalWinnersFromIndiaPerSeason = athleteData => {
  const countrySpecificData = countryWiseFilter(athleteData, 'IND');
  const medalWinnerPerSeason = countrySpecificData.reduce((season, eachData) => {
    if (!season[eachData.Games]) {
      season[eachData.Games] = [];
      season[eachData.Games].push(eachData.Name);
    } else if (!season[eachData.Games].includes(eachData.Name)) {
      season[eachData.Games].push(eachData.Name);
    }

    return season;
  }, {});
  return medalWinnerPerSeason;
}; // Helper


exports.allMedalWinnersFromIndiaPerSeason = allMedalWinnersFromIndiaPerSeason;

const countryWiseFilter = (athleteData, NOC) => athleteData.filter(data => data.NOC === NOC && data.Medal !== 'NA'); // console.log(allMedalWinnersFromIndiaPerSeason(athleteData));
// ------------------fifth function ends here-----------------------//
// /-------------------Third Function starts here ------------------------///


const maleAndFemaleParticipationForDecades = athleteData => {
  const maleAndFemaleEachGames = athleteData.reduce((game, eachGame) => {
    if (!game[eachGame.Games]) {
      game[eachGame.Games] = {};
      game[eachGame.Games].IDs = {};
      game[eachGame.Games].IDs[eachGame.ID] = 1;
      game[eachGame.Games].M = eachGame.Sex === 'M' ? 1 : 0;
      game[eachGame.Games].F = eachGame.Sex === 'F' ? 1 : 0;
    } else if (!game[eachGame.Games].IDs[eachGame.ID]) {
      game[eachGame.Games].IDs[eachGame.ID] = 1;
      game[eachGame.Games][eachGame.Sex] += 1;
    }

    return game;
  }, {}); // return maleAndFemaleEachGames;

  const maleAndFemaleInDecade = decadeConverter(maleAndFemaleEachGames);
  const maleAndFemaleInDecadeInAscendingOrder = sortAscendingDecade(maleAndFemaleInDecade); // return maleAndFemaleInDecade

  return maleAndFemaleInDecadeInAscendingOrder;
};

exports.maleAndFemaleParticipationForDecades = maleAndFemaleParticipationForDecades;

const decadeConverter = maleAndFemaleEachGames => {
  const decadeWise = Object.keys(maleAndFemaleEachGames).reduce((decadeEach, eachItem) => {
    const decade = `${eachItem.substring(0, 3)}0-${eachItem.substring(0, 3)}9`;

    if (!decadeEach[decade]) {
      decadeEach[decade] = {};
      decadeEach[decade].M = maleAndFemaleEachGames[eachItem].M;
      decadeEach[decade].F = maleAndFemaleEachGames[eachItem].F;
    } else {
      decadeEach[decade].M += maleAndFemaleEachGames[eachItem].M;
      decadeEach[decade].F += maleAndFemaleEachGames[eachItem].F;
    }

    return decadeEach;
  }, {});
  return decadeWise;
}; // Sort ascending decade
// eslint-disable-next-line max-len
// eslint-disable-next-line radix
// eslint-disable-next-line max-len


const sortAscendingDecade = maleAndFemaleInDecade => Object.keys(maleAndFemaleInDecade).sort((a, b) => parseInt(a.substring(0, 4)) - parseInt(b.substring(0, 4))).reduce((decadeEach, item) => {
  decadeEach[item] = maleAndFemaleInDecade[item];
  return decadeEach;
}, {}); // console.log(maleAndFemaleParticipationForDecades(athleteData));
// /--------------------------THird function ends here------------------------///