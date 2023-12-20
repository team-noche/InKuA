// After completing the registration successfully...
// Redirects the user to the login page
app.post('/signup', (req, res) => {
    // Processes the record and saves the data to the database
    // ...
    // It then redirects the user to the login page
    res.redirect('/login');
});
