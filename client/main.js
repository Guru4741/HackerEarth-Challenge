//Getting DOM Elements
const ispNames = document.querySelector('.ispNames');
const ispInfo = document.querySelector('.ispInfo');
const btnDownload = document.querySelector('.buttons__download');
const searchBox = document.querySelector('.searchBox');

//Array to store ISP list
const ISPs = [];

//Fetch Call to API
fetch('http://localhost:7676')  //Server is running on port 7676
    .then(data => data.json())
    .then(res => {

        res.forEach(each => {
            listISPNames(each);
            ISPs.push(each);
        })
    })
    .catch(err => console.log(err));


// ISPs.forEach(each => listISPNames(each))

function listISPNames(e) {

    //Creating Elements
    const el = document.createElement('div');
    const name = document.createElement('p')
    const price = document.createElement('p');

    //Creating Icons
    const dataIcon = document.createElement('i');
    const arrowIcon = document.createElement('i');

    dataIcon.classList.add('fas', 'fa-database')
    arrowIcon.classList.add('far', 'fa-arrow-alt-circle-right');

    //Attaching Event Listener to arrow
    arrowIcon.addEventListener('click', () => {
        displayISP(e);
    });

    el.classList.add('ispName');
    name.innerText = e.name;
    price.innerText = `Rs. ${e.price}`;

    //Appending Elements Created
    el.appendChild(dataIcon);
    el.appendChild(name);
    el.appendChild(price);
    el.appendChild(arrowIcon);
    ispNames.appendChild(el);
}

//Attaching Event to Search Box
searchBox.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        const searchKeyword = searchBox.value.toLowerCase();
        const searchFound = ISPs.filter(each => each.name.toLowerCase() === searchKeyword);
        if (searchFound.length !== 0) {
            console.log(searchFound[0])
            ispNames.innerHTML = "";
            listISPNames(searchFound[0]);
        } else if (searchKeyword === "") {
            ispNames.innerHTML = "";
            ISPs.forEach(each => listISPNames(each))
        } else {
            ispNames.innerHTML = "No Such Provider exists."
        }
    }
})

//Attaching Event Download Button
btnDownload.addEventListener('click', () => {
    downloadPDF()
})


//ISP list display function
function displayISP(e) {
    const ispName = document.querySelector('.ispInfoName');
    const ispImage = document.querySelector('.ispImage');
    const ispRatings = document.querySelector('.ratings');
    const ispDescription = document.querySelector('.desc');

    ispImage.src = `http://localhost:7676${e.imageURL}`;
    ispName.innerText = e.name;
    ispRatings.innerText = `Ratings: ${e.ratings}`;
    ispDescription.innerText = e.desc;

}

//ISP Download function
function downloadPDF() {
    const ispName = document.querySelector('.ispInfoName');
    const isp = ISPs.filter(each => each.name === ispName.innerText);

    fetch('http://localhost:7676/download', {
        method: "POST",
        body: JSON.stringify({ "ISP": isp }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(data => data.blob())
        .then(blob => URL.createObjectURL(blob))
        .then(url => {
            window.open(url, '_blank');
            URL.revokeObjectURL(url);
        })
        .catch(err => console.log(err));
}