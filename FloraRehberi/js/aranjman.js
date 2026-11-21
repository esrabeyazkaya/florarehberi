// Seçilen çiçek fotoğraflarını kullanarak kişiye özel buket ön izlemesi oluşturur.
$(function () {
  const flowerPhotos = {
    "Gül": "https://images.unsplash.com/photo-1550676049-420da94eaeee?auto=format&fit=crop&w=500&q=85",
    "Lale": "https://images.unsplash.com/photo-1465644714440-4c572259ce2d?auto=format&fit=crop&w=500&q=85",
    "Lavanta": "https://images.unsplash.com/photo-1755138134688-da8bab8db342?auto=format&fit=crop&w=500&q=85",
    "Ayçiçeği": "https://images.unsplash.com/photo-1540039734322-628bcfc131d7?auto=format&fit=crop&w=500&q=85",
    "Papatya": "https://images.unsplash.com/photo-1500945163496-755eb005959b?auto=format&fit=crop&w=500&q=85",
    "Şakayık": "https://images.unsplash.com/photo-1626976109816-08cef8600d7d?auto=format&fit=crop&w=500&q=85"
  };

  const colorThemes = {
    "Pastel tonlar": "pastel",
    "Beyaz ve yeşil": "white-green",
    "Pembe ve kırmızı": "pink-red",
    "Canlı ve renkli": "colorful"
  };

  // Kart seçildiğinde görsel kartın seçili görünmesini sağlar.
  $(".flower-choice").on("change", function () {
    $(this).closest(".flower-card").toggleClass("selected", this.checked);
  });

  $("#bouquetForm").on("submit", function (event) {
    event.preventDefault();

    const occasion = $("#occasion").val();
    const flowers = $(".flower-choice:checked").map(function () { return this.value; }).get();
    const color = $("#color").val();
    const style = $('input[name="style"]:checked').val();

    if (!occasion) { showToast("Lütfen özel gün seçin."); return; }
    if (flowers.length === 0) { showToast("Lütfen en az bir çiçek seçin."); return; }

    const flowerHtml = flowers.map(function (flower, index) {
      const image = flowerPhotos[flower];
      return '<div class="art-flower flower-position-' + (index + 1) + '">' +
        '<img src="' + image + '" alt="' + escapeHtml(flower) + '" loading="lazy">' +
        '<small>' + escapeHtml(flower) + '</small></div>';
    }).join("");

    $("#bouquetArtwork")
      .removeClass("pastel white-green pink-red colorful style-natural style-classic style-modern")
      .addClass(colorThemes[color] || "pastel")
      .addClass("style-" + (style === "Doğal" ? "natural" : style === "Klasik" ? "classic" : "modern"))
      .html('<div class="art-bouquet">' + flowerHtml + '<div class="art-wrap"><span></span></div></div>');

    $("#bouquetPreview").html(
      '<strong>Seçtiğin çiçekler:</strong> ' +
      flowers.map(escapeHtml).join(", ")
    );
    $("#bouquetSummary").html(
      "<strong>" + escapeHtml(occasion) + "</strong> için " +
      escapeHtml(style.toLocaleLowerCase("tr")) + " tarzda, " +
      escapeHtml(color.toLocaleLowerCase("tr")) + " bir aranjman seçtiniz."
    );
    showToast("Fotoğraflı buket ön izlemeniz oluşturuldu.");
  });

  $("#clearBouquet").on("click", function () {
    $("#bouquetForm")[0].reset();
    $(".flower-card").removeClass("selected");
    $("#bouquetArtwork").removeClass("pastel white-green pink-red colorful style-natural style-classic style-modern")
      .html('<div class="bouquet-placeholder"><i class="bi bi-flower3"></i><span>Çiçeklerini seçerek buketini oluştur</span></div>');
    $("#bouquetPreview").html('<p class="text-secondary mb-0">Seçimlerin burada görüntülenecek.</p>');
    $("#bouquetSummary").empty();
    showToast("Seçimler temizlendi.");
  });

  function escapeHtml(value) {
    return $("<div>").text(value).html();
  }
});
