$(function () {
    var $cardsContainer = $(".cards");

    if (!$cardsContainer.length) {
        return;
    }

    $.ajax({
        url: "https://fakestoreapi.com/products",
        method: "GET",
        dataType: "json",
        success: function (response) {
            var cardsHtml = "";

            $.each(response, function (_, product) {
                var title = product.title;
                var description = product.description;

                if (title.length > 38) {
                    title = title.slice(0, 38) + "...";
                }

                if (description.length > 90) {
                    description = description.slice(0, 90) + "...";
                }

                cardsHtml += '<div class="card" style="width: 18rem;" data-id="' + product.id + '" data-price="' + product.price + '">';
                cardsHtml += '<img src="' + product.image + '" class="card-img-top product-image" alt="' + product.title + '">';
                cardsHtml += '<div class="card-body">';
                cardsHtml += '<h5 class="card-title">' + title + '</h5>';
                cardsHtml += '<p class="card-text">' + description + '</p>';
                cardsHtml += '<a href="./product-detail.html?id=' + product.id + '" class="stretched-link product-link"></a>';
                cardsHtml += '</div>';
                cardsHtml += '<div class="add-to-card p-3 d-flex justify-content-between align-items-center gap-3">';
                cardsHtml += '<span class="product-price fw-bold text-primary">$' + Number(product.price).toFixed(2) + '</span>';
                cardsHtml += '<button class="btn btn-primary">Add to Cart</button>';
                cardsHtml += '</div>';
                cardsHtml += '</div>';
            });

            $cardsContainer.html(cardsHtml);
        },
        error: function () {
            $cardsContainer.html(
                '<div class="alert alert-danger w-100 text-center" role="alert">Products could not be loaded from API.</div>'
            );
        }
    });
});
