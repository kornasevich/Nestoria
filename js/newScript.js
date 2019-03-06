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
let favouritesBtn = document.querySelector('.favourites_block');
let fav_block = document.querySelector('.plate_favourites');
let showMore = document.body.querySelector('.show-more');

let tempObject = {};
let arrayElement = [];

if (option[0].value === 'UK') {
    window.temp = Countrys.UK;
    window.tempTwo = 'api.nestoria.co.uk';
}

(function f() {
    for (let i=0; i < localStorage.length; i++) {
        tempObject[localStorage.key(i)] = JSON.parse(localStorage.getItem(localStorage.key(i)));
    }
})();

document.body.addEventListener('click', function () {
    overallDiv.innerHTML = '';
});

let page = 1;
countrys.addEventListener('change', country);
citySearch.addEventListener('input', autocomplete);
imgSearch.addEventListener('click', dataLoad);
plates.addEventListener('click', plate);
favouritesBtn.addEventListener('click', loadStorage);
showMore.addEventListener('click', function () {
   if('click'){
       page++;
       dataLoad();
   }
});
search.addEventListener('change', function (event) {
   if(event.target.className === 'radio_rent'){
       plates.innerHTML = '';
       showMore.style.display = 'none';
   } else if(event.target.className === 'radio_buy'){
       plates.innerHTML = '';
       showMore.style.display = 'none';
   }
});

