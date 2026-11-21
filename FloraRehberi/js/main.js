// Ortak tema, bildirim ve küçük sayfa etkileşimleri
$(function () {
  const savedTheme = localStorage.getItem("floraTheme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  $("#themeToggle").on("click", function () {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    const next = current === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("floraTheme", next);
    updateThemeIcon(next);
    showToast(next === "dark" ? "Koyu tema etkinleştirildi." : "Açık tema etkinleştirildi.");
  });

  function updateThemeIcon(theme) {
    $("#themeToggle").html(theme === "dark" ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon-stars"></i>');
  }

  // jQuery slideToggle efekti
  $(".section-kicker").first().css("cursor", "pointer").attr("title", "Açıklamayı göster/gizle").on("click", function () {
    $(this).next("h1, h2").first().slideToggle(250);
  });

  // jQuery fadeIn/fadeOut efekti
  $("#factButton").on("click", function () {
    const facts = [
      "Lavanta, hoş kokusunun yanında tarih boyunca temizlik ve sakinlikle ilişkilendirilmiştir.",
      "Ayçiçeğinin bilimsel adı Helianthus, Yunanca güneş ve çiçek sözcükleriyle ilişkilidir.",
      "Zeytin ağacı Akdeniz kültüründe barış ve bereketin önemli sembollerindendir.",
      "Lale, Osmanlı sanatında ve bahçe kültüründe özel bir yere sahiptir."
    ];
    const next = facts[Math.floor(Math.random() * facts.length)];
    $("#dailyFact").fadeOut(150, function () { $(this).text(next).fadeIn(250); });
  });

  // jQuery animate efekti ve yukarı çıkma butonu
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 300) $("#backToTop").fadeIn(200);
    else $("#backToTop").fadeOut(200);
  });
  $("#backToTop").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 500);
  });
});

function showToast(message) {
  $("#toastMessage").text(message);
  const toastElement = document.getElementById("floraToast");
  if (toastElement && window.bootstrap) {
    bootstrap.Toast.getOrCreateInstance(toastElement).show();
  }
}
