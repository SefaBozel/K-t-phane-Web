document.addEventListener("DOMContentLoaded", function () {
    var Onay = JSON.parse(localStorage.getItem("Onay"));

    var onayListesiHTML = document.querySelector('.eListesi tbody');
    Onay.forEach(function (onay) {
        var row = document.createElement('tr');
        row.innerHTML = `
            <td>${onay.id}</td>
            <td>${onay.isim}</td>
            <td>${onay.yazar}</td>
            <td>${onay.alinma}</td>
            <td>${onay.teslim}</td>
        `;
        onayListesiHTML.appendChild(row);
    });
});

const onayBtn = document.querySelector("#btnOnay");
const IDInput = document.querySelector("#ID");
const isimInput = document.querySelector("#kitapAdi");
const yazarInput = document.querySelector("#yazarAdi");
const alinmaInput = document.querySelector("#alinmaTarih");
const teslimInput = document.querySelector("#teslimTarih");

let Onay = [];

runEvents();
addOnay();

function runEvents(){
    onayBtn.addEventListener("click", addOnay);
}

function checkOnayFromStorage(){
    if(localStorage.getItem("Onay") !== null){
        Onay = JSON.parse(localStorage.getItem("Onay"));
    }
}

function addOnay(event){
    const id = IDInput.value;
    const isim = isimInput.value;
    const yazar = yazarInput.value;
    const alinma = alinmaInput.value;
    const teslim = teslimInput.value;

    if(!id || !isim || !yazar || !alinma || !teslim){
        showAlert("danger", "Tüm alanları doldurmanız gerekmektedir.");
        return;
    }

    // Emanet listesine ekleyelim
    showAlert("success", "Emanet başarıyla onaylandı.");
    clearFormInputs();

    // Emanet onay listesinden silmek için
    removeOnayFromOnayList(id);
    location.reload();
}

function removeOnayFromOnayList(id){
    let Onay = JSON.parse(localStorage.getItem("Onay")) || [];
    const index = Onay.findIndex(Onay => Onay.id === id);
    if(index !== 1){
        Onay.splice(index, 1);  
    }

    localStorage.setItem("Onay", JSON.stringify(Onay));
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