//In our movie-fight app, we have a debounce on our search item. Therefore, we have to create a function that waits for a certain action to happen before we progress with our code.
//We do this with a promised-based function. It needs to be promised-based so that we can await the promise to be resolved before progressing to our new code OR so we can reject the promise and throw an error if what we need to occur never happens
//We pass through the selector aka the item that we need to see in our DOM before we move on
const waitFor = (selector) => {
    //We create a new promise
   return new Promise((resolve, reject) => {
       //First, we set up an interval. The interval checks if that new item has appeared frequently. We chose 30 ms - you want it frequently enough so that it catches it quickly but not so frequently that it unneccesarily uses up a lot of our CPU
       const interval = setInterval(() => {
           if(document.querySelector(selector)) {
               //If we do find it, we want to kill our timeout and interval and resolve the promise
                clearInterval(interval)
                clearTimeout(timeout)
                resolve();
           }
       }, 30)

       //If we are waiting on something that never occurs, we want to have a way of exiting the test and throwing an error. Therefore, we create a timeout and set it for about 2 seconds. If the thing we are looking for with our interval has not occurred after 2 seconds, it probably won't occur at all, so we clear the interval and reject the promise.
       const timeout = setTimeout(() => {
            clearInterval(interval)
            reject();
       }, 2000)
   })
}

beforeEach(() => {
    document.querySelector('#target').innerHTML = ''
    createAutoComplete({
        root : document.querySelector('#target'),
        fetchData() {
            return [
                {Title:'Avengers'},
                {Title:'Not Avengers'},
                {Title: 'Some other movie'}
            ]
        },
        renderOption(movie) {
            return movie.Title;
        }
    })
})

it('Dropdown starts closed', () => {
    const dropdown = document.querySelector('.dropdown')
    expect(dropdown.className).not.to.include('is-active')
}) 

it('Dropdown opens after search', async () => {
    const input = document.querySelector('input')
    input.value = 'avengers'
    input.dispatchEvent(new Event('input'))
    
    //In this particular case, we are waiting for the dropdown items to appear. This signals that the dropdown menu has opened. Therefore, we don't check to see if the dropdown has opened until we see a dropdown item via our waitFor function. This is a promise-based function, so we want to use async above and await this
    await waitFor('.dropdown-item');

    const dropdown = document.querySelector('.dropdown')
    expect(dropdown.className).to.include('is-active')
}) 