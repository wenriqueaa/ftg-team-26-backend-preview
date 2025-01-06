const WorkOrder = require('../models/WorkOrder');
const WorkOrderTask = require('../models/WorkOrderTask');
const TaskEvidence = require('../models/TaskEvidence');

// Get all work orders
const getAllWorkOrders = async (req, res) => {
    try {
        const workOrders = await WorkOrder.find();
        res.status(200).json(workOrders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single work order by ID
const getWorkOrderById = async (req, res) => {
    try {
        const workOrder = await WorkOrder.findById(req.params.id);
        if (!workOrder) {
            return res.status(404).json({ message: 'WorkOrder not found' });
        }
        res.status(200).json(workOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new work order
const createWorkOrder = async (req, res) => {
    const workOrder = new WorkOrder(req.body);
    try {
        const newWorkOrder = await workOrder.save();
        res.status(201).json(newWorkOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an existing work order
const updateWorkOrder = async (req, res) => {
    try {
        const updatedWorkOrder = await WorkOrder.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedWorkOrder) {
            return res.status(404).json({ message: 'WorkOrder not found' });
        }
        res.status(200).json(updatedWorkOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a work order
const deleteWorkOrder = async (req, res) => {
    try {
        const deletedWorkOrder = await WorkOrder.findByIdAndDelete(req.params.id);
        if (!deletedWorkOrder) {
            return res.status(404).json({ message: 'WorkOrder not found' });
        }
        res.status(200).json({ message: 'WorkOrder deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all work orders by client ID
const getAllWorkOrdersByClient = async (req, res) => {
    try {
        const workOrders = await WorkOrder.find({ clientId: req.params.clientId });
        res.status(200).json(workOrders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all work orders by technician ID
const getAllWorkOrdersByTechnician = async (req, res) => {
    try {
        const workOrders = await WorkOrder.find({ workOrderAssignedTechnician: req.params.technicianId });
        res.status(200).json(workOrders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get work order with tasks and task evidences
const getReportWorkOrder = async (req, res) => {
    try {
        const workOrder = await WorkOrder.findById(req.params.id);
        if (!workOrder) {
            return res.status(404).json({ message: 'WorkOrder not found' });
        }

        const tasks = await WorkOrderTask.find({ workOrderId: req.params.id });
        const tasksWithEvidences = await Promise.all(tasks.map(async (task) => {
            const evidences = await TaskEvidence.find({ workOrderTaskId: task._id });
            return { ...task._doc, evidences };
        }));

        res.status(200).json({ ...workOrder._doc, tasks: tasksWithEvidences });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllWorkOrders,
    getWorkOrderById,
    createWorkOrder,
    updateWorkOrder,
    deleteWorkOrder,
    getAllWorkOrdersByClient,
    getAllWorkOrdersByTechnician,
    getReportWorkOrder
};


