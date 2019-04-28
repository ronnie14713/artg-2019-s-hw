// configurations start:{
//weight, height
const w = d3.select('.plot')
			.node()
			.clientWidth;

const h = d3.select('.plot')
			.node().clientHeight;
//year
const year = 2017;
//the size of nodes
const radius_set = 6;

//the other force configurations are shown in the control panel on the webpage.
// } end

//the possible configurations for force-layout are change the text
//, change the color
//,add a specific link between node A and the compatible node B
//,etc.



//globalDispatch
const dispatch = d3.dispatch('update:force');

//dat.gui library for displaying UI
const gui = new dat.gui.GUI();
const obj = {
	useForceX: true,
	useForceY: true,
	useForceLink: true,
	useForceManyBody: true,
	forceManyBodyStrength: -1,
	useForceCollide: true,
	forceCollideRadius: 11
	
} //configurations for force-layout

const f1 = gui.addFolder('Force X');
f1.add(obj, 'useForceX').onChange(() => dispatch.call('update:force', null, obj));
const f2 = gui.addFolder('Force Y');
f2.add(obj, 'useForceY').onChange(() => dispatch.call('update:force', null, obj));
const f3 = gui.addFolder('Force Many Body');
f3.add(obj, 'useForceManyBody').onChange(() => dispatch.call('update:force', null, obj));
f3.add(obj, 'forceManyBodyStrength').min(-30)
									.max(5)
									.onChange(() => dispatch.call('update:force', null, obj));
const f4 = gui.addFolder('Force Collide');
f4.add(obj, 'useForceCollide').onChange(() => dispatch.call('update:force', null, obj));
f4.add(obj, 'forceCollideRadius').min(0)
								 .max(20)
								 .onChange(() => dispatch.call('update:force', null, obj));
const f5 = gui.addFolder('Force Link');
f5.add(obj, 'useForceLink').onChange(() => dispatch.call('update:force', null, obj));


//Import data
const migrationDataPromise = d3.csv('../../data/un-migration/Table 1-Table 1.csv', parseMigrationData)
	.then(data => data.reduce((acc,v) => acc.concat(v), []));
console.log(migrationDataPromise);

//Set dom attributes			
const plot1 = d3.select('#plot-1')
				.append('svg')
				.attr('width',w)
				.attr('height',h);


