export const auth = (roles = []) => {
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
        const userRole = req.user.role; 

        if (roles.length && !roles.includes(userRole)) {
            return res.status(403).json({ error: 'Access denied' });
        }

        next();
    };
};
