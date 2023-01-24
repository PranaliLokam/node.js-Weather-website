fetch('http://puzzle.mead.io/puzzle').then((response) => {          //fetch allows us to fetch the data from the URL
    response.json().then((data) => {
        console.log(data);
      })
})



const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#message-1')
const msgTwo = document.querySelector('#message-2')



weatherform.addEventListener('submit', (e) => {            //functions which run that every single times that event occurs. e=event
    e.preventDefault()              //preventDefault going to prevent default behaviour which is to refresh the browser allowing the server to render a new page.
    const location = search.value

    msgOne.textContent = 'Loading...'
    msgTwo.document = ''

    fetch('/weather?address=' + location ).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msgOne.textContent = data.error;
            } else {
                msgOne.textContent = data.location;
                msgTwo.textContent = data.forecast;
            }
        })
    })})        