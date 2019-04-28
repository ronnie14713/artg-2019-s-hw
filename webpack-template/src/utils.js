import * as d3 from 'd3';

//Utility functions for parsing transData
function parsetransData(d){
  
  return{
    geoid_2: +d.geoid_2,
    geography: d.geo_display,
    total_population: +d.HC01_EST_VC01,
    age_group: [
                 {'16-19': +d.HC01_EST_VC03},
                 {'20-24': +d.HC01_EST_VC04},
                 {'25-44': +d.HC01_EST_VC05},
                 {'45-54': +d.HC01_EST_VC06},
                 {'55-59': +d.HC01_EST_VC07},
                 {'60+': +d.HC01_EST_VC08}    
               ],
    median_age: +d.HC01_EST_VC10,
    earnings_group: [
                      {'1-9999': +d.HC01_EST_VC42},
                      {'10000-14999': +d.HC01_EST_VC43},
                      {'15000-24999': +d.HC01_EST_VC44},
                      {'25000-34999': +d.HC01_EST_VC45},
                      {'35000-49999': +d.HC01_EST_VC46},
                      {'50000-64999': +d.HC01_EST_VC47},
                      {'65000-74999': +d.HC01_EST_VC48},
                      {'75000+': +d.HC01_EST_VC49}
                    ],
    median_earnings: +d.HC01_EST_VC51,
    industries_group: [
                        {'argriculture': +d.HC01_EST_VC69},
                        {'construction': +d.HC01_EST_VC70},
                        {'manufacturing': +d.HC01_EST_VC71},
                        {'wholesale trade': +d.HC01_EST_VC72},
                        {'retail trade': +d.HC01_EST_VC73},
                        {'transportation&warehouse': +d.HC01_EST_VC74},
                        {'information&finance': +d.HC01_EST_VC75},
                        {'professional&scientific services': +d.HC01_EST_VC76},
                        {'healthcare&educational&social assistance': +d.HC01_EST_VC77},
                        {'entertainment&recreation': +d.HC01_EST_VC78},
                        {'public administration': +d.HC01_EST_VC80},
                        {'armed forces': +d.HC01_EST_VC81},
                        {'other services': +d.HC01_EST_VC79}                      
                      ],
    time_group: [{'10': +d.HC01_EST_VC103},
                 {'10-14': +d.HC01_EST_VC104},
                 {'15-19': +d.HC01_EST_VC105},
                 {'20-24': +d.HC01_EST_VC106},
                 {'25-29': +d.HC01_EST_VC107},
                 {'30-34': +d.HC01_EST_VC108},
                 {'35-44': +d.HC01_EST_VC109},
                 {'45-59': +d.HC01_EST_VC110},
                 {'60+': +d.HC01_EST_VC111}                
    ],
    mean_time: +d.HC01_EST_VC112

    //backup as follows
    // travel_time_work_10: +d.HC01_EST_VC103,
    // travel_time_work_10_14: +d.HC01_EST_VC104,
    // travel_time_work_15_19: +d.HC01_EST_VC105,
    // travel_time_work_20_24: +d.HC01_EST_VC106,
    // travel_time_work_25_29: +d.HC01_EST_VC107,
    // travel_time_work_30_34: +d.HC01_EST_VC108,
    // travel_time_work_35_44: +d.HC01_EST_VC109,
    // travel_time_work_45_59: +d.HC01_EST_VC110,
    // travel_time_work_60: +d.HC01_EST_VC111, 
    
    // age_16_19: +d.HC01_EST_VC03,
    // age_20_24: +d.HC01_EST_VC04,
    // age_25_44: +d.HC01_EST_VC05,
    // age_45_54: +d.HC01_EST_VC06,
    // age_55_59: +d.HC01_EST_VC07,
    // age_60: +d.HC01_EST_VC08,
    
    // earnings_1_9999: +d.HC01_EST_VC42,
    // earnings_10000_14999: +d.HC01_EST_VC43,
    // earnings_15000_24999: +d.HC01_EST_VC44,
    // earnings_25000_34999: +d.HC01_EST_VC45,
    // earnings_35000_49999: +d.HC01_EST_VC46,
    // earnings_50000_64999: +d.HC01_EST_VC47,
    // earnings_65000_74999: +d.HC01_EST_VC48,
    // earnings_75000: +d.HC01_EST_VC49,

    // agriculture: +d.HC01_EST_VC69,
    // construction: +d.HC01_EST_VC70,
    // manufacturing: +d.HC01_EST_VC71,
    // wholesale_trade: +d.HC01_EST_VC72,
    // retail_trade: +d.HC01_EST_VC73,
    // transportation_warehouse: +d.HC01_EST_VC74,
    // information_finance_realestate: +d.HC01_EST_VC75,
    // professional_scientific_waste_services: +d.HC01_EST_VC76,
    // educational_healthcare_social_assistance: +d.HC01_EST_VC77,
    // arts_entertainment_recreation_accommodation_food_services: +d.HC01_EST_VC78,
    // other_services_no_public_administration: +d.HC01_EST_VC79,
    // public_administration: +d.HC01_EST_VC80,
    // armed_forces: +d.HC01_EST_VC81,
    
  }
}

  export {
      parsetransData
  }