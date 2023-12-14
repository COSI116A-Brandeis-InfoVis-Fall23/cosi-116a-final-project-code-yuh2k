New England Drug Overdose Visualization


Files

linechart.js: Implements a reusable line chart using D3.js, modeled after Mike Bostock's framework. This file sets up the chart's margins, dimensions, scales, axes, and data points.
visualization.js: Contains the main script to render a dynamic map of the New England region and an interactive line chart. This file integrates data to show yearly trends in drug overdoses per state, and updates the visualization based on user interactions.
Features

Dynamic Map: Displays opiate usage trends across New England states, with color variations representing the intensity of drug overdose cases.
Interactive Line Chart: Shows year-wise drug overdose trends for a selected state. The line chart updates upon clicking a state on the map.
Data Integration: Combines geojson and statistical data to provide a comprehensive view of the opiate crisis.
Usage

To run the visualization:

Include both JavaScript files in your HTML project.
Ensure D3.js and TopoJSON libraries are correctly referenced.
Call the functions from these scripts to render the map and line chart in your designated HTML elements.