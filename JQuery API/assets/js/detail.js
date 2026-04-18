$(function () {
    var $detailWrapper = $(".product-detail-wrapper");

    if (!$detailWrapper.length) {
        return;
    }

    var params = new URLSearchParams(window.location.search);
    var productId = params.get("id");

    if (!productId) {
        $detailWrapper.html(
            '<div class="alert alert-warning text-center" role="alert">Product id not found.</div>'
        );
        return;
    }

    $.ajax({
        url: "https://fakestoreapi.com/products/" + productId,
        method: "GET",
        dataType: "json",
        success: function (product) {
            var detailHtml = "";

            detailHtml += '<div class="card border-0 shadow-sm product-detail-card" data-id="' + product.id + '" data-price="' + product.price + '">';
            detailHtml += '<div class="row g-0 align-items-center">';
            detailHtml += '<div class="col-md-5 text-center p-4">';
            detailHtml += '<img src="' + product.image + '" class="img-fluid product-detail-image" alt="' + product.title + '">';
            detailHtml += '</div>';
            detailHtml += '<div class="col-md-7">';
            detailHtml += '<div class="card-body p-4 p-lg-5">';
            detailHtml += '<span class="badge text-bg-light border mb-3">' + product.category + '</span>';
            detailHtml += '<h1 class="h2 mb-3 card-title">' + product.title + '</h1>';
            detailHtml += '<p class="text-muted card-text mb-4">' + product.description + '</p>';
            detailHtml += '<div class="d-flex align-items-center justify-content-between flex-wrap gap-3">';
            detailHtml += '<span class="product-price fs-3 fw-bold text-primary">$' + Number(product.price).toFixed(2) + '</span>';
            detailHtml += '<div class="add-to-card d-flex align-items-center gap-3">';
            detailHtml += '<button class="btn btn-primary px-4">Add to Cart</button>';
            detailHtml += '<a href="./basket.html" class="btn btn-outline-dark">Go To Basket</a>';
            detailHtml += '</div>';
            detailHtml += '</div>';
            detailHtml += '</div>';
            detailHtml += '</div>';
            detailHtml += '</div>';
            detailHtml += '</div>';

            $detailWrapper.html(detailHtml);
        },
        error: function () {
            $detailWrapper.html(
                '<div class="alert alert-danger text-center" role="alert">Product could not be loaded.</div>'
            );
        }
    });
});
