// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// })


// fetch('http://localhost:3000/weather?address=us').then((response) => {
//     response.json().then((data) => {
//         if(data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data);
//         }
//     })
// })

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = '';

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const location = search.value;
    const url = '/weather?address=' + location;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                //console.log(data.error)
                messageOne.textContent = data.error;
            } else {
                //console.log(data);
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    })
})