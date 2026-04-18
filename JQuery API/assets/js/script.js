$(function () {
    var basketKey = "basketItems";
    var $basketBadge = $(".basket-icon .badge");
    var $basketItemsContainer = $(".basket-items");
    var $basketEmpty = $(".basket-empty");
    var $basketTable = $(".basket-table");
    var $summaryItems = $(".summary-items");
    var $summaryCount = $(".summary-count");
    var $summaryPrice = $(".summary-price");

    function getBasketItems() {
        return JSON.parse(localStorage.getItem(basketKey)) || [];
    }

    function setBasketItems(items) {
        localStorage.setItem(basketKey, JSON.stringify(items));
    }

    function formatPrice(price) {
        return "$" + Number(price).toFixed(2);
    }

    function updateBasketCount() {
        var basketItems = getBasketItems();
        $basketBadge.text(basketItems.length);
    }

    function updateBasketSummary(basketItems) {
        var totalCount = 0;
        var totalPrice = 0;

        $.each(basketItems, function (_, item) {
            totalCount += item.count;
            totalPrice += item.price * item.count;
        });

        $summaryItems.text(basketItems.length);
        $summaryCount.text(totalCount);
        $summaryPrice.text(formatPrice(totalPrice));
    }

    function renderBasketItems() {
        var basketItems = getBasketItems();
        var basketRows = "";

        if (!$basketItemsContainer.length) {
            return;
        }

        if (!basketItems.length) {
            $basketItemsContainer.html("");
            $basketEmpty.removeClass("d-none");
            $basketTable.addClass("d-none");
            updateBasketSummary([]);
            return;
        }

        $basketEmpty.addClass("d-none");
        $basketTable.removeClass("d-none");

        $.each(basketItems, function (_, item) {
            basketRows += '<tr>';
            basketRows += '<td><img src="' + item.image + '" alt="' + item.title + '" width="80" class="rounded"></td>';
            basketRows += '<td><h6 class="mb-1">' + item.title + '</h6></small></td>';
            basketRows += '<td class="fw-semibold">' + formatPrice(item.price) + '</td>';
            basketRows += '<td>';
            basketRows += '<div class="basket-qty d-inline-flex align-items-center gap-2">';
            basketRows += '<button class="btn btn-outline-secondary btn-sm decrease-count" data-id="' + item.id + '">-</button>';
            basketRows += '<span class="fw-semibold min-width-count text-center">' + item.count + '</span>';
            basketRows += '<button class="btn btn-outline-secondary btn-sm increase-count" data-id="' + item.id + '">+</button>';
            basketRows += '</div>';
            basketRows += '</td>';
            basketRows += '<td class="fw-semibold">' + formatPrice(item.price * item.count) + '</td>';
            basketRows += '<td><button class="btn btn-danger btn-sm remove-item" data-id="' + item.id + '">Remove</button></td>';
            basketRows += '</tr>';
        });

        $basketItemsContainer.html(basketRows);
        updateBasketSummary(basketItems);
    }

    function getProductData($card, index) {
        return {
            id: Number($card.data("id")) || index + 1,
            image: $card.find("img").attr("src"),
            title: $.trim($card.find(".card-title").text()) || $.trim($card.find(".card-text").text()),
            price: Number($card.data("price")) || 0,
            count: 1
        };
    }

    function saveAndRefresh(items) {
        setBasketItems(items);
        updateBasketCount();
        renderBasketItems();
    }

    function showSuccessAlert(title, text) {
        if (typeof Swal === "undefined") {
            return;
        }

        Swal.fire({
            icon: "success",
            title: title,
            text: text,
            timer: 1400,
            showConfirmButton: false
        });
    }

    $(document).on("click", ".add-to-card .btn", function (event) {
        event.preventDefault();
        event.stopPropagation();

        var $card = $(this).closest(".card");
        var cardIndex = $(".card").index($card);
        var product = getProductData($card, cardIndex);
        var basketItems = getBasketItems();
        var existingProduct = null;

        $.each(basketItems, function (_, item) {
            if (item.id === product.id) {
                existingProduct = item;
                return false;
            }
        });

        if (existingProduct) {
            existingProduct.count += 1;
        } else {
            basketItems.push(product);
        }

        saveAndRefresh(basketItems);
        showSuccessAlert("Added to cart", product.title + " added successfully.");
    });

    $(document).on("click", ".increase-count", function () {
        var id = Number($(this).data("id"));
        var basketItems = getBasketItems();

        $.each(basketItems, function (_, item) {
            if (item.id === id) {
                item.count += 1;
                return false;
            }
        });

        saveAndRefresh(basketItems);
    });

    $(document).on("click", ".decrease-count", function () {
        var id = Number($(this).data("id"));
        var basketItems = getBasketItems();

        basketItems = $.grep(basketItems, function (item) {
            if (item.id === id) {
                item.count -= 1;
            }

            return item.count > 0;
        });

        saveAndRefresh(basketItems);
    });

    $(document).on("click", ".remove-item", function () {
        var id = Number($(this).data("id"));
        var removedTitle = "";
        var basketItems = $.grep(getBasketItems(), function (item) {
            if (item.id === id) {
                removedTitle = item.title;
            }
            return item.id !== id;
        });

        saveAndRefresh(basketItems);
        showSuccessAlert("Removed", removedTitle + " removed from basket.");
    });

    updateBasketCount();
    renderBasketItems();
});
