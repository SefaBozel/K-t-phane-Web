document.addEventListener("DOMContentLoaded", function () {
    var Emanet = JSON.parse(localStorage.getItem("Emanet"));

    if (!Emanet) {
        Emanet = [];
    }

    var EmanetListesiHTML = document.querySelector('.kitapListesi tbody');
    Emanet.forEach(function (emanet) {
        var row = document.createElement('tr');
        row.innerHTML = `
            <td>${emanet.id}</td>
            <td>${emanet.isim}</td>
            <td>${emanet.yazar}</td>
            <td>${emanet.alinma}</td>
            <td>${emanet.teslim}</td>
        `;
        EmanetListesiHTML.appendChild(row);
    });
});

const onayBtn = document.querySelector("#btnTeslim");
const IDInput = document.querySelector("#ID");
const isimInput = document.querySelector("#isim");
const yazarInput = document.querySelector("#yazar");
const alinmaInput = document.querySelector("#alinma");
const teslimInput = document.querySelector("#teslim");

runEvents();
checkOnayFromStorage();

function runEvents(){
    onayBtn.addEventListener("click", addOnay);
}

function checkOnayFromStorage(){
    if (localStorage.getItem("Onay") !== null){
        onayListesi = JSON.parse(localStorage.getItem("Onay"));
    }
}

function addOnay(event){
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

    const newOnay = {
        id: id,
        isim: isim,
        yazar: yazar,
        alinma: alinma,
        teslim: teslim
    };

    // Onay listesine ekleyelim
    addOnayToStorage(newOnay);
    showAlert("success", "Emanet başarıyla onaylandı.");
    clearFormInputs();

    // Emanet onay listesinden silmek için
    removeEmanetFromOnayList(id);
    location.reload();
}

function removeEmanetFromOnayList(id) {
    // Emanet listesini alalım
    let Emanet = JSON.parse(localStorage.getItem("Emanet")) || [];

    // ID'si eşleşen emaneti bulalım
    const index = Emanet.findIndex(emanet => emanet.id === id);

    // Eğer bulduysak, listeden çıkaralım
    if (index !== -1) {
        Emanet.splice(index, 1);
    }

    // Güncellenmiş emanet onay listesini localStorage'a geri kaydedelim
    localStorage.setItem("Emanet", JSON.stringify(Emanet));
}

function addOnayToStorage(newOnay){
    const existingOnayList = JSON.parse(localStorage.getItem("Onay")) || [];
    existingOnayList.push(newOnay);
    localStorage.setItem("Onay", JSON.stringify(existingOnayList));
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
