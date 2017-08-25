$(function(){

	let center = [-36.8446152873055,174.76662397384644];

	let map = L.map('map').setView(center,12);

	L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGhhbHl4OTAiLCJhIjoiY2o2YjdrZHRlMWJmYjJybDd2cW1rYnVnNSJ9.j_DQLfixHfhioVjH6qmqkw').addTo(map);
	

	let geoJsonLayer = L.geoJson(schools,{
		style:function(){
			return {
				fillColor:'yellow',
				fillOpacity:0.2,
				weight:0,
				className:'school-zone'
			}
		}
	}).addTo(map);



	let layerGroup = L.layerGroup().addTo(map);

	map.on('click',function(e){

		layerGroup.clearLayers();

		let location = e.latlng;
		var results = leafletPip.pointInLayer(location, geoJsonLayer);

		_(results).each(function(polygon){

			let schoolPolygon = L.polygon(polygon._latlngs,{
				color:'red',
				weight:1
			});

			let centroid = schoolPolygon.getBounds().getCenter();
			let marker = L.marker(centroid).bindPopup(polygon.feature.properties.SCHOOLNAME);
			layerGroup.addLayer(schoolPolygon).addLayer(marker);
		});

	});

	
});












