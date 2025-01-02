module.exports = (req, res) => {
    if (req.method === 'GET') {
        res.status(200).json({ message: 'This is a valid route' });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
