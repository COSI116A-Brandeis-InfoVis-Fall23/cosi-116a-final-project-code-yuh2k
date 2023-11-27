const width = 1000;
const height = 750;

const svg = d3.select(".vis-holder").append("svg")
    .attr("width", width)
    .attr("height", height);

const projection = d3.geoAlbersUsa()
    .translate([-400, 700])
    .scale(3000);

const path = d3.geoPath().projection(projection);

const data1 = {
    "Vermont": 10,
    "New Hampshire": 50,
    "Maine": 109,
    "Rhode Island": 93,
    "Connecticut": 344,
    "Massachusetts": 496
};

const getName = d => d.properties.STATENAM;

function getColor(dataValue) {
    if (dataValue < 50) {
        return "blue";
    } else if (dataValue < 200) {
        return "green";
    } else if (dataValue < 400) {
        return "yellow";
    } else {
        return "red";
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
});
