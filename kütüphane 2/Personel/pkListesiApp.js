const kaydetBtn = document.querySelector('#kaydetButton');
const silBtn = document.querySelector("#silButton")
const idInput = document.querySelector("#ID");
const kitapAdiInput = document.querySelector('#kitapAdi');
const yazarAdiInput = document.querySelector('#yazarAdi');
const yazarSoyadiInput = document.querySelector('#yazarSoyadi');
const sayfaSayisiInput = document.querySelector('#sayfaSayisi');
const yayineviInput = document.querySelector('#yayinEvi');
const kitapTuruInput = document.querySelector('#kitapTuru');
const tableBody = document.querySelector('.table tbody');

let kitapListesi = [];

runEvents();

function runEvents(){
    document.addEventListener("DOMContentLoaded", pageloaded);
    kaydetBtn.addEventListener("click", addKitap);
    silBtn.addEventListener("click", deleteKitap);
}

function checkKitapListFromStorage(){
    if (localStorage.getItem("Kitap") !== null) {
        kitapListesi = JSON.parse(localStorage.getItem("Kitap"));
    }
}

function addKitap(event) {
    event.preventDefault();
    const id = idInput.value;
    const kitapAdi = kitapAdiInput.value;
    const yazarAdi = yazarAdiInput.value;
    const yazarSoyadi = yazarSoyadiInput.value;
    const sayfaSayisi = sayfaSayisiInput.value;
    const yayinevi = yayineviInput.value;
    const kitapTuru = kitapTuruInput.value;

    if (!kitapAdi || !yazarAdi || !yazarSoyadi || !sayfaSayisi || !yayinevi || !kitapTuru){
        showAlert("danger", "Tüm alanları doldurmanız gerekiyor.");
        return;
    }

    const newKitap = {
        id: id,
        kitapAdi: kitapAdi,
        yazarAdi: yazarAdi,
        yazarSoyadi: yazarSoyadi,
        sayfaSayisi: sayfaSayisi,
        yayinevi: yayinevi,
        kitapTuru: kitapTuru
    };

    addKitapToUI(newKitap);
    addKitapToStorage(newKitap);
    showAlert("success", "Kitap başarıyla eklendi.");
    clearFormInputs();
}

function addKitapToUI(kitap){
    const newRow = tableBody.insertRow();
    newRow.innerHTML = `
    <td>${kitap.id}</td>
    <td>${kitap.kitapAdi}</td>
    <td>${kitap.yazarAdi}</td>
    <td>${kitap.yazarSoyadi}</td>
    <td>${kitap.sayfaSayisi}</td>
    <td>${kitap.yayinevi}</td>
    <td>${kitap.kitapTuru}</td>
    `;
}

function addKitapToStorage(newKitap){
    kitapListesi.push(newKitap);
    localStorage.setItem("Kitap", JSON.stringify(kitapListesi));
}

function pageloaded(){
    checkKitapListFromStorage();
    kitapListesi.forEach(function(kitap){
        addKitapToUI(kitap);
    });
}

function showAlert(type, message){
    const div = document.createElement("div");
    div.className = `alert alert-${type} alert-overlay`;
    div.textContent = message;
    document.body.appendChild(div);
    setTimeout(function(){
        div.remove();
    }, 2500);
}

function clearFormInputs(){
    kitapAdiInput.value = '';
    yazarAdiInput.value = '';
    yazarSoyadiInput.value = '';
    sayfaSayisiInput.value = '';
    yayineviInput.value = '';
    kitapTuruInput.value = '';
}

function deleteKitap(){
    const deleteID = parseInt(document.querySelector('#ID').value);
    if(!deleteID || isNaN(deleteID)) {
        showAlert("danger", "Geçersiz ID girdiniz.");
        return;
    }

    const index = kitapListesi.findIndex(kitap => kitap.id === deleteID);
    if(index === -1) {
        showAlert("danger", "Bu ID'ye sahip bir kitap bulunamadı.");
        return;
    }

    kitapListesi.splice(index,  1);
    localStorage.setItem("Kitap", JSON.stringify(kitapListesi));

    const rows = document.querySelectorAll('.table tbody tr');
    if(rows.length > 0) {
        rows.forEach(row => {
            if(row.cells.length > 0){
                if(parseInt(row.cells[0].textContent) === deleteID){
                    row.remove();
                }
            }
        });
    }

    showAlert("success", "Kitap başarıyla silindi.");
    location.reload();
}