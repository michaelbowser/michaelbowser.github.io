<!-- create popup when wssi sites centerpoint object is clicked -->
        var highlightLayer;
        function highlightFeature(e) {
            highlightLayer = e.target;
            highlightLayer.openPopup();
        }
        var map = L.map('map', {
            zoomControl:false, maxZoom:16, minZoom:7
        }).setView([38.904722,-77.016389],9);
		
		L.control.zoom({
			position:'bottomright'}).addTo(map);
        
        var feature_group = new L.featureGroup([]);
        
        var raster_group = new L.LayerGroup([]);
        var basemap = L.tileLayer('http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
            maxZoom: 16
        });
        basemap.addTo(map);
        var initialOrder = new Array();
        var layerOrder = new Array();
        function stackLayers() {
            for (index = 0; index < initialOrder.length; index++) {
                map.removeLayer(initialOrder[index]);
                map.addLayer(initialOrder[index]);
            }
           
        }
        function restackLayers() {
            for (index = 0; index < layerOrder.length; index++) {
                layerOrder[index].bringToFront();
            }
        }
        layerControl = L.control.layers({},{},{collapsed:false});
          function pop_ProjectSites0(feature, layer) {
            var popupContent = '<table><tr><th scope="row">Project Number: </th><td>' + (feature.properties['MMCount'] !== null ? Autolinker.link(String(feature.properties['MMCount'])) : '') + '</td></tr></table>';
			layer.bindPopup(popupContent);
        }
        function doStyleProjectSites0() {
            return {
                radius: 5.0,
                fillColor: '#52ea8c',
                color: '#000000',
                weight: 1.0,
                opacity: 1.0,
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                fillOpacity: 1.0
            }
        }
		// currently unused variable to add image symbology if necessary
		var icon = L.icon({
			iconUrl: 'WSSI-Legend - Copy.png'
		})
		
        function doPointToLayerProjectSites0(feature, latlng) {
            return L.circleMarker(latlng, doStyleProjectSites0())
        }
        var json_ProjectSites0JSON = new L.geoJson(json_ProjectSites0, {
            onEachFeature: pop_ProjectSites0, 
            pointToLayer: doPointToLayerProjectSites0
            });
			
		
		// create a wssi sites polygon object from json file and add as geoJSON file to leaflet
		// disclaimer: wssi sites data was simplified using a 500' search radius to remove vertices
		var json_sitesSmooth5000 = new L.geoJson(json_sitesSmooth5000)
		
		
		var sitesPolyStyle = {
			"weight": 0,
			"color": "#52ea8c",
			"fillOpacity": .7,
			"fillColor": '#52ea8c'
		};
		
		json_sitesSmooth5000.setStyle(sitesPolyStyle)
		
		
		// add json object to map
		json_sitesSmooth5000.addTo(map)
		
		var overlayMaps = {
			"Cities": json_sitesSmooth5000
		};
        var cluster_groupProjectSites0JSON = new L.MarkerClusterGroup({showCoverageOnHover: false});
        cluster_groupProjectSites0JSON.addLayer(json_ProjectSites0JSON);
        layerOrder[layerOrder.length] = cluster_groupProjectSites0JSON;
        initialOrder[initialOrder.length] = cluster_groupProjectSites0JSON;
        cluster_groupProjectSites0JSON.addTo(map);
        raster_group.addTo(map);
        feature_group.addTo(map);
		
		var southWest = L.latLng(39.681988, -75.935048),
			northEast = L.latLng(35.247897, -86.158289),
			boundsGeo = L.latLngBounds(southWest, northEast);
		
        var osmGeocoder = new L.Control.OSMGeocoder({
            collapsed: true,
            position: 'topright',
            text:'Search Address',
			bounds: boundsGeo,
        });
        osmGeocoder.addTo(map);
        var baseMaps = {'Black & White Basemap': basemap};
		L.control.layers(baseMaps,{'<img src="legend/ProjectSites0.png" /> WSSI Project Information': cluster_groupProjectSites0JSON,'<img src="legend/siteCoverage.png" /> WSSI Project Area': json_sitesSmooth5000,},{collapsed:true, position:'topleft'}).addTo(map);
		//L.control.layers(json_sitesSmooth5000).addTo(map);
        L.control.scale({options: {position: 'bottomleft', maxWidth: 100, metric: true, imperial: false, updateWhenIdle: false}}).addTo(map);
        stackLayers();
        map.on('overlayadd', restackLayers);
		
		
		//northern virginia office marker and label
		var myIcon = L.icon({
			iconUrl: 'marker-icon.png',	
			labelAnchor: [20, 0] 
		});		
		var myMarker1 = L.marker([38.796005, -77.601065], {
			icon: myIcon
			}).bindLabel('<b><center>Wetland Studies and Solutions, Inc.</br>Northern Virginia Office</center></b>', {
			noHide: true,
			direction: 'auto'
		});	
		map.on('zoomend ', function(e) {
			if (map.getZoom() < 16){map.removeLayer(myMarker1)}
 				else if(map.getZoom() >= 16) {map.addLayer(myMarker1)}});
				
		//southwestern virginia office marker and label
		var myIcon = L.icon({
			iconUrl: 'marker-icon.png',	
			labelAnchor: [20, 0] 
		});		
		var myMarker2 = L.marker([37.264927, -79.977214], {
			icon: myIcon
			}).bindLabel('<b><center>Wetland Studies and Solutions, Inc.</br>Southwestern Virginia Office</center></b>', {
			noHide: true,
			direction: 'auto'
		});	
		map.on('zoomend ', function(e) {
			if (map.getZoom() < 16){map.removeLayer(myMarker2)}
 				else if(map.getZoom() >= 16) {map.addLayer(myMarker2)}});
				
		
		//maryland office marker and label
		var myIcon = L.icon({
			iconUrl: 'marker-icon.png',	
			labelAnchor: [20, 0] 
		});		
		var myMarker3 = L.marker([39.094354, -76.635033], {
			icon: myIcon
			}).bindLabel('<b><center>Wetland Studies and Solutions, Inc.</br>Maryland Office</center></b>', {
			noHide: true,
			direction: 'auto'
		});	
		map.on('zoomend ', function(e) {
			if (map.getZoom() < 16){map.removeLayer(myMarker3)}
 				else if(map.getZoom() >= 16) {map.addLayer(myMarker3)}});
		
		
		