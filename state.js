import {displayChart} from './lineplot.js';
import {dropdownMenu} from './dropdownMenu.js';

var defaultState = 'Florida';

//var data;
function displayStates(data) {
    let options = [...new Set(data.map(d => d.state))].sort();
    var selectedData = data.filter(d => { return d.state == defaultState});
    displayChart(selectedData);

    dropdownMenu(d3.select('#list'),{
        options: options,
        onOptionClicked: state => {
            defaultState = state;
            var selectedData = data.filter(d => { return d.state == state});
            displayChart(selectedData);
        },
        selectedOption:defaultState
    });
}

function casesStates(){

    d3.select("#Overview").style("display","none");
    d3.select("#By_State").style("display","block");
    d3.select("#Cause_of_Death").style("display","none");
    d3.select("#list").style("display","block");

    d3.csv('./data/states.csv')
        .then(loadedData => {
            let data = loadedData;
            data.forEach(d => {
                d.age = +d.age;
                d.deaths = +d.deaths;
                var datesplit = d.date.split("-");
                d.date = new Date(datesplit[1]+'-'+datesplit[2]+"-"+datesplit[0]);
                //d.date = new Date(d.date);


            });
            displayStates(data);
        });
};

export {casesStates,defaultState}