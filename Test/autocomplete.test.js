//In order to test our autocomplete function, we have to first add script tags for our autocomplete file and our utils file in our HTML file
//In Mocha, we use the it() notation. We follow it with a description of the testing we are doing and a callback function
it('Testing autocomplete', () => {
    //Within our test, we call createAutoComplete and pass through an object that the function can destructure out what it needs
    createAutoComplete({
        //We create a root element by selecting a div we created in our HTML
        root : document.querySelector('#target'),
        //We decided to do a "dummy" data pull as opposed to a real one. We could test the real API pull, but APIs can cost money and can be slow, so for this purpose, we are NOT testing the API. Rather, we are testing that the autocomplete displays information correctly after searching for something.
        fetchData() {
            //Because we are not testing the real API, we can return a dummy array of a few movies
            return [
                {Title:'Avengers'},
                {Title:'Not Avengers'},
                {Title: 'Some other movie'}
            ]
        },
        //Finally, for renderOption, we'll show just the movie's title
        renderOption(movie) {
            return movie.Title;
        }
    })
}) 