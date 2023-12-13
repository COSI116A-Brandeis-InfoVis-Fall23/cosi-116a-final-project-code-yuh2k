
new_england_states = [
    "Connecticut", "Maine", "Massachusetts", 
    "New Hampshire", "Rhode Island", "Vermont"
]

new_england_data = {"type": "Topology", "objects": {"states": {"type": "GeometryCollection", "geometries": []}}}

with open(file_path, 'r') as file:
    data = json.load(file)
    geometries = data['objects']['states']['geometries']

    for geometry in geometries:
        if geometry['properties']['STATENAM'] in new_england_states:
            new_england_data['objects']['states']['geometries'].append(geometry)

output_path = '/mnt/data/new_england_states.json'

with open(output_path, 'w') as outfile:
    json.dump(new_england_data, outfile)

output_path