const checkAuth = (req, res, next) => {
    console.log('Desde el Middleware');
    next()
}

export default checkAuth;