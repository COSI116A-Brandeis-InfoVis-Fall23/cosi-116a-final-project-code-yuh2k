const width = 1000;
const height = 750;

// Create and append the SVG element to the visualisation holder
const svg = d3.select(".vis-holder").append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .attr("width", "100%")
    .attr("height", "100%");

// Set up the map projection
const projection = d3.geoAlbersUsa()
    .translate([-1100, 1100]) 
    .scale(3000 * 1.8);

// Add click event listeners to year buttons
document.querySelectorAll(".year").forEach(button => {
    button.addEventListener("click", function(){
        const year = this.getAttribute('data-year');
        updateMapColor(year);
    })
});

// Function to update the map color based on the selected year
function updateMapColor(year) {
    console.log("Updating map color for year:", year);
    let data = data_source[year] || {}; 
    svg.selectAll("path")
        .attr("fill", function(d) {
            const regionName = getName(d);
            const dataValue = data[regionName] || 0; 
            return getColor(dataValue);
        });
}

// Function to display area chart for a state
function displayAreaChart(state){
    console.log("Displaying state chart for:", state)
    svg.append("svg")
}

// Define the path using the projection
const path = d3.geoPath().projection(projection);

// Data source for different years
const data_source = {
    "2014": {
        "Connecticut": 17.8,
        "Maine": 17.1,
        "Massachusetts": 20.8,
        "New Hampshire": 26.2,
        "Vermont": 14.4,
        "Rhode Island": 24
    },
    "2015": {
        "Connecticut": 23.0,
        "Maine": 20.9,
        "Massachusetts": 27.2,
        "New Hampshire": 32.5,
        "Vermont": 17.7,
        "Rhode Island": 30.1
    },
    "2016": {
        "Connecticut": 27.9,
        "Maine": 27.7,
        "Massachusetts": 34.9,
        "New Hampshire": 37.1,
        "Vermont": 21.0,
        "Rhode Island": 31.2
    },
    "2017": {
        "Connecticut": 30.7,
        "Maine": 33.2,
        "Massachusetts": 33.9,
        "New Hampshire": 35.7,
        "Vermont": 23.2,
        "Rhode Island": 30.4
    },
    "2018": {
        "Connecticut": 30.9,
        "Maine": 27.2,
        "Massachusetts": 34.6,
        "New Hampshire": 34.8,
        "Vermont": 25.7,
        "Rhode Island": 31
    },
    "2019": {
        "Connecticut": 35.4,
        "Maine": 29.1,
        "Massachusetts": 33.5,
        "New Hampshire": 30.9,
        "Vermont": 22.8,
        "Rhode Island": 29.5
    },
    "2020": {
        "Connecticut": 40.3,
        "Maine": 38.0,
        "Massachusetts": 35.5,
        "New Hampshire": 29.4,
        "Vermont": 32.1,
        "Rhode Island": 38.5
    },
};

// Function for mouseout event on map regions
function handleMouseOver(d, i) {
    
    d3.select(this)
      .transition()
      .duration(50)
      .attr('transform', 'scale(1.01)')
      .attr('stroke-width', '1px');
}

// Function for mouseout event on map regions
function handleMouseOut(d, i) {
    d3.select(this)
      .transition()
      .duration(50)
      .attr('transform', 'scale(1)')
      .attr('stroke-width', '0.5px');
}



const getName = d => d.properties.STATENAM;

function getColor(dataValue) {
    if (dataValue < 15) {
        return "#eff3ff"; // Very light blue
    } else if (dataValue < 17.5) {
        return "#bdd7e7"; // Light blue
    } else if (dataValue < 20) {
        return "#6baed6"; // Moderate blue
    } else if (dataValue < 22.5) {
        return "#3182bd"; // Blue
    } else if (dataValue < 25) {
        return "#08519c"; // Dark blue
    } else if (dataValue < 27.5) {
        return "#fdae6b"; // Light orange
    } else if (dataValue < 30) {
        return "#fd8d3c"; // Moderate orange
    } else if (dataValue < 32.5) {
        return "#f16913"; // Orange
    } else if (dataValue < 35) {
        return "#d94801"; // Dark orange
    } else if (dataValue < 40) {
        return "#fc3903"; // Red
    } else {
        return "#7f2704"; // Very dark brown, approaching severity
    }
}


