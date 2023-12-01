const width = 1000;
const height = 750;

const svg = d3.select(".vis-holder").append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .attr("width", "100%")
    .attr("height", "100%");

const projection = d3.geoAlbersUsa()
    .translate([-700,700])
    .scale(3000);

document.querySelectorAll(".year").forEach(button => {
    button.addEventListener("click", function(){
        const year = this.getAttribute('data-year');
        updateMapColor(year);
    })
});

function updateMapColor(year) {
    console.log("Updating map color for year:", year);
    let data;
    switch(year) {
        case "2014": data = data_source[2014]; break;
        case "2015": data = data_source[2015]; break;
        case "2016": data = data_source[2016]; break;
        case "2017": data = data_source[2017]; break;
        case "2018": data = data_source[2018]; break;
        case "2019": data = data_source[2019]; break;
        case "2020": data = data_source[2020]; break;
        default: data = {};
    }
    svg.selectAll("path")
        .attr("fill", function(d) {
            const regionName = getName(d);
            const dataValue = data[regionName] || 0; 
            return getColor(dataValue);
        });
}
function displayAreaChart(state){
    console.log("Displaying state chart for:", state)
    svg.append("svg")
}

const path = d3.geoPath().projection(projection);

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


d3.json("data/2023.json").then(function(topojsonData) {
    const geojsonData = topojson.feature(topojsonData, topojsonData.objects.states);
    geojsonData.features.forEach(function(d) {
        console.log(getName(d));
    });
    svg.selectAll("path")
        .data(geojsonData.features)
        .enter().append("path")
        .attr("d", path)
        .attr("fill", function(d) {
            const regionName = getName(d);
            const dataValue = data1[regionName] || 0; 
            return getColor(dataValue);
        })
        .attr("stroke", "white");
        updateMapColor("2015"); 
});

// var svg_indv = d3.select(".vis-holder")
//                     .append("svg")
//                     .attr("width", width + margin.left + margin.right)
//                     .attr("height", height + margin.top + margin.bottom)
//                     .append("g")
//                     .attr("transform",
//                         "translate(" + margin.left + "," + margin.top + ")");

// specific state line chart
d3.csv("data/Fatal Data/Underlying Cause of Death, 2014-2020.csv", 
    function(d){
        return { year : d3.timeParse("%Y")(d.Year), value : d.Deaths}
    },
    svg.selectAll("path")
    .data(geojsonData.features)
    .enter().append("path")
    .attr("d", path))
