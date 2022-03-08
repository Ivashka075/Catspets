
localStorage.setItem("API", JSON.stringify(api));

// куки
if(!Cookies.get('user')) {
    let popupBack = document.createElement("div");
    popupBack.className = 'popup-back';
    document.body.append(popupBack);
    let auth = document.createElement("div");
    auth.className = "authContent";
    auth.innerHTML = `<form name="auth-form" class="auth-form">
    <input type="text" name="authName" class="auth-form__input" placeholder="Ваше имя">
    <button type="submit" class="auth-form__button">Авторизация</button>
    </form>`;
    document.body.append(auth);

    let authNameInput = document.querySelector(".auth-form__input")
    document.querySelector(".auth-form").addEventListener('submit', (e)=> {
        e.preventDefault();
        if (authNameInput.value.trim() !== ""){
            console.log(authNameInput.value)
            document.cookie = `user=${authNameInput.value}; path=/; secure; samesite=lax;`;
            popupBack.remove();
            auth.remove();

        }
    }
    )

};

let maincont = document.createElement("div");
maincont.className = "cards";

document.body.append(maincont);
let ratingcat

// рейтинг
function rateCat(r) {
    for (let i = 1; i <= 10; i++) {
        if (i <= r) {
            ratingcat += "<img src='img/cat-fill.svg'>"
        }
        else {
            ratingcat += "<img src='img/cat-stroke.svg'>"
        }
    }
    return ratingcat;
};

// карточки
let setCat = function (newCats) {
    newCats.forEach(cat => {
        let card = document.createElement("div");
        card.className = "card";
        let image = document.createElement("img");
        image.className = "imgcat";
        ratingcat = "";
        rateCat(cat.rate);
        card.innerHTML = `
   <div class="imgcat" style="background-image: url(${cat.img_link})"></div>
   <h3>${cat.name}</h3>
   <p class="rate">${ratingcat}</p>
   <button class="delete-cat" onclick='deleteCatButtonFun(${cat.id})'>Удалить</button>`

    card.onclick = function () {
            openModulWin(cat);
        };
        maincont.append(card);
    });
};





// правильно поставленная подпись возраста
let ageCatNormal = function (age) {
    if (age == 1) { return "год" }
    else if (age >= 2 && age <= 4) { return "года" }
    else { return "лет" }
};

let addCatButton = document.querySelector(".addCat");


// создание кота
let addCatPopup = function () {
    let popupAddCat = document.createElement("div");
    popupAddCat.className = "popup_add-cat";
    let popupBack = document.createElement("div");
    popupBack.className = 'popup-back';
    document.body.append(popupBack);
    popupAddCat.innerHTML = `
            <form class="popup-form">
                <input type="text" placeholder="id" name="id" id="id">
                <input type="text" placeholder="Имя" name="name" id="name">
                <input type="text" placeholder="Изображение" name="img_link" id="img_link">
                <input type="text" placeholder="Описание" name="description" id="description">
                <input type="text" placeholder="Рейтинг" name="rate" id="rate">
                <input type="text" placeholder="Возраст" name="age" id="age">
                <button type="submit">Отправить</button>
            </form>`;
    let popupForm = popupAddCat.querySelector(".popup-form");
    
    let IdCat = popupForm.querySelector("#id");
    let NameCat = popupForm.querySelector("#name");
    let imgCat = popupForm.querySelector("#img_link");
    let descriptionCat = popupForm.querySelector("#description");
    popupForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        let bodyJSON = {
            id: IdCat.value,
            name: NameCat.value,
            img_link: imgCat.value,
            description: descriptionCat.value,
            rate: rate.value,
            age: age.value
        }
        fetch("https://sb-cats.herokuapp.com/api/add", {
            method: 'POST',
            body: JSON.stringify(bodyJSON),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then((resp) => {
            if (resp.ok) {
                return resp.json();
            }
            else { return Promise.reject(resp) }
        })
        .then((data) => {
            if (data.message === 'ok'){
                runUpdateCats();
                document.querySelector('.popup_add-cat').remove();
                document.querySelector('.popup-back').remove();
            }
        })
        .catch((error) => {
            console.log(error)
        })
    })       
    document.body.append(popupAddCat);
    let popupClose = document.createElement("div");
    popupClose.className = 'popupclose';

    popupClose.innerHTML = `<img class="imgclose" src="img/close.png"></img>`;
    popupAddCat.append(popupClose);
    popupClose.setAttribute("onclick", "document.querySelector('.popup_add-cat').remove(), document.querySelector('.popup-back').remove()");

};

addCatButton.onclick = addCatPopup;