function loadStorage(event) {
    showMore.style.display = 'none';
    if (localStorage.length > 0) {
        plates.innerHTML = '';
        for (let i = 0; i < localStorage.length; i++) {
            createPlatesForLocalStorage(JSON.parse(localStorage.getItem(localStorage.key(i))));
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

        btnExit.addEventListener('click', function () {
            plates.innerHTML = '';
            btnExit.remove();
            btnClear.remove();
            if(citySearch.value !== ''){
                dataLoad();
            }
            showMore.style.display = 'none';

        });

        btnClear.addEventListener('click', function () {
            plates.innerHTML = '';
            localStorage.clear();
            btnClear.remove();
            btnExit.remove();
            alert('Избранное очищено');
            showMore.style.display = 'none';
        });
        page = 1;
    } else{
        alert('В избранном пусто');
    }

}


function addScript(src) {
    let wrap = document.body.querySelector('.wrapper');
    let script = document.createElement('SCRIPT');
    script.src = src;
    document.head.appendChild(script);

};

function plate(event){
    console.log(event.target);
    if (event.target.classList.contains('favourites')) {
        if(event.target.classList.contains('no-active')) {
            event.target.src = "img/favourites.png";
            event.target.className = 'favourites active';
            objectElement.listings.forEach(function (item) {
                if(event.target.previousElementSibling.childNodes[1].innerHTML === item.title){
                    localStorage.setItem(item.title, JSON.stringify(item));
                }
            });

        } else if(event.target.classList.contains('active')) {
            event.target.src = "img/no_favourites.png";
            event.target.className = 'favourites no-active';
            objectElement.listings.forEach(function (item) {
                if(event.target.previousElementSibling.childNodes[1].innerHTML === item.title){
                    localStorage.removeItem(item.title);
                }
            });
        }
        return;
    }

    if (event.target.parentElement.classList.contains('favourites')){
        if(event.target.parentElement.classList.contains('favourites_del')) {
            for(let key in localStorage){
                if(key === event.target.parentElement.parentElement.childNodes[1].childNodes[1].innerHTML){
                    localStorage.removeItem(key);
                }
            }
            plates.removeChild(event.target.parentElement.parentElement);
        }
        return;
    }
    arrayElement.forEach(function (item,index) {
        if(event.target.parentElement.childNodes[1].childNodes[1].innerHTML.toString() === arrayElement[index].title){
            createModal(item);
            close.addEventListener('click', modalClose);
        }
    });

    for(let key in localStorage){
        if(event.target.parentElement.childNodes[1].childNodes[1].innerHTML.toString() === key){
        createModal(JSON.parse(localStorage.getItem(key)));
            close.addEventListener('click', modalClose);
    }
}

}


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
            page = 1;
            arrayElement = [];
            showMore.style.display = 'none';
            break;
        case 'Brazil':
            window.temp = Countrys.BRAZIL;
            window.tempTwo = 'api.nestoria.com.br';
            document.body.style.background = 'url(img/brazil.jpg) no-repeat';
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundAttachment = 'fixed';
            plates.innerHTML = '';
            page = 1;
            arrayElement = [];
            showMore.style.display = 'none';
            break;
        case 'Deutschland':
            window.temp = Countrys.GERMANY;
            window.tempTwo = 'api.nestoria.de';
            document.body.style.background = 'url(img/germany.jpg) no-repeat';
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundAttachment = 'fixed';
            plates.innerHTML = '';
            page = 1;
            arrayElement = [];
            showMore.style.display = 'none';
            break;
        case 'Spain':
            window.temp = Countrys.SPAIN;
            window.tempTwo = 'api.nestoria.es';
            document.body.style.background = 'url(img/spain.jpg) no-repeat';
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundAttachment = 'fixed';
            plates.innerHTML = '';
            page = 1;
            arrayElement = [];
            showMore.style.display = 'none';
            break;
        case 'France':
            window.temp = Countrys.FRANCE;
            window.tempTwo = 'api.nestoria.fr';
            document.body.style.background = 'url(img/france.jpg) no-repeat';
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundAttachment = 'fixed';
            plates.innerHTML = '';
            page = 1;
            arrayElement = [];
            showMore.style.display = 'none';
            break;
        case 'Italy':
            window.temp = Countrys.ITALY;
            window.tempTwo = 'api.nestoria.it';
            document.body.style.background = 'url(img/italy.jpg) no-repeat';
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundAttachment = 'fixed';
            plates.innerHTML = '';
            page = 1;
            arrayElement = [];
            showMore.style.display = 'none';
            break;
        case 'Mexico':
            window.temp = Countrys.MEXICO;
            window.tempTwo = 'api.nestoria.mx';
            document.body.style.background = 'url(img/mexico.jpg) no-repeat';
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundAttachment = 'fixed';
            plates.innerHTML = '';
            page = 1;
            arrayElement = [];
            showMore.style.display = 'none';
            break;
        case 'UK':
            window.temp = Countrys.UK;
            window.tempTwo = 'api.nestoria.co.uk';
            document.body.style.background = 'url(img/london.jpg) no-repeat';
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundAttachment = 'fixed';
            plates.innerHTML = '';
            page = 1;
            arrayElement = [];
            showMore.style.display = 'none';
            break;
    }
}

function autocomplete() {
    page = 1;
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
            arrayElement = [];
            dataLoad();
        });
    }
    if(citySearch.value === ''){
        overallDiv.innerHTML = '';
    }
}


function modalClose() {
    backModal.style.display = 'none';
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
};


function dataLoad() {
    document.querySelector('.btn-block').innerHTML = '';
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
        addScript("https://" + window.tempTwo + "/api?encoding=json&pretty=1&action=search_listings&listing_type=" + radioBuyVal + "&price_min=" + priceMin + "&price_max=" + priceMax + "&room_min=" + roomsMin + "&room_max=" + roomsMax + "&bathroom_min=" + bathroomMin + "&bathroom_max=" + bathroomMax + "&bedroom_min=" + bedroomsMin + "&bedroom_max=" + bedroomsMax + "&place_name=" + citySearchTwo + "&page="+ page +"&south_west&north_east&callback=createElement");
    } else {
        addScript("https://" + window.tempTwo + "/api?encoding=json&pretty=1&action=search_listings&listing_type=" + radioRentVal + "&price_min=" + priceMin + "&price_max=" + priceMax + "&room_min=" + roomsMin + "&room_max=" + roomsMax + "&bathroom_min=" + bathroomMin + "&bathroom_max=" + bathroomMax + "&bedroom_min=" + bedroomsMin + "&bedroom_max=" + bedroomsMax + "&place_name=" + citySearchTwo + "&page="+ page +"&south_west&north_east&callback=createElement");
    }
}

