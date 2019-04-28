import {
parsetransData
} from './utils';

import {csv, nest} from 'd3';


//Promise 
const transDataPromise = csv('./data/table_1.csv', parsetransData);


const dataCombined = transDataPromise.then(transData => {
  
  const dataEdited = transData.map(d => {
    return d;
  })

  return dataEdited;
});


export {
  transDataPromise,
  dataCombined
  }













//!!!(need to set as "_" for tooltip selection)
//filter a specific county to begin the project
// let countyID = 1001;

//find function can lookup a certain data array
// const findIt = transData.find(function (d){      
//   return d.geoid_2 === countyID;

// })
// console.log(findIt);
  


//!!call these functions for graphs drawing preparation
// const ageG = ageGroups(findIt);
// const earningsG = earningsGroups(findIt);
// const industriesG = industriesGroups(findIt);
// const travelTimeG = travelTimeGroups(findIt);






//setup an array of ageGroups(!there is a median age in the data)
// function ageGroups(data) {
//   const ageGroups = [
//       {'16-19': data.age_16_19},
//       {'20-24': data.age_20_24},
//       {'25-44': data.age_25_44},
//       {'45-54': data.age_45_54},
//       {'55-59': data.age_55_59},
//       {'60+': data.age_60}          
//     ];       

  // console.log(ageGroups);
  
  
  // return ageGroups;      
  //   }



//setup an array of earningsGroups(!there is a median earning in data.median_earnings)
// function earningsGroups(data){
//   const earningsGroups = [
//     {'$1-$9,999': data.earnings_1_9999},
//     {'$10,000-$14,999': data.earnings_10000_14999},
//     {'$15,000-$24,999': data.earnings_15000_24999},
//     {'$25,000-$34,999': data.earnings_25000_34999},
//     {'$35,000-$49,999': data.earnings_35000_49999},
//     {'$50,000-$64,999': data.earnings_50000_64999},
//     {'$65,000-$74,999': data.earnings_65000_74999},
//     {'$75,000+': data.earnings_75000}        
//   ];

  // console.log(earningsGroups);

//   return earningsGroups;
  
// }



//setup an array of industriesGroups
// function industriesGroups(data){
//   const industriesGroups = [
//     {'agriculture': data.agriculture},
//     {'armed forces': data.armed_forces},
//     {'recreation services': data.arts_entertainment_recreation_accommodation_food_services},
//     {'construction': data.construction},
//     {'educational&healthcare services': data.educational_healthcare_social_assistance},
//     {'information&finance': data.information_finance_realestate},
//     {'manufacturing': data.manufacturing},
//     {'other services(no public administration)': data.other_services_no_public_administration},
//     {'professional&scientific services': data.professional_scientific_waste_services},
//     {'public administration': data.public_administration},
//     {'retail trade': data.retail_trade},
//     {'transportation&warehouse': data.transportation_warehouse},
//     {'wholesale trade': data.wholesale_trade} 
//   ];

  // console.log(industriesGroups);

//   return industriesGroups;


// }



//setup an array of travelTimeGroups
// function travelTimeGroups (data){
//   const travelTimeGroups = [
//     {'10': data.travel_time_work_10},
//     {'10-14': data.travel_time_work_10_14},
//     {'15-19': data.travel_time_work_15_19},
//     {'20-24': data.travel_time_work_20_24},
//     {'25-29': data.travel_time_work_25_29},
//     {'30-34': data.travel_time_work_30_34},
//     {'35-44': data.travel_time_work_35_44},
//     {'45-59': data.travel_time_work_45_59},
//     {'60+': data.travel_time_work_60}
//   ];

  // console.log(travelTimeGroups);

  // return travelTimeGroups;


// }


  // });

  







//under this line, not relevant to current project
//Other than const an array which includes the requested data, 
//can also use push method to load a certain data array each time(low effiecient)
//like following:
//   ageGroups.push({ 
//       'age_16_19': +data.age_16_19,

//   })
//   ageGroups.push({
//     'age_20_24': +data.age_20_24,

// })