$(document).ready(function () {
    $("#submitBtn").on("click", function () {
        var zip = $(".inputZip").val()
        console.log(zip)
        //var selectMap = `https://maps.google.com/maps?q=${zip}&t=&z=13&ie=UTF8&iwloc=&output=embed`
        //console.log(selectMap)
        document.getElementById("gmap_canvas").src = `https://maps.google.com/maps?q=${zip}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
    });


});