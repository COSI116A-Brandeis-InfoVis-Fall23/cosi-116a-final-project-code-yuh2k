// Immediately Invoked Function Expression to limit access to our 
// variables and prevent 
((() => {

  const width = 1000;
        const height = 750;

        const svg = d3.select("#vis-holder").append("svg")
            .attr("width", width)
            .attr("height", height);

        const projection = d3.geoAlbersUsa()
            .translate([-400, height / 2 + 400])
            .scale(3000);

        const path = d3.geoPath().projection(projection);

        d3.json("data/2023.json").then(function(topojsonData) {
            const geojsonData = topojson.feature(topojsonData, topojsonData.objects.states); // 使用 TopoJSON 的方法转换

            svg.selectAll("path")
                .data(geojsonData.features)
                .enter().append("path")
                .attr("d", path)
                .attr("fill", "steelblue")
                .attr("stroke", "white");
        });

})());