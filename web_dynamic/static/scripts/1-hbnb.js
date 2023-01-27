$(window).on( "load", function () {
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
});