const ispNames = document.querySelector('.ispNames');

fetch('http://localhost:7676')
    .then(data => data.json())
    .then(res => {
        console.log(res);
        res.forEach(each => {
            listISPNames(each);
        })
    })
    .catch(err => console.log(err));

function listISPNames(e) {
    const el = document.createElement('p');
    const price = document.createElement('p');
    el.classList.add('ispName');
    el.innerText = e.name;
    ispNames.appendChild(el);
}