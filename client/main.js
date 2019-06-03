//Getting DOM Elements
const ispNames = document.querySelector('.ispNames');
const ispInfo = document.querySelector('.ispInfo');

//Fetch Call to API
fetch('http://localhost:7676')  //Server is running on port 7676
    .then(data => data.json())
    .then(res => {
        console.log(res);
        res.forEach(each => {
            listISPNames(each);
        })
    })
    .catch(err => console.log(err));

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