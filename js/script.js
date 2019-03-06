'use strict';
let citySearch = document.querySelector('.city_search');
let search = document.querySelector('.search');
let mas = [];

let overallDiv = document.querySelector('.overall_div');
let option = document.querySelectorAll('option');
let imgSearch = document.querySelector('.img_search');
let plates = document.querySelector('.plates');
let countrys = document.querySelector('.countrys');
let backModal = document.querySelector('.back_modal');
let modal = document.querySelector('.modal');
let modalImg = document.querySelector('.modal_img');
let modalText = document.querySelector('.modal_text');
let modalMap = document.querySelector('.modal_map');
let modalBathroom = document.querySelector('.modal_bathroom');
let modalBedroom = document.querySelector('.modal_bedroom');
let modalType = document.querySelector('.modal_type');
let modalPrice = document.querySelector('.modal_price');
let close = document.querySelector('.close');
let favouritesBlock = document.querySelector('.favourites_block');
let fav_block = document.querySelector('.plate_favourites');
if (option[0].value === 'UK') {
    window.temp = Countrys.UK;
    window.tempTwo = 'api.nestoria.co.uk';
}
let tempObject = {};


(function f() {
    for (let i=0; i < localStorage.length; i++) {
        tempObject[localStorage.key(i)] = JSON.parse(localStorage.getItem(localStorage.key(i)));
}
})
();

countrys.addEventListener('change', country);
citySearch.addEventListener('input', autocomplete);
imgSearch.addEventListener('click', dataLoad);
favouritesBlock.addEventListener('click', loadStorage);

function country(evt) {
    overallDiv.innerHTML = '';
    citySearch.value = '';
    switch (evt.target.value) {
        case 'Australia':
            window.temp = Countrys.AUSTRALIA;
            window.tempTwo = 'api.nestoria.com.au';
            document.body.style.background = 'url(img/australia.jpg) no-repeat';
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundAttachment = 'fixed';
            plates.innerHTML = '';
            break;
        case 'Brazil':
            window.temp = Countrys.BRAZIL;
            window.tempTwo = 'api.nestoria.com.br';
            document.body.style.background = 'url(img/brazil.jpg) no-repeat';
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundAttachment = 'fixed';
            plates.innerHTML = '';
            break;
        case 'Deutschland':
            window.temp = Countrys.GERMANY;
            window.tempTwo = 'api.nestoria.de';
            document.body.style.background = 'url(img/germany.jpg) no-repeat';
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundAttachment = 'fixed';
            plates.innerHTML = '';
            break;
        case 'Spain':
            window.temp = Countrys.SPAIN;
            window.tempTwo = 'api.nestoria.es';
            document.body.style.background = 'url(img/spain.jpg) no-repeat';
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundAttachment = 'fixed';
            plates.innerHTML = '';
            break;
        case 'France':
            window.temp = Countrys.FRANCE;
            window.tempTwo = 'api.nestoria.fr';
            document.body.style.background = 'url(img/france.jpg) no-repeat';
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundAttachment = 'fixed';
            plates.innerHTML = '';
            break;
        case 'Italy':
            window.temp = Countrys.ITALY;
            window.tempTwo = 'api.nestoria.it';
            document.body.style.background = 'url(img/italy.jpg) no-repeat';
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundAttachment = 'fixed';
            plates.innerHTML = '';
            break;
        case 'Mexico':
            window.temp = Countrys.MEXICO;
            window.tempTwo = 'api.nestoria.mx';
            document.body.style.background = 'url(img/mexico.jpg) no-repeat';
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundAttachment = 'fixed';
            plates.innerHTML = '';
            break;
        case 'UK':
            window.temp = Countrys.UK;
            window.tempTwo = 'api.nestoria.co.uk';
            document.body.style.background = 'url(img/london.jpg) no-repeat';
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundAttachment = 'fixed';
            plates.innerHTML = '';
            break;
    }
}

function autocomplete() {
    overallDiv.innerHTML = '';
    for (let i = 0; i < window.temp.length; i++) {
        if (window.temp[i].toLowerCase().indexOf(citySearch.value) >= 0 || window.temp[i].toUpperCase().indexOf(citySearch.value) >= 0) {
            mas.push(window.temp[i]);
        }
    }
    for (let j = 0; j < mas.length; j++) {
        let autoDiv = document.createElement('div');
        autoDiv.className = 'auto_div';
        autoDiv.style.top = 60 * [j] + 'px';
        autoDiv.style.marginBottom = 10 + 'px';
        autoDiv.innerHTML = mas[j];
        overallDiv.appendChild(autoDiv);
    }
    mas = [];
    let autoDiv = document.querySelectorAll('.auto_div');
    for (let k = 0; k < autoDiv.length; k++) {
        autoDiv[k].addEventListener('click', function (evt) {
            citySearch.value = evt.currentTarget.innerHTML;
            dataLoad();
        });
    }
    if(citySearch.value === ''){
        overallDiv.innerHTML = '';
    }
}


