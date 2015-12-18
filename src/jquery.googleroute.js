/*
 * jQuery Plugin: jQuery GoogleRoute
 * https://github.com/dejanstojanovic/jQuery-GoogleRoute
 * Version 1.0.0
 *
 * Copyright (c) 2015 Dejan Stojanovic (http://dejanstojanovic.net)
 *
 * Released under the MIT license
 */

$.fn.GoogleRoute = function (options) {
    var defaults = {
        destinationLat: 0,
        destinationLng: 0,
        zoom: 6,                           /* Default map zoom if not defined when initiating */
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
    var selector = $(this);
    if ((typeof google !== "undefined" && google !== null ? google.maps : void 0) == null) {
        $.getScript(mapApiUrl);
        window.mapApiLoaded = function () {
            selector.each(function (index) {

                var wrapper = $("<div/>", { "class": "google-wrapper" });
                var overlay = $("<div/>", { "class": "google-map-overlay" });
                var preloader = $("<div/>", { "class": "cssload-container" });

                preloader.append($("<div/>", { "class": "cssload-speeding-wheel" }));
                selector.parent().append(wrapper);
                wrapper.append(overlay);
                overlay.append(preloader);
                selector.prependTo(wrapper);

                var container = selector.get(index);

                if (settings.width == defaults.width) {
                    if ($(container).width() <= 0) {
                        $(container).width(defaults.width);
                    }
                }
                else {
                    $(container).width(settings.width);
                }
                $(overlay).width($(container).width());

                if (settings.height == defaults.height) {
                    if ($(container).height() <= 0) {
                        $(container).height(defaults.height);
                    }
                }
                else {
                    $(container).height(settings.height);
                }
                $(overlay).height($(container).height());

                $(overlay).find(".cssload-container").css("margin-top", (($(overlay).height() - $(preloader)) / 2).toString() + "px");

                initializeGoogleMap(container);
            });
        }
    }

    function initializeGoogleMap(container) {
        var map = null;
        if (settings.destinationLat != 0 && settings.destinationLng != 0) {
            map = new google.maps.Map(container, {
                center: new google.maps.LatLng(settings.destinationLat, settings.destinationLng),
                zoom: settings.zoom,
                zoomControl: settings.zoomControl,
                panControl: settings.panControl,
                scaleControl: settings.scaleControl,
                streetViewControl: settings.streetViewControl,
                scrollwheel: settings.scrollWheel,
                styles: settings.style
            });
            var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer;
            directionsDisplay.setMap(map);

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {

                    directionsService.route({
                        origin: new google.maps.LatLng(settings.destinationLat, settings.destinationLng),
                        destination: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                        waypoints: [],
                        optimizeWaypoints: true,
                        travelMode: google.maps.TravelMode.DRIVING
                    }, function (response, status) {
                        if (status === google.maps.DirectionsStatus.OK) {
                            directionsDisplay.setDirections(response);
                            selector.parent().find(".google-map-overlay").fadeOut("slow", function () {
                                this.remove();
                            });
                        } else {
                            console.error('Directions request failed due to ' + status);
                        }
                    });

                });
            } else {
                console.log("Geolocation is not supported by this browser or not allowed by the user.");
            }
        }
        else {
            console.error("Destination coordinates not set");
        }


    }



}
