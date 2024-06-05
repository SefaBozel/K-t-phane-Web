let idCounter = 1;
const kaydetBtn = document.querySelector("#kaydetButton");
const silBtn = document.querySelector("#silButton");
const isimInput = document.querySelector("#name");
const soyisimInput = document.querySelector("#surname");
const tcInput = document.querySelector("#tc");
const telInput = document.querySelector("#phone");
const sifreInput = document.querySelector("#password");
const tableBody = document.querySelector('.table tbody');

let kullaniciListesi = [];

runEvents();

function runEvents() {
    document.addEventListener("DOMContentLoaded", pageloaded);
    kaydetBtn.addEventListener("click", addKullanici);
    silBtn.addEventListener("click", deleteKullanici);
}

function checkKullaniciListFromStorage() {
    if (localStorage.getItem("Kullanici") !== null) {
        kullaniciListesi = JSON.parse(localStorage.getItem("Kullanici"));
    }
}

function addKullanici(event) {
    event.preventDefault();
    const isim = isimInput.value;
    const soyisim = soyisimInput.value;
    const tc = tcInput.value;
    const tel = telInput.value;
    const sifre = sifreInput.value;

    if (!isim || !soyisim || !tc || !tel || !sifre) {
        showAlert("danger", "Tüm alanları doldurmanız gerekiyor.");
        return;
    }

    const newKullanici = {
        id: idCounter++,
        isim: isim,
        soyisim: soyisim,
        tc: tc,
        tel: tel,
        sifre: sifre
    };

    addKullaniciToUI(newKullanici);
    addKullaniciToStorage(newKullanici);
    showAlert("success", "Kullanıcı başarıyla kaydedildi.");
    clearFormInputs();
}

function addKullaniciToUI(kullanici) {
    const newRow = tableBody.insertRow();
    newRow.innerHTML = `
    <td>${kullanici.id}</td>
    <td>${kullanici.isim}</td>
    <td>${kullanici.soyisim}</td>
    <td>${kullanici.tc}</td>
    <td>${kullanici.tel}</td>
    <td>${kullanici.sifre}</td>
    `;
}

function addKullaniciToStorage(newKullanici) {
    kullaniciListesi.push(newKullanici);
    localStorage.setItem("Kullanici", JSON.stringify(kullaniciListesi));
}

function pageloaded() {
    checkKullaniciListFromStorage();
    kullaniciListesi.forEach(function(kullanici) {
        addKullaniciToUI(kullanici);
    });
}

function showAlert(type, message) {
    const div = document.createElement("div");
    div.className = `alert alert-${type} alert-overlay`;
    div.textContent = message;
    document.body.appendChild(div);
    setTimeout(function() {
        div.remove();
    }, 2500);
}

function clearFormInputs() {
    isimInput.value = '';
    soyisimInput.value = '';
    tcInput.value = '';
    telInput.value = '';
    sifreInput.value = '';
}

function deleteKullanici(){
    const deleteID = parseInt(document.querySelector("#ID").value);
    if(!deleteID || isNaN(deleteID)) {
        showAlert("danger", "Geçersiz ID girdiniz");
        return;
    }

    const index = kullaniciListesi.findIndex(kullanici => kullanici.id === deleteID);
    if(index === -1) {
        showAlert("danger", "Bu ID'ye sahip bir kullanıcı bulunamadı.");
        return;
    }

    kullaniciListesi.splice(index, 1);
    localStorage.setItem("Kullanici", JSON.stringify(kullaniciListesi));

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

    alert("Kullanıcı Başarıyla Silindi.");
}
