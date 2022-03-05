

let maincont = document.createElement("div");
maincont.className = "cards";

document.body.append(maincont);
let ratingcat

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
    // document.querySelector(".delete-cat").onclick = console.log('123')
};


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
    `;
    popup.append(popupInfo);
    let popupClose = document.createElement("div");
    popupClose.className = 'popupclose'

    popupClose.innerHTML = `<img class="imgclose" src="img/close.png"></img>`;
    popupInfo.append(popupClose);
    popupClose.setAttribute("onclick", "document.querySelector('.popup').remove(), document.querySelector('.popup-back').remove()");

    // popupClose.onclick = close();
};


let ageCatNormal = function (age) {
    if (age == 1) { return "год" }
    else if (age >= 2 && age <= 4) { return "года" }
    else { return "лет" }
};

let addCatButton = document.querySelector(".addCat");



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
                <button type="submit">Отправить</button>
            </form>`;
    let popupForm = popupAddCat.querySelector(".popup-form");
    
    let IdCat = popupForm.querySelector("#id");
    let NameCat = popupForm.querySelector("#name");
    let imgCat = popupForm.querySelector("#img_link");
    let descriptionCat = popupForm.querySelector("#description");
    // console.log(IdCat);
    popupForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        let bodyJSON = {
            id: IdCat.value,
            name: NameCat.value,
            img_link: imgCat.value,
            description: descriptionCat.value,
            rate: rate.value
        }
        // console.log(bodyJSON)
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

// let close = function(){
//     console.log("ttytyt");
// }
// onclick="close()"
// document.lastElementChild


// let close = function(){
//     console.log("ttytyt");
// }


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
            // console.log(resp);
            if (resp.ok) {
                return resp.json();
            }
            else { return Promise.reject(resp) }
        })
        .then(({ data }) => {
            localStorage.setItem("cats", JSON.stringify(data));
            // data.forEach(dataCat => )
           
           
            setCat(data);
        })
        .catch((error) => {
            console.log(error)
        })
};
seeCats();

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

function deleteCatButtonFun(del){
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
// console.log(document.getElementsByClassName("delete-cat"))
// document.getElementsByClassName("delete-cat").onclick = deleteCatButtonFun;
// .addEventListener('click', ()=>{console.log('123')})
