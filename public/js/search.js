var clickedbutton = false

// Changes the results into buttons and icons that will redirect to the obtain page.
function xivapisearch() {
    var searchfor = document.getElementById("searchedname").innerHTML;
    var xivapiurl = "https://xivapi.com/search?indexes=recipe&filters=&string=" + searchfor + "&page=1"
    var list = document.getElementById("itemlist")

    var xmlhttp = new XMLHttpRequest();
    // Looks like when xmlhttp changes, we parse it onto an object, and we can use it.
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var searchresult = JSON.parse(this.responseText);
            for (var i = 0; i < searchresult.Results.length; i++) {

                var linktoobtain = document.createElement("button")
                linktoobtain.className = "uk-button uk-button-text uk-text-capitalize"
                linktoobtain.innerHTML = searchresult.Results[i].Name
                // Uses the hidden obtainform to post the specific value to it.
                linktoobtain.form = "obtainform"

                var item = document.createElement("li")
                var image = document.createElement("img")
                var iconid = searchresult.Results[i].Icon
                var newiconid = "/public/img/icon/" + iconid.substr(3)
                item.appendChild(image)
                image.src = newiconid
                image.style.marginRight = "5px"
                item.appendChild(linktoobtain)

                // We also need the Recipe ID
                linktoobtain.value = searchresult.Results[i].ID
                linktoobtain.onclick = function () {
                    if (!clickedbutton) {
                        clickedbutton = true
                        obtainrecipe(this.value)
                        // We don't ever unlock the button.
                        // So that it doesn't interrupt the current inserts and api calls.
                    }

                }

                list.appendChild(item)
            }
        }
    };
    xmlhttp.open("GET", xivapiurl, true);
    xmlhttp.send();

}

function obtainrecipe(recipeid) {
    $("#obtaininput").attr("value", recipeid)
    document.getElementById("obtainform").submit();
}


function unlock() {
    clickedbutton = false
}