//Whenever we run tests, it can help to start from scratch so that the ordering of the tests don't interfere with whether they pass or not
//To do this, we can use beforeEach, which is a method built into Mocha that runs a set of code before each test. It helps set up preconditions and clean up after tests.
beforeEach(() => {
    //Within beforeEach, we want to clear the target div's HTML and then run our Autocomplete function to reset the stage
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

//Now, we change the name of this test to make it more applicable to this test
it('Dropdown starts closed', () => {
    const dropdown = document.querySelector('.dropdown')
    expect(dropdown.className).not.to.include('is-active')
}) 

//We also want to test that the dropdown opens up after we search
it('Dropdown opens after search', () => {
    //First, we select our input element
    const input = document.querySelector('input')
    //We give it a value (basically it's like we fake searched)
    input.value = 'avengers'
    //However, simply giving our input a value does not trigger an input event, which is what our code is written to listen for to trigger our fetchData function. Therefore, we can use .dispatchEvent in order to trigger a fake event to see if the dropdown opens up
    input.dispatchEvent(new Event('input'))
    
    //Finally, we check to see if the dropdown includes the is-active class
    const dropdown = document.querySelector('.dropdown')
    expect(dropdown.className).to.include('is-active')
}) 