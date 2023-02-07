$(window).on( "load", function () {
    // API status check
    $.get("http://0.0.0.0:5001/api/v1/status/", function (data, status) {
        if (data["status"] == "OK") {
            $("#api_status").attr("class", "available")
        } else {
            $("#api_status").removeAttr("class")
        }
    })
    // Amenities selection
    let amenity_ids = [];
    let amenity_names = []
    $("input:checkbox").on("click", function () {
        let id = $(this).attr("data-id")
        let name = $(this).attr("data-name")
        if (!amenity_ids.includes(id)) {
            amenity_ids.push(id)
            amenity_names.push(name)
        } else {
            let index = amenity_ids.indexOf(id)
            amenity_ids.splice(index, 1)
            amenity_names.splice(index, 1)
        }

        let h4_text; 
        if (amenity_names.length === 0) {
            h4_text = "&nbsp;"
        } else {
            h4_text = ""
            for (let i = 0; i < amenity_names.length; i++) {
                h4_text += amenity_names[i]
                if (i !== (amenity_names.length - 1)) {
                    h4_text += ", "
                } 
            }
        }
        $(".amenities h4").html(h4_text)
    })
    //Load places
    $.post({url: "http://0.0.0.0:5001/api/v1/places_search/", contentType: "application/json", data: "{}", success: function (data, status) {
        data.forEach( function (place) {
            $("section.places").html(function (index, prevhtml) {
                title = `<h2>${place["name"]}</h2>`;
                price = `<div class="price_by_night">$${place["price_by_night"]}</div>`;
                title_box = `<div class="title_box">${title} ${price}</div>`;

                if (place["max_guest"] > 1) {
                    max_guest = `<div class="max_guest">${place["max_guest"]} Guests</div>`;
                } else {
                    max_guest = `<div class="max_guest">${place["max_guest"]} Guest</div>`;
                }

                if (place["number_rooms"] > 1) {
                    number_rooms = `<div class="number_rooms">${place["number_rooms"]} Bedrooms</div>`;
                } else {
                    number_rooms = `<div class="number_rooms">${place["number_rooms"]} Bedroom</div>`;
                }

                if (place["number_bathrooms"] > 1) {
                    number_bathrooms = `<div class="number_bathrooms">${place["number_bathrooms"]} Bathrooms</div>`;
                } else {
                    number_bathrooms = `<div class="number_bathrooms">${place["number_bathrooms"]} Bathroom</div>`;
                }
                information = `<div class="information">${max_guest} ${number_rooms} ${number_bathrooms}</div>`;

                description = `<div class="description">${place["description"]}</div>`;

                article = `<article>${title_box} ${information} ${description}</article> ${prevhtml} `;

                return article;
            })
        })
    }})
});