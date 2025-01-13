const express = require('express')

// permitir comunicarnos con el frontend
const router = express.Router()
const mail = require('../controllers/mail.controller')
const { validateToken } = require('../middlewares/validateToken')

router.get('/auditlogbymodel', validateToken, AuditLog.getAuditLogByModel );
router.get('/auditlogbyuser', validateToken, AuditLog.getAuditLogByUser );

router.post('/mailsend', validateToken, mail.sendEmail );

module.exports = router
