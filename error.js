try {
    app.listen(port, () => {
        console.log(`Server is listening at http://localhost:${port}`);
        syncChain();
    });
} catch (error) {
    console.error('Error starting the server:', error.message);
}
