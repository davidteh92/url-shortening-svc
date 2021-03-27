'use strict';


module.exports = (req, res) => {
    res.json({
        healthy: true,
        timestamp: new Date().toISOString()
    });
};

