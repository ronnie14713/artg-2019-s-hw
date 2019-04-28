import './index.css';
import * as d3 from 'd3';
import 'bootstrap/dist/css/bootstrap.css';

import {
  transDataPromise,
  dataCombined  
} from './data';

//modules
import barChart from './viewModules/barChart';


//global variables
let countyCode = 1001;

console.log(dataCombined);
//global dispatch object
const globalDispatch = d3.dispatch("change:county"); //the dispatch event name is "change:country"

//registered event "change:county"
globalDispatch.on("change:county", (code, displayName) => {
  countyCode = code;

  title.html(displayName); //it is a function which is declared later

  //pass the requested data by .then() to update view-modules together
  dataCombined.then(data => {
    const filteredData = data.filter(d => d.geoid_2 === countyCode);
    console.log(filterData);

    renderBarChart(filteredData); //will set up renderBarChart() later
  });
});



//Data import
dataCombined.then(() => 
  globalDispatch.call(
    "change:county",
    null,
    1001,
    "Autauga County, Alabama"
  ));

//remember to make a new map for dataCode, and also has to define dataCode later
dataCombined.then(dataCode => renderMenu(dataCode)); 


/*
Update view modules
*/

//Build title components 
const title = d3.select('.county-view')
                .insert('bar_chart') //remember to align with the div in index.html to make sure insert the right place
                .html('Counties');

/*set up render function*/
function renderBarChart(data) {
  const maxValue = _; //leave it blank right now and to make a map to import earnings data

  const barChart = BarChart() //really careful about the uppercase and lowercase here
    .maxY(maxValue)
    // .onChangeCounty(
    //   county => globalDispatch.call('change:county', null, )
    // )

    const charts = d3.select('.bar_chart')
                     .selectAll('.chart')
                     .data(data, d => d.key); 
    const chartsEnter = charts.enter()
                              .append('div')
                              .attr('class', 'chart');
    charts.exit().remove();

    charts.merge(chartsEnter)
          .each(d => {
              barChart(
                d.values,
                this,
                d.key
              );
          });   
}

function renderMenu(countyCode){
  const countyList = Array.from(countyCode.entriese());

  let menu = d3.select('.nav')
               .selectAll('select')
               .data([1]);

  menu = menu.enter()
             .append('select')
             .attr('class', 'form-control form control-sm')
             .merge(menu);


  menu.selectAll('option')
      .data(countylist)
      .enter()
      .append('option')
      .attr('value', d => d[1])
      .html(d => d[0]);
      
  menu.on('change', () => {
    const code = this.value;
    const idx = this.selectedIndex;
    const display = this.options[idx].innerHTML;
    globalDispatch.call('change:country', null, code, display);
  });
}