//setup nodesData, linksData
migrationDataPromise
	.then(data => { return generateNetwork(data,year); }) //configurable: change the year's value here to get different year's data
	.then(({nodesData, linksData}) => {
		console.log(linksData);
		console.log(nodesData);
		//these two Data come from generateNetwork(data, 2017);

		//Initially position nodes
		nodesData.forEach(d => {
			d.x = w/2;
			d.y = h/2;
		});

		//Some basic data discovery
		const maxLinkValue = d3.max(linksData, d => d.value);
		const distScale = d3.scaleLog().domain([maxLinkValue, 1]).range([3,300]);

		//Draw nodes
		let nodes = plot1.selectAll('.node')
			.data(nodesData, d => d.name);
		let nodesEnter = nodes.enter()
			.append('g')
			.attr('class', 'node');
		nodesEnter.append('circle').attr('r', radius_set)
			.style('stroke', '#333')
			.style('stroke-width', '2px')
			.style('fill-opacity', 0.1);
		nodesEnter.append('text')
			.attr('text-anchor', 'middle')
			.style('font-family', 'sans-serif')
			.style('font-size', '15px');
		nodes = nodes.merge(nodesEnter);
		nodes
			.on('mouseenter', function(d){
				d3.select(this)
				  .select('text')
				  .text(d.name);
				d3.select(this)
				  .select('circle')
				  .style('fill-opacity', 1)
				  .style('fill', 'yellow');
			})
			.on('mouseleave', function(d){
				d3.select(this)
				  .select('text')
				  .text('');
				d3.select(this)
				  .select('circle')
				  .style('fill-opacity', 0.1)
				  .style('fill', null);
			});

		//Force simulation
		const simulation = d3.forceSimulation();

		//forces
		const forceXDefault = d3.forceX().x(d => w/2);
		const forceX = d3.forceX().x(d => {
			if(d.in > d.out){
				return w/4
			}else{
				return w*3/4;
			}
		});
		const forceY = d3.forceY().y(d => h/2);
		const forceManyBody = d3.forceManyBody()
			.strength(-1);
		const forceLink = d3.forceLink()
			.distance(d => distScale(d.value))
			.links(linksData);
		const forceCollide = d3.forceCollide()
			.radius(8);

		//Add forces to simulation
		simulation
			.force('x', forceX)
			.force('y', forceY)
			.force('manyBody', forceManyBody)
			.force('link', forceLink)
			.force('collide', forceCollide)
			.nodes(nodesData)
			.on('tick', () => {
				nodes.attr('transform', d => `translate(${d.x}, ${d.y})`)
			});

		dispatch.on('update:force', params => {

			//Update forces based on incoming parameters
			if(params.useForceX){
				simulation.force('x', forceX)
			}else{
				simulation.force('x', forceXDefault);
			}

			if(params.useForceY){
				simulation.force('y', forceY);
			}else{
				simulation.force('y', null);
			}

			if(params.useForceManyBody){
				forceManyBody.strength(params.forceManyBodyStrength);
				simulation.force('manyBody', forceManyBody);
			}else{
				simulation.force('manyBody', null);
			}

			if(params.useForceCollide){
				forceCollide.radius(params.forceCollideRadius);
				simulation.force('collide', forceCollide);
			}else{
				simulation.force('collide', null);
			}

			if(params.useForceLink){
				simulation.force('link', forceLink);
			}else{
				simulation.force('link', null);
			}

			simulation
				.alpha(1)
				.restart();

		});

	});

//Converts origin destination flows to nodes and links
function generateNetwork(data, year){
		//Filter for a specific year
		let flowsByYear = data.filter(d => d.year === year);

		const nodes = new Map();
		const links = [];
		//Iterate through flowsByYear
		//for each flow, look up the origin and destination nodes from the map
		flowsByYear.forEach(flow => {
			const {origin_name, dest_name, value} = flow;
			const link = {};
			
			//starts to push required data into the linkData and nodesData
			let originNode = nodes.get(origin_name);
			if(originNode){
				//if that node already exists...
				originNode.out += value;
				originNode.outFlows.push(link);
				link.source = originNode;
			}
			else{
				//if that node doesn't exist, create the node, and add it to the map
				originNode = {
					name: origin_name,
					out: value,
					outFlows: [link],
					in: 0,
					inFlows: []
				};
				nodes.set(origin_name, originNode);
				link.source = originNode;
			}

			let destNode = nodes.get(dest_name);
			if(destNode){
				destNode.in += value;
				destNode.inFlows.push(link);
				link.target = destNode;
			}else{
				destNode = {
					name: dest_name,
					out: 0,
					outFlows: [],
					in: value,
					inFlows: [link]
				};
				nodes.set(dest_name, destNode);
				link.target = destNode;
			}

			link.value = value;
			links.push(link);
		});

		return {
			nodesData: Array.from(nodes.values()),
			linksData: links
		}
}


function parseMigrationData(d){
	if(+d.Code >= 900) return;

	const migrationFlows = [];
	const dest_name = d['Major area, region, country or area of destination'];
	const year = +d.Year
	
	delete d.Year;
	delete d['Sort order'];
	delete d['Major area, region, country or area of destination'];
	delete d.Notes;
	delete d.Code;
	delete d['Type of data (a)'];
	delete d.Total;

	for(let key in d){
		const origin_name = key;
		const value = d[key];

		if(value !== '..'){
			migrationFlows.push({
				origin_name,
				dest_name,
				year,
				value: +value.replace(/,/g, '')
			})
		}
	}

	return migrationFlows;
}
