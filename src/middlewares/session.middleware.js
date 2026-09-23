export function ensureSession(req, res, next) {
    if (req.signedCookies.token) {
        next();
    } else {
        res.status(401).json({
            status: 'error',
            message: 'Sesión expirada o no iniciada. Por favor, inicia sesión nuevamente.'
        });
    }
}