// открытие попап
let openModulWin = function (cat) {
    let popup = document.createElement("div");
    popup.classList.add("popup");
    let popupBack = document.createElement("div");
    popupBack.className = 'popup-back';
    document.body.append(popupBack);
    popup.innerHTML = `<img class="popupImg" src="${cat.img_link}">`;
    document.body.append(popup);
    let popupInfo = document.createElement("div");
    popupInfo.className = "popupR";
    popupInfo.innerHTML = `
        <h2 class="nameCat">${cat.name}</h2>
        <p class="ageCat">${cat.age} ${ageCatNormal(cat.age)}</p>
        <p class="descriptionCat">${cat.description}</p>
        <button class="editButton">Редактировать</button>
    `;
    popup.append(popupInfo);
    let popupClose = document.createElement("div");
    popupClose.className = 'popupclose'

    popupClose.innerHTML = `<img class="imgclose" src="img/close.png"></img>`;
    popupInfo.append(popupClose);
    popupClose.setAttribute("onclick", "document.querySelector('.popup').remove(), document.querySelector('.popup-back').remove()");
    
    
    popupInfo.querySelector(".editButton").addEventListener("click", ()=>{
        let editCat = document.createElement("div");
        editCat.className = "edit-cat__popup";
        editCat.innerHTML = `
                <form class="popup-form">
                    <input type="text" placeholder="Имя ${cat.name}" name="name" id="name">
                    <input type="text" placeholder="Изображение ${cat.img_link}" name="img_link" id="img_link">
                    <input type="text" placeholder="Описание ${cat.description}" name="description" id="description">
                    <input type="text" placeholder="Рейтинг ${cat.rate}" name="rate" id="rate">
                    <input type="text" placeholder="Возраст ${cat.age}" name="age" id="age">
                    <button type="submit">Отправить</button>
                </form>`;
                let popupForm = editCat.querySelector(".popup-form");
                popup.append(popupForm);
                
                let NameCat = popupForm.querySelector("#name"); 
                let imgCat = popupForm.querySelector("#img_link");
                let descriptionCat = popupForm.querySelector("#description");
                let rateCat = popupForm.querySelector("#rate");
                let ageCat = popupForm.querySelector("#age");

                
                console.log(cat.name, NameCat.value)
                popupForm.addEventListener('submit', (e)=>{
                    if (cat.name !== NameCat.value) {cat.name = NameCat.value}; 
                    if (cat.img_link !== imgCat.value) {cat.img_link = imgCat.value};
                    if (cat.description !== descriptionCat.value) {cat.description = descriptionCat.value};
                    if (cat.rate !== rateCat.value) {cat.rate = rateCat.value};
                    if (cat.age !== ageCat.value) {cat.age = ageCat.value};
                    console.log(cat.age, ageCat.value);
                    e.preventDefault();
                    let bodyJSON = {
                        name: cat.name,
                        img_link: cat.img_link,
                        description: cat.description,
                        rate: cat.rate,
                        age: cat.age
                    }   
                    console.log(bodyJSON); 
                    fetch(`https://sb-cats.herokuapp.com/api/update/${cat.id}`, {
                    method: 'PUT',
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(bodyJSON)
                })
                .then((resp) => {runUpdateCats()}); 
                document.querySelector('.popup').remove();
                document.querySelector('.popup-back').remove();
            });
    
})
};

// футер
let footer = document.createElement("div");
footer.className = "footer";

document.body.append(footer);
let footerText = document.createElement("div");
footerText.className = "footertext";
footerText.innerText = "©2022 All rights reserved";
footer.append(footerText);

function seeCats() {
    return fetch("https://sb-cats.herokuapp.com/api/show")
        .then((resp) => {
            if (resp.ok) {
                return resp.json();
            }
            else { return Promise.reject(resp) }
        })
        .then(({ data }) => {
            localStorage.setItem("cats", JSON.stringify(data));
            setCat(data);
        })
        .catch((error) => {
            console.log(error)
        })
};
seeCats();

// обновление информации о котах
function runUpdateCats() {
    localStorage.clear();
    maincont.innerHTML = '';
    seeCats();
};
let buttonUpdate = document.querySelector(".updateCats");
buttonUpdate.onclick = runUpdateCats;

if(localStorage.getItem('cats'===false)){
    seeCats();
}

// удаление котика
function deleteCatButtonFun(del){
    if (confirm("Хотите удалить котика?")) {
        event.stopPropagation();
    fetch(`https://sb-cats.herokuapp.com/api/delete/${del}`, {
    method: "DELETE"
    })
    .then((resp) => {
        if (resp.ok) {
            return resp.json();
        }
        else { return Promise.reject(resp) }
    })
    .then((data) => {
        if (data.message === 'ok'){
            runUpdateCats();
        }
    })
    .catch((error) => {
        console.log(error)
    })
        }
    
};

