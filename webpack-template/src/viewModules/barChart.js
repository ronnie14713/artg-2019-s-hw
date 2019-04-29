import * as d3 from 'd3';
import {
    dataCombined
} from '../data';

//a barchart about age composition by county
function BarChart(){
    let maxY;
    let countyChangeCallback;
    

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
        const svg = d3.select(rootDOM)
                      .classed('.bar_chart', true)
                      .append('svg')
                      .attr('width', W)
                      .attr('height', H);

        svg.selectAll('rect');
           
                      

     


        

        




          

    }

    exportFunction.maxY = function(_){
		maxY = _;
		return this;
	}

	exportFunction.onChangeCounty = function(callback){
		//event ==> "county:change"
		//callback ==> arg => console.log(arg)
		countyChangeCallback = callback; //arg => console.log(arg)
		return this;
	}

    return exportFunction;




}



export default BarChart;