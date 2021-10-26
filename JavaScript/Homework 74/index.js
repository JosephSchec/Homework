(function () {
    "use strict";
    //const container = $('#mainContainer'); //need for setToPage
    const search = $('#search');
    const searchBtn = $('#btn');
    let myArray = [];

    $(() => {
        $(search).focus();
    });

    function getImages(tag) {
        $.getJSON(`https://api.flickr.com/services/feeds/photos_public.gne?
        tags=${tag}&format=json&jsoncallback=?`)
            .then(data => {
                data.items.forEach(el => {
                    const seperateJpg = el.media.m.split('.');
                    const jpg = seperateJpg[2];
                    const loseTheEm = jpg.substring(0, jpg.length - 2);
                    let putTogetherAgain = el.media.m.replace(jpg, loseTheEm);
                    myArray.push({ title: el.title, url: putTogetherAgain });
                });
                //setTopage();
                setCarousel();
            });
    }

   /* function setTopage() {
        let val = search.val();
        if (val !== '') {
            search.val('');
            container.empty();
            myArray.forEach(item => {
                $(`<figure>
                        <img class="img" id="${item.title}" src="${item.url}" onerror="${$(this).css('display', 'none')}">
                        <figcaption>${item.title}</figcaption>
                    </figure>`).appendTo(container);
                myArray = [];
            });
        }
    }*/
    function middleOfCarousel(num) {

        const center = $('#centerContainer');
        $('#default').hide();
        $('#previous').show();
        center.show();
        $('#next').show();
        center.empty();
        return $(`<figure>
         <img class="img" id="${myArray[num].title}" src="${myArray[num].url}">
         <figcaption>${myArray[num].title}</figcaption>
     </figure> `).appendTo(center);
    }
    function setCarousel() {
        let val = search.val();
        if (val !== '') {
            search.val('');
            $('#centerContainer').empty();

            let i = 0;
            $('#centerContainer').empty();
            console.log('i = ', i);
            middleOfCarousel(i);
            $('#previous').click(() => {
                if (i - 1 < 0) {
                    i = myArray.length - 1;
                    middleOfCarousel(i);
                } else {
                    middleOfCarousel(i - 1);
                    i -= 1;
                }
            });
            $('#next').click(() => {
                if (i + 1 > myArray.length - 1) {
                    i = 0;
                    middleOfCarousel(i);
                } else {
                    middleOfCarousel(i + 1);
                    i += 1;
                }
            });
        }
    }


    searchBtn.click(function () {
        myArray = [];
        getImages(search.val());
    });

}());

