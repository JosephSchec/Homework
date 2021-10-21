(function () {
    "use strict";

    const container = $('#container');

    async function loadJson() {
        const mainResponse = await fetch('vids.json');
        if (!mainResponse.ok) {
            throw new Error('not found');
        }
        return await mainResponse.json();
    }

    async function setMainPage() {
        const mainJson = await loadJson();
        mainJson.forEach(item => {
            if (item.img === "") {
                item.img = "/media/noImg.png";
            }
            $(`<div id="row">
                <img class="img" id="${item.title}Img" src="${item.img}" alt="">
                <p id="decription">${item.title}</p>
               </div>`).appendTo(container);

            $(`#${item.title}Img`).click(() => {
                videoPage(item.title);
            });
        });
    }

    setMainPage();

    async function videoPage(name) {
        const mainJson = await loadJson();
        mainJson.forEach(item => {
            if (name === item.title) {
                container.empty();
                $(`<video id="video" src="${item.url}" controls autoplay></video>
                <button id="back">back</button>`)
                    .appendTo(container);
            }
            $('#back').click(() => {
                container.empty();
                setMainPage();
            });
        });
    }

}());