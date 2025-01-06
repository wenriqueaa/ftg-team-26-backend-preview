const express = require('express');
const workOrderController = require('../controllers/workOrder.controller');

const { validateToken } = require('../middlewares/validateToken')

const router = express.Router()


/**
 * @swagger
 * tags:
 *   name: WorkOrders
 *   description: Work order management
 */


// /**
//  * @swagger
//  * /workorder:
//  *   get:
//  *     summary: Retrieve a list of work orders
//  *     tags: [WorkOrders]
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: A list of work orders
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/WorkOrder'
//  *       401:
//  *         description: Unauthorized
//  *       500:
//  *         description: Internal server error
//  */

router.get('/workorder', validateToken, workOrderController.getAllWorkOrders);

router.get('/workorder/:id', validateToken, workOrderController.getWorkOrderById);

router.post('/workorder', validateToken, workOrderController.createWorkOrder);

router.put('/workorder/:id', validateToken, workOrderController.updateWorkOrder);

router.delete('/workorder/:id', validateToken, workOrderController.deleteWorkOrder);

router.get('/workorderbyclient/:id', validateToken, workOrderController.getAllWorkOrdersByClient);

// getAllWorkOrdersByClient,
// getAllWorkOrdersByTechnician,
// getReportWorkOrder


module.exports = router;