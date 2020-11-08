it('Testing autocomplete', () => {
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
    //Next, we want to run some testing code for our dropdown menu. The first thing we want to check is to make sure the dropdown isn't open before we search anything.
    //We use Chai Assertion Library for this. Mocha's browser support HTML already scripts in Chai. We also have to declare the expect variable in our HTML file to use it
    const dropdown = document.querySelector('.dropdown')
    //Once we complete a search, the class 'is-active' gets added to our dropdown div. Therefore, we want to make sure our dropdown div does not contain is-active when we first open the file 
    expect(dropdown.className).not.to.include('is-active')
}) 