const width = 1000;
const height = 750;

const svg = d3.select(".vis-holder").append("svg")
    .attr("width", width)
    .attr("height", height);

const projection = d3.geoAlbersUsa()
    .translate([-200,700])
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

const path = d3.geoPath().projection(projection);

const data_source = {
    2015: {
        "Vermont": 10,
        "New Hampshire": 50,
        "Maine": 109,
        "Rhode Island": 93,
        "Connecticut": 344,
        "Massachusetts": 496
    },
    2016: {
        "Vermont": 10,
        "New Hampshire": 69,
        "Maine": 186,
        "Rhode Island": 98,
        "Connecticut": 364,
        "Massachusetts": 697
    },
    2017: {
        "Vermont": 14,
        "New Hampshire": 74,
        "Maine": 183,
        "Rhode Island": 113,
        "Connecticut": 475,
        "Massachusetts": 785
    },
    2018: {
        "Vermont": 25,
        "New Hampshire": 108,
        "Maine": 131,
        "Rhode Island": 81,
        "Connecticut": 513,
        "Massachusetts": 934
    },
    2019: {
        "Vermont": 21,
        "New Hampshire": 110,
        "Maine": 173,
        "Rhode Island": 74,
        "Connecticut": 630,
        "Massachusetts": 770
    },
    2020: {
        "Vermont": 46,
        "New Hampshire": 96,
        "Maine": 280,
        "Rhode Island": 109,
        "Connecticut": 767,
        "Massachusetts": 904
    },
};


const getName = d => d.properties.STATENAM;

function getColor(dataValue) {
    if (dataValue < 20) {
        return "#eff3ff"; // Very light blue
    } else if (dataValue < 50) {
        return "#bdd7e7"; // Light blue
    } else if (dataValue < 100) {
        return "#6baed6"; // Moderate blue
    } else if (dataValue < 150) {
        return "#3182bd"; // Blue
    } else if (dataValue < 200) {
        return "#08519c"; // Dark blue
    } else if (dataValue < 300) {
        return "#fdae6b"; // Light orange
    } else if (dataValue < 400) {
        return "#fd8d3c"; // Moderate orange
    } else if (dataValue < 600) {
        return "#f16913"; // Orange
    } else if (dataValue < 800) {
        return "#d94801"; // Dark orange
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
