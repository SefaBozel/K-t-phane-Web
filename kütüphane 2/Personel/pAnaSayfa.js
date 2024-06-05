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
