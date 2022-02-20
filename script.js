const cats = [
    {
        "name": "Лара",
        "img_link": "img/lara.jpeg",
        "age": 8,
        "rate": 7,
        "favourite": false,
        "description": "Лара – шотландская вислоухая, у нее остеохондродисплазия. Лара спокойная, очень ласковая и контактная. Болезнь не лечится и специального ухода не нужно.",
        "id": 1
    },
    {
        "name": "Базиль",
        "img_link": "img/basil.jpeg",
        "age": 2,
        "rate": 10,
        "favourite": false,
        "description": "Внимательный, активный и ласковый. Любит играть, катать мяч, и мурчать на пледе рядом с людьми! Прилично воспитан, приучен к лотку. Вакцинирован, имеет ветеринарный паспорт.",
        "id": 2
    },
    {
        "name": "Риш",
        "img_link": "img/rish.JPG",
        "age": 1,
        "rate": 10,
        "favourite": true,
        "description": "Риш любит лесенки, канаты. Очень активный и дружелюбный кот. Риш полностью здоров, привит, кастрирован. Использует лоточек и очень аккуратен.",
        "id": 3
    },
    {
        "name": "Элли",
        "img_link": "img/elly.jpg",
        "age": 4,
        "rate": 8,
        "favourite": false,
        "description": "Элли обладает мягким и добрым характером. Очень любит всевозможные лакомства и вкусно покушать. Не доверяет людям, потребуется время, чтобы стать ей другом. Приучена к лотку и когтеточке",
        "id": 4
    },
    {
        "name": "Чарли",
        "img_link": "img/charly.jpg",
        "age": 1,
        "rate": 8,
        "favourite": false,
        "description": "Чёрно-белый юный котофилософ очень любит размышлять и быть наедине. Пока что не доверяет людям, не агрессивный. Ладит с другими животными, приучен к лотку и когтеточке",
        "id": 5
    },
    {
        "name": "Стефани",
        "img_link": "img/stefany.jpg",
        "age": 6,
        "rate": 9,
        "favourite": false,
        "description": "Прелестная Стефани – трогательная, добродушная и очень-очень общительная девочка как никто другой нуждается в заботе и любви. Приучена к лотку и когтеточке",
        "id": 6
    },
    {
        "name": "Дуся",
        "img_link": "img/dusya.jpeg",
        "age": 1,
        "rate": 9,
        "favourite": false,
        "description": "Дусеньке около 1 года с небольшим, здорова, привита, стерилизована. Лоточек и когтеточку знает прекрасно. Очень общительная и нежная, хочет постоянного внимания.",
        "id": 7
    },
    {
        "name": "Бруно",
        "img_link": "img/bruno.jpg",
        "age": 1,
        "rate": 10,
        "favourite": false,
        "description": "Очаровательный активный кот Бруно, находится в постоянном движении! Очаровательный и ласковый кот. Приучен к лотку, ладит с другими котами, привит.",
        "id": 8
    },
    {
        "name": "Лара",
        "img_link": "img/lara2.jpg",
        "age": 1,
        "rate": 9,
        "favourite": true,
        "description": "Немного боязливый, но очень добрый и нежный кот Светлячок. Приучен к лотку и когтеточке, ладит с детьми, привит. Станет вам хорошим другом",
        "id": 9
    }
];

let maincont = document.createElement("div");
maincont.className = "cards";

document.body.append(maincont);

cats.forEach(cat => {
    let card = document.createElement("div");
card.className = "card";
let image = document.createElement("img");
image.className = "imgcat";

let ratingcat = "";
rateCat(cat.rate);

card.innerHTML = `
   <div class="imgcat" style="background-image: url(${cat.img_link})"></div>
   <h3>${cat.name}</h3>
   <p class="rate">${ratingcat}</p>`


  function rateCat(r) {
    for (let i=1; i<=10; i++){
        if (i<=r) {
            ratingcat += "<img src='img/cat-fill.svg'>" }
            else {
                ratingcat += "<img src='img/cat-stroke.svg'>"
            }      
    }
return ratingcat;
};


card.onclick = function(){
    openModulWin(cat);
};

maincont.append(card); 


});


let openModulWin = function(cat){
    let popup = document.createElement("div");
    popup.classList.add("popup");
    let popupBack = document.createElement("div");
    popupBack.className = 'popup-back';
    document.body.append(popupBack);
    popup.innerHTML =  `<img class="popupImg" src="${cat.img_link}">`;
    document.body.append(popup);
    let popupInfo = document.createElement("div");
    popupInfo.className = "popupR";
    popupInfo.innerHTML = `
        <h2 class="nameCat">${cat.name}</h2>
        <p class="ageCat">${cat.age} ${ageCatNormal(cat.age)}</p>
        <p class="descriptionCat">${cat.description}</p>
    `;
    popup.append(popupInfo);
};

let ageCatNormal = function (age){
    if (age == 1) {return "год"}
    else if (age >=2 && age <=4) {return "года"}
    else {return "лет"}
};
    