function dataLoad() {
    if (citySearch.value < 1) {
        alert('Введите значение в поле поиска');
    }
    let price = document.querySelectorAll('.price input');
    let priceMin = price[0].value;
    let priceMax = price[1].value;
    let rooms = document.querySelectorAll('.rooms input');
    let roomsMin = rooms[0].value;
    let roomsMax = rooms[1].value;
    let bedrooms = document.querySelectorAll('.bedrooms input');
    let bedroomsMin = bedrooms[0].value;
    let bedroomsMax = bedrooms[1].value;
    let bathroom = document.querySelectorAll('.bathroom input');
    let bathroomMin = bathroom[0].value;
    let bathroomMax = bathroom[1].value;
    let radioBuy = document.querySelector('.radio_buy').checked;
    let radioRent = document.querySelector('.radio_rent').checked;
    let radioBuyVal = document.querySelector('.radio_buy').value;
    let radioRentVal = document.querySelector('.radio_rent').value;
    let citySearchTwo = document.querySelector('.city_search').value.toLowerCase();
    if (radioBuy) {
        addScript("https://" + window.tempTwo + "/api?encoding=json&pretty=1&action=search_listings&listing_type=" + radioBuyVal + "&price_min=" + priceMin + "&price_max=" + priceMax + "&room_min=" + roomsMin + "&room_max=" + roomsMax + "&bathroom_min=" + bathroomMin + "&bathroom_max=" + bathroomMax + "&bedroom_min=" + bedroomsMin + "&bedroom_max=" + bedroomsMax + "&place_name=" + citySearchTwo + "&south_west&north_east&callback=createElement");
    } else {
        addScript("https://" + window.tempTwo + "/api?encoding=json&pretty=1&action=search_listings&listing_type=" + radioRentVal + "&price_min=" + priceMin + "&price_max=" + priceMax + "&room_min=" + roomsMin + "&room_max=" + roomsMax + "&bathroom_min=" + bathroomMin + "&bathroom_max=" + bathroomMax + "&bedroom_min=" + bedroomsMin + "&bedroom_max=" + bedroomsMax + "&place_name=" + citySearchTwo + "&south_west&north_east&callback=createElement");
    }
}

function addScript(src) {
    let wrap = document.body.querySelector('.wrapper');
    let script = document.createElement('SCRIPT');
    script.src = src;
    document.head.appendChild(script);

};

function modalClose() {
    backModal.style.display = 'none';
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
};

function createPlates(obj) {
    let plateBlock = document.createElement('div');
    plateBlock.className = 'plate';

    let plateImg = document.createElement('img');
    plateImg.src = obj.img_url;
    plateImg.style.paddingBottom = '-40px';
    plateBlock.appendChild(plateImg);

    let plateText = document.createElement('div');
    plateText.className = 'plate_text';

    let platePrice = document.createElement('span');
    platePrice.className = 'plate_price';
    platePrice.innerHTML = obj.price_formatted;

    let plateTitle = document.createElement('span');
    plateTitle.className = 'title';
    plateTitle.innerHTML = obj.title;

    let plateDescription = document.createElement('span');
    plateDescription.className = 'plate_description';
    plateDescription.innerHTML = obj.summary;

    plateText.appendChild(platePrice);
    plateText.appendChild(plateTitle);
    plateText.appendChild(plateDescription);
    plateBlock.appendChild(plateText);
    plates.appendChild(plateBlock);

}

modal.addEventListener('click', function (event) {
    if(event.target.className === 'plate_favourites'){
        event.target.src = 'img/favourites_all.png';
        event.target.classList.add('active');
        localStorage.setItem(localStorage)

    } else if(event.target.classList.contains('active')){
        event.target.src = 'img/favourites.png';
        event.target.classList.remove('active');
        console.log(event.target.nextSibling);
        /*for(let key in tempObject){
            if(event.target.parentElement.parentElement.childNodes[9].childNodes[0].nextSibling.innerHTML === tempObject[key]);
        }*/
    }
});

