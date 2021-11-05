(async function () {
    "use strict";
    let dragging = false;
    let offset;
    let z = 1;
    let top = 50;
    let left = 0;
    const pictures = JSON.parse(localStorage.getItem('picture')) || [];
    let pic;
    try {
        const r = await fetch('pics.json');
        if (!r.ok) {
            throw new Error('NOT FOUND');
        }
        const j = await r.json();
        j.eyes.forEach(url => {
            $(`<img src="${url}" alt="" class="part" id="${url.split('/')[1].split('.')[0]}" style=" top: ${top}px; left: ${left += 55}px;">`).appendTo($('#parts'));
        });
        j.ears.forEach(url => {
            $(`<img src="${url}" alt="" class="part" id="${url.split('/')[1].split('.')[0]}" style=" top: ${top}px; left: ${left += 35}px;">`).appendTo($('#parts'));
        });
        j.mouth.forEach(url => {
            $(`<img src="${url}" alt="" class="part" id="${url.split('/')[1].split('.')[0]}" style=" top: ${top + 75}px; left: ${left -= 85}px;">`).appendTo($('#parts'));
        });
        j.nose.forEach(url => {
            $(`<img src="${url}" alt="" class="part" id="${url.split('/')[1].split('.')[0]}" style=" top: ${top += 75}px; left: ${left - 75}px;">`).appendTo($('#parts'));
        });
        j.other.forEach(url => {
            $(`<img src="${url}" alt="" class="part" id="${url.split('/')[1].split('.')[0]}" style=" top: ${top += 35}px; left: ${left += 35}px;">`).appendTo($('#parts'));
        });
    } catch (error) {
        console.error(error);
    }
    if (localStorage.picture) {
        const data = JSON.parse(localStorage.getItem('picture'));
        for (let i = 0; i < data.length; i++) {
            $(`#${data[i].target}`).css(data[i].style);
        }
    }



    $(document).on('mousedown', '.part ,#pBody', e => {
        e.preventDefault();
        offset = { x: e.offsetX, y: e.offsetY };
        dragging = $(e.target);
        dragging.css('z-index', `${z++}`);
    })
        .mousemove(e => {
            if (dragging) {

                dragging.css({ top: e.pageY - offset.y, left: e.pageX - offset.x });
            }
        }).mouseup(e => {
            if (dragging) {
                pic = { target: dragging[0].id, style: { top: e.pageY - offset.y, left: e.pageX - offset.x, zIndex: e.target.style.zIndex } };
                dragging = null;
                pictures.push(pic);
                localStorage.setItem('picture', JSON.stringify(pictures));
            }
        });

}());