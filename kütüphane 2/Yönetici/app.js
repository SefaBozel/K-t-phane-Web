// Personel listesi için gerekli değişkenler
let idCounter = 1;
const kaydetBtn = document.querySelector('#kaydetButon');
const guncelleBtn = document.querySelector("#guncelleButton");
const silBtn = document.querySelector("#silButton");
const isimInput = document.querySelector('#isim');
const soyisimInput = document.querySelector('#soyisim');
const telNoInput = document.querySelector('#telNo');
const tcNoInput = document.querySelector('#tcNo');
const sifreInput = document.querySelector('#sifre');
const tableBody = document.querySelector('.table tbody');

let personelListesi = [];

// Olay dinleyicilerini çalıştır
runEvents();

// Olay dinleyicileri ekle
function runEvents() {
    document.addEventListener("DOMContentLoaded", pageloaded);
    kaydetBtn.addEventListener("click", addPersonel);
    silBtn.addEventListener("click", deletePersonel);
}

// Sayfa yüklendiğinde veya ilk oluşturulduğunda personel listesini kontrol eden fonksiyon
function checkPersonelListFromStorage() {
    if (localStorage.getItem("personel") !== null) {
        personelListesi = JSON.parse(localStorage.getItem("personel"));
    }
}

// Formun submit olayını dinleyen fonksiyon
function addPersonel(event) {
    event.preventDefault();

    const isim = isimInput.value;
    const soyisim = soyisimInput.value;
    const telNo = telNoInput.value;
    const tcNo = tcNoInput.value;
    const sifre = sifreInput.value;

    if (!isim || !soyisim || !telNo || !tcNo || !sifre) {
        showAlert("danger", "Tüm alanları doldurmanız gerekiyor.");
        return;
    }

    const newPersonel = {
        id: idCounter++,
        isim: isim,
        soyisim: soyisim,
        telNo: telNo,
        tcNo: tcNo,
        sifre: sifre
    };

    addPersonelToUI(newPersonel);
    addPersonelToStorage(newPersonel);
    showAlert("success", "Personel başarıyla eklendi.");

    // Formu sıfırla
    clearFormInputs();
}

// Kullanıcı arayüzüne personeli ekleyen fonksiyon
function addPersonelToUI(personel) {
    const newRow = tableBody.insertRow();
    newRow.innerHTML = `
        <td>${personel.id}</td>
        <td>${personel.isim}</td>
        <td>${personel.soyisim}</td>
        <td>${personel.telNo}</td>
        <td>${personel.tcNo}</td>
        <td>${personel.sifre}</td>
    `;
}

// Tarayıcı depolama alanına personeli ekleyen fonksiyon
function addPersonelToStorage(newPersonel) {
    personelListesi.push(newPersonel);
    localStorage.setItem("personel", JSON.stringify(personelListesi));
}

// Sayfa yüklendiğinde çalışacak fonksiyon
function pageloaded() {
    checkPersonelListFromStorage();
    personelListesi.forEach(function (personel) {
        addPersonelToUI(personel);
    });
}

// Uyarı gösteren fonksiyon
function showAlert(type, message) {
    const div = document.createElement("div");
    div.className = `alert alert-${type} alert-overlay`;
    div.textContent = message;
    document.body.appendChild(div);
    setTimeout(function () {
        div.remove();
    }, 2500);
}

// Formdaki girdileri temizleyen fonksiyon
function clearFormInputs() {
    isimInput.value = '';
    soyisimInput.value = '';
    telNoInput.value = '';
    tcNoInput.value = '';
    sifreInput.value = '';
}

function deletePersonel() {
    // Kullanıcıdan silmek istediği personelin ID'sini al
    const deleteID = parseInt(document.querySelector('#ID').value);

    // Girilen ID'yi kontrol et
    if (!deleteID || isNaN(deleteID)) {
        showAlert("danger", "Geçersiz ID girdiniz.");
        return;
    }

    // Silinecek personeli bul
    const index = personelListesi.findIndex(personel => personel.id === deleteID);

    // Eğer ID bulunamazsa uyarı göster ve işlemi sonlandır
    if (index === -1) {
        showAlert("danger", "Bu ID'ye sahip bir personel bulunamadı.");
        return;
    }

    // Personeli listeden ve tarayıcı depolama alanından sil
    personelListesi.splice(index, 1);
    localStorage.setItem("personel", JSON.stringify(personelListesi));

    // Tablodan da sil
    const rows = document.querySelectorAll('.table tbody tr');
    if (rows.length > 0) {
        rows.forEach(row => {
            // Satırın içinde hücreler olduğunu kontrol et
            if (row.cells.length > 0) {
                // Hücreler varsa, hedef hücrenin textContent'ini kontrol et
                if (parseInt(row.cells[0].textContent) === deleteID) {
                    row.remove();
                }
            }
        });
    }




    // Başarılı bir şekilde silindiğine dair uyarı göster
    showAlert("success", "Personel başarıyla silindi.");
    location.reload();
}