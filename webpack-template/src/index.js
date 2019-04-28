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


