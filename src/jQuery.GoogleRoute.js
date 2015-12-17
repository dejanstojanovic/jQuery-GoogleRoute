$.fn.GoogleRoute = function (options) {
    var defaults = {
        finishLatitude: 0,
        finishLongitue: 0,
        zoom: 13,                           /* Default map zoom if not defined when initiating */
        width: 800,                         /* Map width. If not set then container width will be used*/
        height: 400,                        /* Map height. If not set then container height will be used*/
        language: "en",                     /* List of supported languages https://spreadsheets.google.com/spreadsheet/pub?key=0Ah0xU81penP1cDlwZHdzYWkyaERNc0xrWHNvTTA1S1E&gid=1 */
        zoomControl: true,                  /* Show zoom control */
        panControl: true,                   /* Show pan control */
        scaleControl: true,                 /* Show scale on the map */
        streetViewControl: true,            /* Show street view control */
        scrollWheel: false,					/* Use mouse wheel to zoom in and zoom out*/
        style: null                         /* Use customized style from https://snazzymaps.com/ */
    }
    var settings = $.extend({}, defaults, options);
    var mapApiUrl = "//maps.googleapis.com/maps/api/js?callback=mapApiLoaded";

    if ((typeof google !== "undefined" && google !== null ? google.maps : void 0) == null) {
        $.getScript(mapApiUrl);
        window.mapApiLoaded = function () {
            selector.each(function (index) {
                initializeGoogleMap(selector.get(index));
            });
        }
    }

    function initializeGoogleMap(container) {
        var map = null;
        map = new google.maps.Map(container, {
            center: new google.maps.LatLng(settings.finishLatitude, settings.finishLongitue),
            zoom: settings.zoom,
            zoomControl: settings.zoomControl,
            panControl: settings.panControl,
            scaleControl: settings.scaleControl,
            streetViewControl: settings.streetViewControl,
            scrollwheel: settings.scrollWheel,
            styles: settings.style
        });

        //map.setOptions({ scrollwheel: settings.scrollWheel });

        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        directionsDisplay.setMap(map);

        calculateAndDisplayRoute(null);
        
    }

    function calculateAndDisplayRoute(destination) {

        this.directionsService.route({
            origin: new google.maps.LatLng(settings.finishLatitude, settings.finishLongitude),
            destination: new google.maps.LatLng(25.0766, 55.1408),
            waypoints: [],
            optimizeWaypoints: true,
            travelMode: google.maps.TravelMode.DRIVING
        }, function (response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                this.directionsDisplay.setDirections(response);
                /*
                var route = response.routes[0];
                var summaryPanel = document.getElementById('directions-panel');
                summaryPanel.innerHTML = '';
                // For each route, display summary information.
                for (var i = 0; i < route.legs.length; i++) {
                    var routeSegment = i + 1;
                    summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
                        '</b><br>';
                    summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
                    summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
                    summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
                }
                */
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }

}
