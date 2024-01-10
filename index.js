function eklemeYap(textarea) {
    const sabitMetin = "Notlar\n\n";
    const kullaniciGirdisi = textarea.value.slice(sabitMetin.length);

    if (!textarea.value.startsWith(sabitMetin)) {
        textarea.value = sabitMetin + kullaniciGirdisi;
    }
}





function gunleriyaz(textArea) {
    const gunAdi = textArea.placeholder.split(" ")[0]; // Gün adını alır
    const sabitMetin = gunAdi + "\n";
    const kullaniciGirdisi = textArea.value.slice(sabitMetin.length);

    if (!textArea.value.startsWith(sabitMetin)) {
        textArea.value = sabitMetin + kullaniciGirdisi;
    }
}





function updateClock() {
    let now = new Date();
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    let day = now.getDate().toString().padStart(2, '0');
    let month = (now.getMonth() + 1).toString().padStart(2, '0'); // Ay 0'dan başladığı için 1 ekliyoruz
    let year = now.getFullYear();

    document.getElementById('hour').textContent = hours;
    document.getElementById('minute').textContent = minutes;
    document.getElementById('calendar').textContent = `${day}.${month}.${year}`;
}

setInterval(updateClock, 1000);
updateClock();



var textareas = document.querySelectorAll('textarea');

textareas.forEach(function(textarea, index) {
    // Görevleri yerel depolamadan yükle
    textarea.value = localStorage.getItem('gorev' + index) || '';
    // Yüksekliği yerel depolamadan yükle
    var savedHeight = localStorage.getItem('textareaHeight' + index);
    if (savedHeight) {
        textarea.style.height = savedHeight;
    }

    textarea.addEventListener('input', function() {
        autoResize.call(textarea);
        // Her değişiklikte görevi ve yüksekliği kaydet
        localStorage.setItem('gorev' + index, textarea.value);
        localStorage.setItem('textareaHeight' + index, textarea.style.height);
    }, false);
});

function autoResize() {
    this.style.height = 'auto';
    if (this.scrollHeight < 120) {
        this.style.height = this.scrollHeight + 'px';
    } else {
        this.style.height = '120px';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const asistanDiv = document.querySelector('.asistan');
    
    // 2 saniye sonra "Merhabalar" mesajını göster
    setTimeout(function() {
        asistanDiv.textContent = 'Merhaba hoş geldiniz.';
    });
    
    // Saate göre günün zaman dilimine uygun mesajı göster
    const saat = new Date().getHours();
    let zamanMesaji = '';
    if (saat < 6) {
        zamanMesaji = 'Bu saatte hala ayaktasınız, iyi geceler,';
    } else if (saat < 12) {
        zamanMesaji = 'Günaydın';
    } else if (saat < 18) {
        zamanMesaji = 'İyi günler';
    } else if (saat < 24) {
        zamanMesaji = 'İyi akşamlar';
    }
    
    // Belirlenen zaman dilimine uygun mesajı göster
    setTimeout(function() {
        asistanDiv.textContent = zamanMesaji;
    }, 5000);
});


function yildizEkle(textarea) {
    const satirlar = textarea.value.split('\n');
    for (let i = 1; i < satirlar.length; i++) {
        // Satır zaten '*' ile başlıyorsa ve kullanıcı yıldızı silmek istiyorsa
        if (satirlar[i].startsWith('* ') && satirlar[i].trim().length === 1) {
            satirlar[i] = satirlar[i].replace('* ', '');
        }
        // Yıldız eklemek
        else if (satirlar[i] !== '' && !satirlar[i].startsWith('* ')) {
            satirlar[i] = '* ' + satirlar[i];
        }
    }
    textarea.value = satirlar.join('\n');
}

// textarea event listener'larınızın olduğu kısım
textareas.forEach(function(textarea, index) {
    textarea.addEventListener('input', function() {
        autoResize.call(textarea);
        localStorage.setItem('gorev' + index, textarea.value);
        localStorage.setItem('textareaHeight' + index, textarea.style.height);

        yildizEkle(textarea);
    }, false);
});




// Sayfa yüklendiğinde değerleri yükle
document.addEventListener("DOMContentLoaded", function() {
    var okunan = localStorage.getItem("okunan");
    var hedef = localStorage.getItem("hedef");

    if (okunan !== null) {
        document.getElementById("okunan").textContent = okunan;
    }

    if (hedef !== null) {
        document.getElementById("hedef").textContent = hedef;
    }
});

function degistirMiktar(miktar) {
    var okunanEleman = document.getElementById("okunan");
    var hedefEleman = document.getElementById("hedefSayıİnp");
    var yeniMiktar = parseInt(okunanEleman.textContent) + miktar;
    var hedefMiktar = parseInt(hedefEleman.textContent);

    if (yeniMiktar >= 0 && yeniMiktar <= hedefMiktar) {
        okunanEleman.textContent = yeniMiktar;
        localStorage.setItem("okunan", yeniMiktar);
    }

}
function kontrolHedef(element) {
    var deger = element.textContent;

    if (deger.length > 2) {
        deger = deger.substring(0, 2);
        element.textContent = deger;
    }

    if (isNaN(deger) || deger < 0 || deger > 99) {
        alert("Lütfen 0 ile 99 arasında bir sayı girin.");
        element.textContent = localStorage.getItem("hedefSayıİnp") || '0';
    } else {
        localStorage.setItem("hedefSayıİnp", deger);
    }
}


document.addEventListener("DOMContentLoaded", function() {
    var okunan = localStorage.getItem("okunan");
    var hedef = localStorage.getItem("hedefSayıİnp");

    if (okunan !== null) {
        document.getElementById("okunan").textContent = okunan;
    }

    if (hedef !== null) {
        document.getElementById("hedefSayıİnp").textContent = hedef;
    }
});