function createElement(result) {
    if(page <= 1){
        plates.innerHTML = '';
    }
    result.response.listings.forEach(function (item, index) {
        arrayElement.push(item);
    });
    console.log(result);
    window.objectElement = result.response;
    if(result.response.status_text === 'Internal Server Error'){
        plates.innerHTML = result.response.status_text;
    }

    if(result.response.listings.length < 1){
        plates.innerHTML = 'По данном запросу ничего не найдено.';
    }

    for (let i = 0; i < result.response.listings.length; i++) {
        createPlates(result.response.listings[i]);
    }
    if(plates.childNodes.length < 20){
    showMore.style.display = 'none';
}else{
        showMore.style.display = 'inline-block';
    }


}

function createModal(object){
    backModal.style.display = 'block';
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    let modalTitle = document.querySelector('.modal_title');
    modalTitle.innerHTML = object.title;
    modalImg.src = object.img_url;
    modalBathroom.innerHTML = object.bathroom_number;
    modalBedroom.innerHTML = object.bedroom_number;
    modalType.innerHTML = object.property_type;
    modalPrice.innerHTML = object.price_formatted;


    let centerLatLng = new google.maps.LatLng(object.latitude, object.longitude);
    let mapOptions = {
        center: centerLatLng,
        zoom: 18
    };
    let map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

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
    let plateFavourites = document.createElement('img');
    let localKey = [];
    for (let localStorageKey in localStorage) {
        localKey.push(localStorageKey);
    }
        if(localKey.indexOf(obj.title) !== -1){
            plateFavourites.classList.add('favourites', 'active');
            plateFavourites.src = 'img/favourites.png';
        } else{
            plateFavourites.classList.add('favourites', 'no-active');
            plateFavourites.src = 'img/no_favourites.png';
        }
    plateFavourites.style.width = '30px';
    plateFavourites.style.height = '30px';
    plateFavourites.style.position = 'absolute';
    plateFavourites.style.bottom =  '20px';
    plateFavourites.style.right = '20px';

    plateText.appendChild(platePrice);
    plateText.appendChild(plateTitle);
    plateText.appendChild(plateDescription);
    plateBlock.appendChild(plateText);
    plateBlock.appendChild(plateFavourites);
    plates.appendChild(plateBlock);
}

function createPlatesForLocalStorage(obj) {
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

    let plateFavouritesBlock = document.createElement('div');
    let plateFavouritesText = document.createElement('span');
    plateFavouritesText.innerHTML = 'Delete';
    let plateFavourites = document.createElement('img');
    plateFavouritesBlock.classList.add('favourites', 'favourites_del');
    plateFavourites.src = 'img/del_favourites.png';
    plateFavouritesBlock.appendChild(plateFavourites);
    plateFavouritesBlock.append(plateFavouritesText);

    plateFavourites.style.verticalAlign = 'middle';
    plateFavourites.style.width = '30px';
    plateFavourites.style.height = '30px';
    plateFavouritesBlock.style.position = 'absolute';
    plateFavouritesBlock.style.bottom =  '20px';
    plateFavouritesBlock.style.right = '20px';
    plateFavouritesBlock.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    plateFavouritesBlock.style.borderRadius = '5px';
    plateFavouritesBlock.style.paddingRight = '5px';


    plateText.appendChild(platePrice);
    plateText.appendChild(plateTitle);
    plateText.appendChild(plateDescription);
    plateBlock.appendChild(plateText);
    plateBlock.appendChild(plateFavouritesBlock);
    plates.appendChild(plateBlock);
}