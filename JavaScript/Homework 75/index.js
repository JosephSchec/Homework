/*global google */
(function () {
    "use strict";
    async function loadPlaces() {
        const response = await fetch(`http://api.geonames.org/wikipediaSearchJSON?q=${$('#search').val()}&maxRows=10&username=shecky`);
        if (!response.ok) {
            throw new Error('NOT FOUND');
        }
        return await response.json();
    }
    let location = { lat: 40.10890698677386, lng: -74.2177383733953 };
    new google.maps.StreetViewPanorama(document.getElementById("pano"), {
        position: location,
    });

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: location,
    });
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
            });

            const bounds = new google.maps.LatLngBounds();
            bounds.extend(placeLocation);
            map.fitBounds(bounds);
            map.setZoom(9);
        });
        $(`.place`).on('click', function () {
            place.forEach(p => {
                if (this.id === p.title) {
                    $('#pano').empty();
                    new google.maps.StreetViewPanorama(document.getElementById("pano"), {
                        position: { lat: p.lat, lng: p.lng },
                    });
                }
            });
        });
    }

    $('#go').click(() => {
        setPages();
    });
}());