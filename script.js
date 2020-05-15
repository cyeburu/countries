function fetchData(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            //console.log(data)
            countryInformation(data)
            searchBar()
        })
}

function paragraphTag(element, text) {
    let paragraph = document.createElement("p");
    paragraph.className = "para"
    paragraph.innerHTML = `${element} : ${text}`
    return paragraph;

}

function countryInformation(data) {
    //console.log(data);
    let countryDiv = document.querySelector("#countryDiv");

    data.forEach(info => {
        let flagInfo = document.createElement("div")
        countryDiv.appendChild(flagInfo);
        flagInfo.className = "flagInfo"
        let flagDiv = document.createElement("div");
        flagDiv.className = "flag"
        flagInfo.appendChild(flagDiv);
        let flagImage = document.createElement("img");
        flagDiv.appendChild(flagImage);
        flagImage.className = "image"
        flagImage.src = info.flag
        let countryContent = document.createElement("div");
        countryContent.className = "info"
        flagInfo.appendChild(countryContent);
        let countryName = document.createElement("h1");
        countryContent.appendChild(countryName);
        countryName.textContent = info.name;
        countryContent.appendChild(paragraphTag("Population", info.population))
        countryContent.appendChild(paragraphTag("Region", info.region))
        countryContent.appendChild(paragraphTag("Capital", info.capital))
    })
}
function searchBar() {
    //let input = event.target.value
    let userSearch = document.getElementById("searchInput");
    let country = document.getElementsByClassName("flagInfo")
    let countryArray = Array.from(country);
    userSearch.addEventListener("keyup", (element) => {
        let text = element.target.value.toLowerCase();
        countryArray.forEach(content => {
            let textLowerCase = content.textContent.toLowerCase()
            if (textLowerCase.indexOf(text) != -1) {
                content.style.display = "block"
            } else {
                content.style.display = "none"
            }
        })
    })

}

function onLoad() {
    fetchData(`https://restcountries.eu/rest/v2/all`)

}
window.onload = onLoad;

