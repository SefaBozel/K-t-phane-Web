document.addEventListener("DOMContentLoaded", function() {
    // localStorage'dan kitap bilgilerini çek
    var Kitap = JSON.parse(localStorage.getItem("Kitap"));

    // Eğer localStorage'ta kitap bilgisi yoksa veya boşsa, boş bir dizi oluştur
    if (!Kitap) {
        Kitap = [];
    }

    // HTML'e kitap bilgilerini ekle
    var kitapListesiHTML = document.querySelector('.kitapListesi tbody');
    Kitap.forEach(function(kitap) {
        var row = document.createElement('tr');
        row.innerHTML = `
            <td>${kitap.id}</td>
            <td>${kitap.kitapAdi}</td>
            <td>${kitap.yazarAdi}</td>
            <td>${kitap.yazarSoyadi}</td>
            <td>${kitap.sayfaSayisi}</td>
            <td>${kitap.yayinevi}</td>
            <td>${kitap.kitapTuru}</td>
        `;
        kitapListesiHTML.appendChild(row);
    });
});

function getShortDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Ayı 2 basamaklı hale getiriyor
    const day = String(today.getDate()).padStart(2, '0'); // Günü 2 basamaklı hale getiriyor
    return `${year}-${month}-${day}`;
}

const oduncBtn = document.querySelector("#btnOdunc");
const IDinput = document.querySelector("#ID");
const isimInput = document.querySelector("#isim");
const yazarInput = document.querySelector("#yazar");
const tarihInput = document.querySelector("#tarih");

let EmanetListesi = [];

runEvents();
checkEmanetListFromStorage(); // Sayfa yüklendiğinde emanet listesini kontrol et

function runEvents(){
    oduncBtn.addEventListener("click", addEmanet);
}

function checkEmanetListFromStorage(){
    if(localStorage.getItem("EmanetOnay") !== null){
        EmanetListesi = JSON.parse(localStorage.getItem("EmanetOnay"));
    }
}

function addEmanet(event){
    event.preventDefault();
    const id = IDinput.value;
    const isim = isimInput.value;
    const yazar = yazarInput.value;
    const bugünTarih = getShortDate();
    const teslimTarih = tarihInput.value;

    if(!id || !isim || !yazar || !teslimTarih){
        showAlert("danger", "Tüm alanları doldurmanız gerekmektedir.");
        return;
    }

    const newEmanet = {
        id: id,
        isim: isim,
        yazar: yazar,
        bugünTarih: bugünTarih,
        teslimTarih: teslimTarih
    };

    addEmanetToStorage(newEmanet);
    showAlert("success", "Kitap İsteğiniz başarıyla oluşturulmuştur.");
    clearFormInputs();
}

function addEmanetToStorage(newEmanet){
    // localStorage üzerine yazmadan önce mevcut verileri alıp üzerine ekleyin
    const existingEmanetList = JSON.parse(localStorage.getItem("EmanetOnay")) || [];
    existingEmanetList.push(newEmanet);
    localStorage.setItem("EmanetOnay", JSON.stringify(existingEmanetList));
}

function showAlert(type,message){
    const div = document.createElement("div");
    div.className = `alert alert-${type} alert-overlay`;
    div.textContent = message;
    document.body.appendChild(div);
    setTimeout(function() {
        div.remove();
    }, 2500);
}

function clearFormInputs() {
    IDinput.value = '';
    isimInput.value = '';
    yazarInput.value = '';
    tarihInput.value = '';
}
