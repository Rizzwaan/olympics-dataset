const pieChartForOlympicHostedPerCity = (data) => {
  const dataFormatted = Object.keys(data).reduce((acc, item) => {
    acc.push({ name: item, y: data[item] });
    return acc;
  }, []);
  Highcharts.chart('container1', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Browser market shares in January, 2018'
    },
    tooltip: {
        pointFormat: '<b>{point.name:.0f}</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.y:.0f}  '
            }
        }
    },
    series: [{
        name: 'Brands',
        colorByPoint: true,
        data: dataFormatted,
    }],
});
};

fetch('../../output/olympicsHostedPerNoc.json')
  .then(response => response.json())
    .then(data => pieChartForOlympicHostedPerCity(data))
       .catch((err) => err ?  console.log(err) : console.log("success"));
    
//-----second function----------


const stackedColumnChartForMedalWonEachCountry = (data) => {
  const formattedData = formatStackedColumnData(data); 
 // console.log(formattedData);
 Highcharts.chart('container2', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Stacked column chart'
    },
    xAxis: {
        categories: formattedData.categories
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Total fruit consumption'
        },
        stackLabels: {
            enabled: true,
            style: {
                fontWeight: 'bold',
                color: ( // theme
                    Highcharts.defaultOptions.title.style &&
                    Highcharts.defaultOptions.title.style.color
                ) || 'gray'
            }
        }
    },
    legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false
    },
    tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    },
    plotOptions: {
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: true
            }
        }
    },
    series: formattedData.formatFinal,
});
}; 

const formatStackedColumnData = (dataObj) => {
   const categories = Object.keys(dataObj);
    const medalList = {
        "Gold": [],
        "Silver": [],
        "Bronze": [],
    };

    
    Object.keys(dataObj).forEach(item => {
        medalList["Gold"].push(dataObj[item]["Gold"]);
        medalList["Silver"].push(dataObj[item]["Silver"]);
        medalList["Bronze"].push(dataObj[item]["Bronze"]);
    })     
    let formatFinal = ["Gold","Silver","Bronze"].reduce((acc,item) => {
          acc.push({"name": item, data : medalList[item]});
          return acc;
    }, []);
    return {categories, formatFinal};
} 


fetch('../../output/topTenCountriesWonMedalAfter2000.json')
  .then(response => response.json())
    .then(data => stackedColumnChartForMedalWonEachCountry(data))
      .catch((err) => console.log("error occured"));


// male femal participation over decade;

const columnGraphForMaleFemaleParticipation = ( data ) => {
    const formattedData = formatColumnData(data);
    
    Highcharts.chart('container3', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Monthly Average Rainfall'
        },
        subtitle: {
            text: 'Source: WorldClimate.com'
        },
        xAxis: {
            categories: formattedData.categories,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Rainfall (mm)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: formattedData.formatFinal
    });
}

const formatColumnData = (dataObj) => {
    const categories = Object.keys(dataObj);
    const maleFemaleList = {
        "Male" : [],
        "Female": [],
    }
      categories.forEach(item => {
        maleFemaleList["Male"].push(dataObj[item]["M"]);
        maleFemaleList["Female"].push(dataObj[item]["F"])
    })

     const formatFinal = ["Male","Female"].reduce((acc,item) => {
          acc.push({"name": item, "data": maleFemaleList[item]});
          return acc;
     },[]);    
 

    return {categories,formatFinal};
}

fetch('../../output/overDecadeParticipationMaleAndFemale.json')
  .then(response => response.json())
    .then(data => columnGraphForMaleFemaleParticipation(data) )
      .catch((err) => console.log("error occured in function 3"));


// Forth line chart 

const lineChartForAverageAgeAthlete = (data) => {
    const formattedData = [{name: "Average Age", data: Object.values(data)}];
    const years = Object.keys(data);
    console.log(formattedData);
    console.log(years);
    Highcharts.chart('container4', {

        title: {
            text: 'Solar Employment Growth by Sector, 2010-2016'
        },
    
        subtitle: {
            text: 'Source: thesolarfoundation.com'
        },
    
        yAxis: {
            title: {
                text: 'Number of Employees'
            }
        },
        xAxis: {
            title: {
              text: 'Years',
            },
            categories: years,
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
    
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                
            }
        },
    
        series: formattedData,
    
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    
    });
    
}


fetch('../../output/averageAgeAthletePerYer.json')
  .then((response) => response.json())
    .then((data) => lineChartForAverageAgeAthlete(data))
      .catch((err) => console.log("Error occured"));



//  fifth function

const tableVisual = document.querySelector('#table-visual');


fetch('../../output/medalWinnersIndiaPerSeason.json').then((res) => res.json()).then((data) =>  dataVisualization(data,tableVisual));



function dataVisualization(data,tableVisual) {
  let output ="";
  for(let year in data){
   
    output += `<div class="games"> 
    <h2 class="year-each">${year}</h2>
    <ul class="table-head">`
    for(let i =0; i<  data[year].length; i++){
      output += `<li class="table-head-item">${data[year][i]}</li>`
    }
    output += `</ul></div>`
  }
  tableVisual.innerHTML = output;
}