let geojsonData;

d3.json("data/2023.json").then(function(topojsonData) {
    geojsonData = topojson.feature(topojsonData, topojsonData.objects.states); // 在这里赋值
    geojsonData.features.forEach(function(d) {
        console.log(getName(d));
    });
    svg.selectAll("path")
        .data(geojsonData.features)
        .enter().append("path")
        .attr("d", path)
        .attr("fill", function(d) {
            const regionName = getName(d);
            const dataValue = data_source["2015"][regionName] || 0; 
            return getColor(dataValue);
        })
        .attr("stroke", "white")
        .on("mouseover", handleMouseOver) // mouse move in
        .on("mouseout", handleMouseOut) // mouse move out
        .on("click", function(event, d) {
            console.log("click on " + d);
            const stateName = getName(d);
            updateLineChart(stateName);
        });

    updateMapColor("2015"); // initialize map color
})

// Line chart settings
const plotMargin = {top: 10, right: 30, bottom: 30, left: 60},
    plotWidth = 460 - plotMargin.left - plotMargin.right,
    plotHeight = 400 - plotMargin.top - plotMargin.bottom;

// Append SVG element for line chart in the visualisation holder
const plotSvg = d3.select(".vis-holder").append("svg")
    .attr("width", plotWidth + plotMargin.left + plotMargin.right)
    .attr("height", plotHeight + plotMargin.top + plotMargin.bottom)
    .append("g")
    .attr("transform", "translate(" + plotMargin.left + "," + plotMargin.top + ")");

// Add a title element for the x-axis
plotSvg.append("text")
    .attr("x", plotWidth / 2) // Centered horizontally
    .attr("y", plotHeight + 30) // Positioned below the x-axis (adjust the 30 as needed)
    .style("text-anchor", "middle")
    .style("font-size", "14px") // Set font size to a moderate level
    .text("Drug Overdose Mortality from 2014-2020");

// Function to extract mortality rate data for each state each year
function getStateData(state) {
    return Object.keys(data_source).map(year => {
      return {
        year: year,
        value: data_source[year][state] || 0
      };
    });
  }
  
// Create x-axis and y-axis for the line chart
const years = Object.keys(data_source);
const x = d3.scaleBand()
    .range([0, plotWidth])
    .domain(years)
    .padding(0.2);

const y = d3.scaleLinear()
    .domain([0, d3.max(Object.values(data_source), yearData => {
        return d3.max(Object.values(yearData), d => d);
})])
.range([plotHeight, 0]);

// Add x-axis label
plotSvg.append("text")             
    .attr("transform", "translate(" + (plotWidth/2) + " ," + (plotHeight + plotMargin.bottom - 10) + ")")
    .style("text-anchor", "middle")
    .text("Year");

// Add y-axis label
plotSvg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - plotMargin.left)
    .attr("x",0 - (plotHeight / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Mortality Crude Rate (%)");


// Add a title element for the plot chart
const plotTitle = plotSvg.append("text")
    .attr("x", plotWidth / 2)
    .attr("y", -10) // Adjust the position based on your layout
    .style("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold");

// Function to update the line chart
function updateLineChart(state) {
    console.log("Updating line chart for state:", state);

    // Update the title with the name of the selected state
    plotTitle.text(state + " Drug Overdose Crude Rate");

    let stateData = getStateData(state);
  
    plotSvg.selectAll("*").remove(); // remove all drawings

    plotSvg.append("g")
      .attr("transform", "translate(0," + plotHeight + ")")
      .call(d3.axisBottom(x));
  
    plotSvg.append("g")
      .call(d3.axisLeft(y));
  
    plotSvg.append("path")
      .datum(stateData)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.year); })
        .y(function(d) { return y(d.value); })
      );
}
  

// Event handler for clicking on states on the map
svg.selectAll("path").on("click", function(event, d) {
    const stateName = getName(d);
    updateLineChart(stateName); // Update line chart
});

// Initialize the map and line chart colors/data
updateMapColor("2014"); // Set map color for 2014 data
updateLineChart("Connecticut"); // Initialize line chart for Connecticut