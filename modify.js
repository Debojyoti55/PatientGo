// Modify the /api/blocks POST route
app.post('/api/blocks', (req, res) => {
    const { data } = req.body;
    addDataToBlockchain(data);
    res.redirect('/api/blocks');
});
