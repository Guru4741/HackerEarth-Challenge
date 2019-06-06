import '../css/style.scss';

//Getting DOM Elements
const ispNames = document.querySelector('.ispNames');
const ispInfo = document.querySelector('.ispInfo');
const btnDownload = document.querySelector('.buttons__download');
const searchBox = document.querySelector('.searchBox');
const homeIcom = document.querySelector('.ispSearchBar p');
const sortBtn = document.querySelector('.sortBtn');

//Flag for dislay ISP details
let ispSelected = false;

//Array to store ISP list
const ISPs = [];

//Display view for ISP Details 
checkSelection();

//Fetch Call to API
fetch('http://localhost:7676/data')  //Server is running on port 7676
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
    arrowIcon.classList.add('far', 'fa-arrow-alt-circle-right', 'arrow');

    //Attaching Event Listener to arrow
    arrowIcon.addEventListener('click', () => {
        ispSelected = true;
        checkSelection();
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


//Check whether any List item is selected or not
function checkSelection() {
    if (ispSelected === false) {
        ispInfo.childNodes[1].style.display = 'block';
        ispInfo.childNodes[3].style.display = 'none';
    } else {
        ispInfo.childNodes[1].style.display = 'none';
        ispInfo.childNodes[3].style.display = 'block';
    }
}

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
            ispSelected = false;
            checkSelection();
        }
    }
})

//Attaching Event Download Button
btnDownload.addEventListener('click', () => {
    downloadPDF()
})


//Attaching Event to ispNames Box
ispNames.addEventListener('click', (e) => {
    // console.log([...e.target.childNodes])
    if (e.target.classList.contains('arrow')) {
        [...e.target.parentNode.parentNode.childNodes].forEach(each => {
            each.classList.remove('selected')
        });
        e.target.parentNode.classList.add('selected')
    }
})

//Attaching Event to Home Icon
homeIcom.addEventListener('click', () => {
    ispNames.innerHTML = "";
    ISPs.forEach(each => listISPNames(each))
    searchBox.value = "";
    ispSelected = false;
    checkSelection();
})

//Attaching Event to Sort Button
sortBtn.addEventListener('click', () => {
    const sortBy = document.querySelector('input[name="sorting"]:checked').value;
    if (sortBy === 'price') {
        ISPs.sort(function (a, b) { return a.price - b.price });
        ispNames.innerHTML = "";
        ISPs.forEach(each => listISPNames(each))
    }
    if (sortBy === 'speed') {
        ISPs.sort(function (a, b) { return a.speed - b.speed });
        ispNames.innerHTML = "";
        ISPs.forEach(each => listISPNames(each))
    }
})