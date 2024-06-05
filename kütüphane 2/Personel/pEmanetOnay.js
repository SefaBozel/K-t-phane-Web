document.addEventListener("DOMContentLoaded", function () {
    var EmanetOnay = JSON.parse(localStorage.getItem("EmanetOnay")) || [];

    var EmanetOnayHTML = document.querySelector(".eListesi tbody");
    EmanetOnay.forEach(function (emanet) {
        var row = document.createElement('tr');
        row.innerHTML = `
            <td>${emanet.id}</td>
            <td>${emanet.isim}</td>
            <td>${emanet.yazar}</td>
            <td>${emanet.bugünTarih}</td>
            <td>${emanet.teslimTarih}</td>
        `;
        EmanetOnayHTML.appendChild(row);
    });
});

function getShortDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const onayBtn = document.querySelector("#btnOnay");
const IDInput = document.querySelector("#ID");
const isimInput = document.querySelector("#isim");
const yazarInput = document.querySelector("#yazar");
const alinmaInput = document.querySelector("#alinma");
const teslimInput = document.querySelector("#teslim");

let EmanetListesi = [];

runEvents();
checkEmanetFromStorage();

function runEvents(){
    onayBtn.addEventListener("click", addEmanet);
}

function checkEmanetFromStorage(){
    if (localStorage.getItem("Emanet") !== null){
        EmanetListesi = JSON.parse(localStorage.getItem("Emanet"));
    }
}

function addEmanet(event){
    event.preventDefault();
    const id = IDInput.value;
    const isim = isimInput.value;
    const yazar = yazarInput.value;
    const alinma = alinmaInput.value;
    const teslim = teslimInput.value;

    if(!id || !isim || !yazar || !alinma || !teslim){
        showAlert("danger", "Tüm alanları doldurmanız gerekmektedir.");
        return;
    }

    const newEmanet = {
        id: id,
        isim: isim,
        yazar: yazar,
        alinma: alinma,
        teslim: teslim
    };

    // Emanet listesine ekleyelim
    addEmanetToStorage(newEmanet);
    showAlert("success", "Emanet başarıyla onaylandı.");
    clearFormInputs();

    // Emanet onay listesinden silmek için
    removeEmanetFromOnayList(id);
    location.reload();
}

function removeEmanetFromOnayList(id) {
    // Emanet onay listesini alalım
    let EmanetOnay = JSON.parse(localStorage.getItem("EmanetOnay")) || [];

    // ID'si eşleşen emaneti bulalım
    const index = EmanetOnay.findIndex(emanet => emanet.id === id);

    // Eğer bulduysak, listeden çıkaralım
    if (index !== -1) {
        EmanetOnay.splice(index, 1);
    }

    // Güncellenmiş emanet onay listesini localStorage'a geri kaydedelim
    localStorage.setItem("EmanetOnay", JSON.stringify(EmanetOnay));
}


function addEmanetToStorage(newEmanet){
    const existingEmanetList = JSON.parse(localStorage.getItem("Emanet")) || [];
    existingEmanetList.push(newEmanet);
    localStorage.setItem("Emanet", JSON.stringify(existingEmanetList));
}

function showAlert(type, message){
    const div = document.createElement("div");
    div.className = `alert alert-${type} alert-overlay`;
    div.textContent = message;
    document.body.appendChild(div);
    setTimeout(function() {
        div.remove();
    }, 2500);
}

function clearFormInputs(){
    IDInput.value = '';
    isimInput.value = '';
    yazarInput.value = '';
    alinmaInput.value = '';
    teslimInput.value = '';
}
