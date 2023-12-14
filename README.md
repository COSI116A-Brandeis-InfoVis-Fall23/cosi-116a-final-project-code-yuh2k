# Project Team Graduate 5: Opioid Epidemic, COSI 116A F23

## Overview

This project, developed by Hang Yu, Yuanhuan Deng, Sunny Zhou, and Ye Xu, is part of COSI 116A: Information Visualization, taught by Prof. Dylan Cashman at Brandeis University. Our motivation stems from the increasing awareness and impact of the opioid crisis, especially concerning substances like fentanyl. This crisis affects communities universally, and our aim is to provide visualizations that assist policymakers in understanding and addressing the epidemic by comparing regional data and trends from 2014 to 2020.
Website: https://cosi116a-brandeis-infovis-fall23.github.io/cosi-116a-final-project-code-yuh2k/

### Visualization

Our project focuses on an interactive presentation of drug overdose trends in the New England region, spanning from 2014 to 2020. The centerpiece of this visualization is a dynamic regional map, allowing users to gain an overview of drug usage patterns. By selecting a specific state, users can access detailed, year-wise usage statistics through an interactive line chart.

The visualization utilizes D3.js to create a New England Map, highlighting drug overdose rates over the specified years. Users can click on different years and states to observe changes in mortality. The 'crude rate' is a critical metric presented, calculated as the percentage of drug overdose deaths relative to the total population, multiplied by 10,000.
<img width="705" alt="截屏2023-12-13 下午11 42 57" src="https://github.com/COSI116A-Brandeis-InfoVis-Fall23/cosi-116a-final-project-code-yuh2k/assets/113553401/388b0c13-1c57-4cea-8a13-ef256c9cba1f">

## Data Analysis

Our data comprises two parts: substance usage data and maps. The data was sourced from the WONDER database and the National Survey on Drug Use and Health (NSDUH), focusing on percentages and totals of illicit drug and pain reliever usages per state. The dataset, titled "Underlying Cause of Death, 2014-2020.csv," is categorized by various parameters, facilitating our visualization process.

Additionally, a script (extract_new_england.py) was written to generate the JSON file for the map creation.

## Design Process
The design process involved creating a map and a graph to illustrate population trends over time, incorporating color to depict the progression of deaths due to drug overdose.

## Conclusion
Over the weeks, our team has successfully aggregated data, decided on visualization methods, and actively coordinated through discussions and meetings. We recognize areas for improvement, such as revising the color scheme for better clarity and balancing the coding workload.

## GitHub Pages Website
https://cosi116a-brandeis-infovis-fall23.github.io/cosi-116a-final-project-code-yuh2k/
    
