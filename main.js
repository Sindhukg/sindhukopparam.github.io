import {casesOverview} from './overview.js';
import {casesStates} from './state.js';
//import {casesCounties} from './county.js';

var current_slide =1;
var previous_slide =0;
var data = 0;
function loadCountyData(){

    if (data===0){
        d3.csv('./data/states.csv')
            .then(loadedData => {
                data = loadedData;
                data.forEach(d => {
//                  d.county = d.state + ',' + d.county;
                    d.age = +d.age;
                    d.deaths = +d.deaths;
                    var datesplit = d.date.split("-");
                    d.date = new Date(datesplit[1]+'-'+datesplit[2]+"-"+datesplit[0]);
                    //d.date = new Date(d.date);
                });

            });
        };

};
function previousButtonClick(){
    const prevButton = document.getElementById("P");
    const nextButton = document.getElementById("N");

    if (current_slide === 3){
        current_slide = 2
        previous_slide = 1;
        nextButton.disabled = false;

        casesByStates();

    } else if (current_slide === 2){
        current_slide = 1
        previous_slide = 0;
        nextButton.disabled = false;
        prevButton.disabled = true;

        overview();

    } else if (current_slide === 1){
        previous_slide = 0;
    };
};

function nextButtonClick(){
    const prevButton = document.getElementById("P");
    const nextButton = document.getElementById("N");

    previous_slide = current_slide;
    current_slide = current_slide + 1
    nextButton.disabled = false;

    if (current_slide === 3){
        nextButton.disabled = true;
        casesByCounty();
    };
    prevButton.disabled = false;

    // Call the neccessary function
    if (current_slide === 2){
        casesByStates();
    };
};

function overview() {
    //addHtml();
    const prevButton = document.getElementById("P");
    prevButton.disabled = true;
    current_slide = 1;

    const nextButton = document.getElementById("N");
    nextButton.disabled = false;

    /*
    const button1 = document.getElementById("1");
    button1.disabled = true;
    const button2 = document.getElementById("2");
    button2.disabled = false;
    const button3 = document.getElementById("3");
    button3.disabled = false;
    */

    loadCountyData();
    casesOverview();
};

function deathsByStates() {

    //const prevButton = document.getElementById("P");
    //prevButton.disabled = true;

    current_slide = 2;
    const nextButton = document.getElementById("N");
    nextButton.disabled = false;

    /*
    const button1 = document.getElementById("1");
    button1.disabled = false;
    const button2 = document.getElementById("2");
    button2.disabled = true;
    const button3 = document.getElementById("3");
    button3.disabled = false;
    */

    list.textContent = "Select State    ";
    deathsStates();
};

window.main = overview();

document.getElementById("P").onclick = previousButtonClick;
document.getElementById("N").onclick = nextButtonClick;

//document.getElementById("1").onclick = overview;
//document.getElementById("2").onclick = casesByStates;
//document.getElementById("3").onclick = casesByCounty;
//document.getElementById("N").onclick = nextButtonClick;

export {data};