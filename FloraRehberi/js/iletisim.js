// İletişim formu için istemci taraflı doğrulama.
$(function () {
  $("#contactForm").on("submit", function (event) {
    event.preventDefault();

    const name = $("#fullName").val().trim();
    const email = $("#email").val().trim();
    const topic = $("#topic").val();
    const password = $("#password").val();
    const passwordAgain = $("#passwordAgain").val();
    const message = $("#message").val().trim();
    const consent = $("#consent").is(":checked");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const checks = [
      { selector: "#fullName", valid: name.length >= 2 },
      { selector: "#email", valid: emailPattern.test(email) },
      { selector: "#topic", valid: topic !== "" },
      { selector: "#password", valid: password.length >= 6 },
      { selector: "#passwordAgain", valid: passwordAgain !== "" && passwordAgain === password },
      { selector: "#message", valid: message.length >= 5 },
      { selector: "#consent", valid: consent }
    ];

    let isValid = true;
    checks.forEach(function (check) {
      $(check.selector).toggleClass("is-invalid", !check.valid);
      if (!check.valid) isValid = false;
    });

    if (!isValid) {
      $("#formAlert").removeClass("d-none alert-success").addClass("alert-danger")
        .text("Lütfen işaretlenen alanları kontrol edin. Şifre en az 6 karakter olmalı ve şifre tekrarı eşleşmelidir.");
      showToast("Formda hatalı veya eksik alanlar var.");
      return;
    }

    $("#formAlert").removeClass("d-none alert-danger").addClass("alert-success")
      .text("Form kontrolü başarılı! Bu örnek projede bilgiler sunucuya gönderilmez.");
    showToast("Form başarıyla doğrulandı.");
    this.reset();
    $(this).find(".is-invalid").removeClass("is-invalid");
  });

  $("#contactForm input, #contactForm textarea, #contactForm select").on("input change", function () {
    $(this).removeClass("is-invalid");
  });
});
