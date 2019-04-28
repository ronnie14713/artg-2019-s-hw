import * as d3 from 'd3';
import {
    dataCombined
} from '../data';





//a barchart about age composition by county
function barChart(){
    let maxY;
    

    function exportFunction(rootDOM, data){
        

        const W = rootDOM.clientWidth;
        const H = rootDOM.clientHeight;
        const margin = {t:32, r:32, b:64, l:64};
        const innerWidth = W - margin.l - margin.r;
        const innerHeight = H - margin.t - margin.b;

        const scaleX =_; //!! might not need
        const scaleY = d3.scaleLinear()
                         .domain([0, maxY])
                         .range([innerHeight, 0]);   


        //append svg
        const svg = d3.select('#bar_chart')
                      .append('svg')
                      .attr('width', W)
                      .attr('height', H);

        svg.selectAll('rect')
           .data(data, function(d){
               return 
           })
                      

     


        

        




          

    }

    return exportFunction;




}



export default barChart;