function createElement(result) {
    plates.innerHTML = '';
console.log(result);
    if(result.response.status_text === 'Internal Server Error'){
        plates.innerHTML = result.response.status_text;
    }

    if(result.response.listings.length < 1){
        plates.innerHTML = 'По данном запросу ничего не найдено.';
    }

    for (let i = 0; i < result.response.listings.length; i++) {
        createPlates(result.response.listings[i]);
    }

   let plateMass = document.querySelectorAll('.plate');
    for (let k = 0; k < plateMass.length; k++) {
        plateMass[k].addEventListener('click', function (evt) {
            for (let j = 0; j < result.response.listings.length; j++) {
                if (evt.currentTarget.childNodes[1].childNodes[1].innerHTML === result.response.listings[j].title) {
                    backModal.style.display = 'block';
                    modal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                    let modalTitle = document.querySelector('.modal_title');
                    modalTitle.innerHTML = result.response.listings[j].title;
                    let plateFavourites = document.createElement('img');
                    plateFavourites.classList.add('plate_favourites');
                    plateFavourites.src = 'img/favourites.png';
                    plateFavourites.style.width = '25' + 'px';
                    plateFavourites.style.height = '25' + 'px';
                    plateFavourites.alt = 'Добавить в избранное';
                    fav_block.innerHTML = '';
                    fav_block.appendChild(plateFavourites);
                    modalImg.src = result.response.listings[j].img_url;
                    modalBathroom.innerHTML = result.response.listings[j].bathroom_number;
                    modalBedroom.innerHTML = result.response.listings[j].bedroom_number;
                    modalType.innerHTML = result.response.listings[j].property_type;
                    modalPrice.innerHTML = result.response.listings[j].price_formatted;


                    let centerLatLng = new google.maps.LatLng(result.response.listings[j].latitude, result.response.listings[j].longitude);
                    let mapOptions = {
                        center: centerLatLng,
                        zoom: 18
                    };
                    let map = new google.maps.Map(document.getElementById("map"), mapOptions);

                }
            }
            close.addEventListener('click', modalClose);
        });
    }

    let plateFavouritess = document.querySelectorAll('.plate_favourites');
    for (let n = 0; n < plateFavouritess.length; n++) {
        plateFavouritess[n].addEventListener('click', function (evt) {
            for (let k = 0; k < result.response.listings.length; k++) {
                if (evt.currentTarget.parentNode.childNodes[9].childNodes[1].innerHTML === result.response.listings[k].title) {
                    localStorage.setItem(result.response.listings[k].title, JSON.stringify(result.response.listings[k]));
                }
            }
        })
    }
}

function loadStorage() {
    if (localStorage.length > 0) {
        plates.innerHTML = '';
        for (let i = 0; i < localStorage.length; i++) {
            createPlates(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }

        let btnBlock = document.body.querySelector('.btn-block');
        btnBlock.innerHTML = '';
        let btnClear = document.createElement('button');
        let btnExit = document.createElement('button');
        btnClear.innerHTML = 'Очистить';
        btnClear.classList = 'btn-clear btn';
        btnClear.style.position = 'absolute';
        btnClear.style.top = '14' + 'px';
        btnClear.style.right = '-200' + 'px';
        btnExit.innerHTML = 'Выйти';
        btnExit.classList = 'btn-exit btn';
        btnExit.style.position = 'absolute';
        btnExit.style.top = '14' + 'px';
        btnExit.style.right = '-100' + 'px';
        btnBlock.appendChild(btnExit);
        btnBlock.appendChild(btnClear);
        search.appendChild(btnBlock);
        /*search.appendChild(btnExit);
        search.appendChild(btnClear);*/

        btnExit.addEventListener('click', function () {
            plates.innerHTML = '';
            btnExit.remove();
            btnClear.remove();
            dataLoad();
        });

        btnClear.addEventListener('click', function () {
            plates.innerHTML = '';
            localStorage.clear();
            btnClear.remove();
            btnExit.remove();
            alert('Избранное очищено');
        });
        let plateMass = document.querySelectorAll('.plate');

        for (let k = 0; k < plateMass.length; k++) {
            plateMass[k].addEventListener('click', function (evt) {
                for (let j = 0; j < localStorage.length; j++) {
                    if (evt.currentTarget.childNodes[1].childNodes[1].innerHTML === JSON.parse(localStorage.getItem(localStorage.key(j))).title) {
                        backModal.style.display = 'block';
                        modal.style.display = 'flex';
                        let modalTitle = document.querySelector('.modal_title');
                        modalTitle.innerHTML = JSON.parse(localStorage.getItem(localStorage.key(j))).title;
                        modalImg.src = JSON.parse(localStorage.getItem(localStorage.key(j))).img_url;
                        fav_block.innerHTML = '';
                        modalBathroom.innerHTML = JSON.parse(localStorage.getItem(localStorage.key(j))).bathroom_number;
                        modalBedroom.innerHTML = JSON.parse(localStorage.getItem(localStorage.key(j))).bedroom_number;
                        modalType.innerHTML = JSON.parse(localStorage.getItem(localStorage.key(j))).property_type;
                        modalPrice.innerHTML = JSON.parse(localStorage.getItem(localStorage.key(j))).price_formatted;

                        let centerLatLng = new google.maps.LatLng(JSON.parse(localStorage.getItem(localStorage.key(j))).latitude, JSON.parse(localStorage.getItem(localStorage.key(j))).longitude);
                        let mapOptions = {
                            center: centerLatLng,
                            zoom: 18
                        };
                        let map = new google.maps.Map(document.getElementById("map"), mapOptions);

                    }
                }
                close.addEventListener('click', modalClose);



            });
        }
    } else{
        plates.innerHTML = 'В избранном пусто.'
    }
}

