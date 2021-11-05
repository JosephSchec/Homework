/*global google */
(function () {
    "use strict";
    async function loadPlaces() {
        try {
            const response = await fetch(`http://api.geonames.org/wikipediaSearchJSON?q=${$('#search').val()}&maxRows=10&username=shecky`);
            if (!response.ok) {
                throw new Error('NOT FOUND');
            }
            return await response.json();
        } catch (error) {
            console.log(error);
        }

    }

    let location = { lat: 40.10890698677386, lng: -74.2177383733953 };

    new google.maps.StreetViewPanorama(document.getElementById("pano"), {
        position: location,
    });

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: location,
    });

    const bounds = new google.maps.LatLngBounds();

    async function setPages() {
        $('#pano').empty();
        const places = await loadPlaces();
        const place = places.geonames;
        place.forEach(plc => {
            $('#pano').css('overflow-y', 'auto');
            $(`<div id="${plc.title}" class="place"><img id="imgPLace"src="${plc.thumbnailImg}" alt="">${plc.summary}</div>`).appendTo($('#pano'));
            const placeLocation = { lat: plc.lat, lng: plc.lng };

            const marker = new google.maps.Marker({
                position: placeLocation,
                icon: {
                    url: plc.thumbnailImg,
                    scaledSize: new google.maps.Size(50, 50)
                },
                map: map,
                title: plc.title
            });

            const infoWindow = new google.maps.InfoWindow();
            marker.addListener('click', () => {
                infoWindow.setContent(`
                <h1>${plc.title}</h1>
                <img id="imgPLace"src="${plc.thumbnailImg}" alt="">
                <br>
                <a href="https://${plc.wikipediaUrl}" target="_blank">more info</a>`);
                infoWindow.open(map, marker);
                $("#pano").empty();
                new google.maps.StreetViewPanorama(document.getElementById("pano"), {
                    position: { lat: plc.lat, lng: plc.lng },
                });
            });

            bounds.extend(placeLocation);

            map.setZoom(9);
        });

        map.fitBounds(bounds);

        $(`.place`).on('click', function () {
            place.forEach(p => {
                if (this.id === p.title) {
                    $('#pano').empty();
                    new google.maps.StreetViewPanorama(document.getElementById("pano"), {
                        position: { lat: p.lat, lng: p.lng },
                    });
                    map.panTo({ lat: p.lat, lng: p.lng });
                }
            });
            $('#back').css('display', 'block');
        });
    }

    $('#go').click(() => {
        setPages();
    });
    $('#back').click(() => {
        $('#pano').empty();
        setPages();
        $('#back').css('display', 'none');
    });

    const drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.MARKER,
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.BOTTOM_CENTER,
            drawingModes: [
                google.maps.drawing.OverlayType.MARKER,
                google.maps.drawing.OverlayType.CIRCLE,
                google.maps.drawing.OverlayType.POLYGON,
                google.maps.drawing.OverlayType.POLYLINE,
                google.maps.drawing.OverlayType.RECTANGLE,
            ],
        },
        markerOptions: {
            icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png", editable: true
        },
        circleOptions: {
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
            clickable: false,
            editable: true,
            zIndex: 1,
        },
    });

    drawingManager.setMap(map);

    //MARKER
    const markerArr = JSON.parse(localStorage.getItem("markerArr")) || [];

    google.maps.event.addListener(drawingManager, 'markercomplete', e => {
        const markerJSON = { position: { lat: e.getPosition().lat(), lng: e.getPosition().lng() } };
        markerArr.push(markerJSON);
        localStorage.setItem('markerArr', JSON.stringify(markerArr));
    });

    if (localStorage.markerArr) {
        const markerData = localStorage.getItem('markerArr');
        for (let x = 0; x < JSON.parse(localStorage.getItem("markerArr")).length; x++) {
            const mark = JSON.parse(markerData);
            let pos = mark[x];
            new google.maps.Marker({
                position: pos.position,
                map: map,
                editable: true,
            });
        }
    }

    //CIRCLE
    const circleArr = JSON.parse(localStorage.getItem("circleArr")) || [];

    google.maps.event.addListener(drawingManager, 'circlecomplete', e => {
        const circleJSON = { center: e.getCenter(), radius: e.getRadius() };
        circleArr.push(circleJSON);
        localStorage.setItem('circleArr', JSON.stringify(circleArr));

    });

    if (localStorage.circleArr) {
        const circleData = localStorage.getItem('circleArr');
        for (let x = 0; x < JSON.parse(circleData).length; x++) {
            const circ = JSON.parse(circleData);
            let pos = circ[x];
            new google.maps.Circle({
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#FF0000",
                fillOpacity: 0.35,
                map,
                center: pos.center,
                radius: pos.radius,
                editable: true,
            });
        }
    }

    //RECTANGLE
    const rectangleArr = JSON.parse(localStorage.getItem("rectangleArr")) || [];

    google.maps.event.addListener(drawingManager, 'rectanglecomplete', e => {
        const rectangleJSON = { north: e.getBounds().getNorthEast().lat(), south: e.getBounds().getSouthWest().lat(), east: e.getBounds().getNorthEast().lng(), west: e.getBounds().getSouthWest().lng() };
        rectangleArr.push(rectangleJSON);
        localStorage.setItem('rectangleArr', JSON.stringify(rectangleArr));

    });

    if (localStorage.rectangleArr) {
        const rectangleData = localStorage.getItem('rectangleArr');
        for (let x = 0; x < JSON.parse(rectangleData).length; x++) {
            const rect = JSON.parse(rectangleData);
            let pos = rect[x];
            new google.maps.Rectangle({
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#FF0000",
                fillOpacity: 0.35,
                map,
                bounds: {
                    north: pos.north,
                    south: pos.south,
                    west: pos.west,
                    east: pos.east
                }, editable: true
            });
        }
    }

    //POLYGON
    const polygonArr = JSON.parse(localStorage.getItem("polygonArr")) || [];

    google.maps.event.addListener(drawingManager, 'polygoncomplete', e => {
        const polygonJSON = { path: e.getPath().td };
        polygonArr.push(polygonJSON);
        localStorage.setItem('polygonArr', JSON.stringify(polygonArr));

    });

    if (localStorage.polygonArr) {
        const polygonData = localStorage.getItem('polygonArr');
        for (let x = 0; x < JSON.parse(polygonData).length; x++) {
            const poly = JSON.parse(polygonData);
            let pos = poly[x];
            new google.maps.Polygon({
                paths: pos.path,
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#FF0000",
                fillOpacity: 0.35,
                map,
                editable: true,
            });
        }
    }
    //POLYLINE
    const polylineArr = JSON.parse(localStorage.getItem("polylineArr")) || [];

    google.maps.event.addListener(drawingManager, 'polylinecomplete', e => {
        const polylineJSON = { path: e.getPath().td };

        polylineArr.push(polylineJSON);
        localStorage.setItem('polylineArr', JSON.stringify(polylineArr));

    });

    if (localStorage.polylineArr) {
        const polylineData = localStorage.getItem('polylineArr');
        for (let x = 0; x < JSON.parse(polylineData).length; x++) {
            const polyL = JSON.parse(polylineData);
            let pos = polyL[x];
            new google.maps.Polyline({
                path: pos.path,
                geodesic: true,
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 2,
                map,
                editable: true,
            });
        }
    }

}());