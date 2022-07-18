import {displayChart} from './lineplot.js';

function casesOverview(){

    d3.select("#Overview").style("display","block");
    d3.select("#By_State").style("display","none");
    d3.select("#Cause_of_Death").style("display","none");

    d3.csv('./data/overview.csv')
        .then(data => {
            data.forEach(d => {
                d.age = +d.age;
                d.deaths = +d.deaths;
                var datesplit = d.date.split("-");
                d.date = new Date(datesplit[1]+'-'+datesplit[2]+"-"+datesplit[0]);
                //d.date = new Date(d.date);
        });
        //var max = d3.max(data, function(d) { return d.date; });
        //console.log(data)

    displayChart(data);

    });
};

export {casesOverview}