// Bitki kartlarını kategori ve arama metnine göre filtreler.
$(function () {
  let activeFilter = "all";

  function filterPlants() {
    const searchText = $("#plantSearch").val().toLocaleLowerCase("tr").trim();
    let visibleCount = 0;

    $(".plant-card").each(function () {
      const category = $(this).data("category");
      const searchableText = ($(this).data("search") + " " + $(this).text()).toLocaleLowerCase("tr");
      const matchesCategory = activeFilter === "all" || category === activeFilter;
      const matchesSearch = searchableText.includes(searchText);
      const shouldShow = matchesCategory && matchesSearch;

      if (shouldShow) {
        $(this).stop(true, true).fadeIn(180);
        $(this).prop("hidden", false);
        visibleCount++;
      } else {
        $(this).stop(true, true).hide();
        $(this).prop("hidden", true);
      }
    });

    $("#noResults").prop("hidden", visibleCount !== 0);
  }

  $(".filter-btn").on("click", function () {
    $(".filter-btn").removeClass("active");
    $(this).addClass("active");
    activeFilter = $(this).data("filter");
    filterPlants();
  });

  $("#plantSearch").on("input", filterPlants);

  $("#plantModal").on("show.bs.modal", function (event) {
    const button = $(event.relatedTarget);
    $("#plantModalTitle").text(button.data("plant") + " – Bakım Bilgisi");
    $("#plantModalBody").text(button.data("detail"));
  });
});
