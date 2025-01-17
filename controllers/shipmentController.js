const { createShipment, updateShipmentStatus, trackShipment, getShipmentsByUser } = require('../services/shipmentService');

const create = async (req, res) => {
    try {
        const { sender, recipient, itemDetails, trackingNumber } = req.body;
        const shipment = await createShipment(sender, recipient, itemDetails, trackingNumber, req.user.id);
        res.status(201).json({ shipment });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateStatus = async (req, res) => {
    try {
        const { trackingNumber, status } = req.body;
        const shipment = await updateShipmentStatus(trackingNumber, status);
        res.json({ shipment });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const track = async (req, res) => {
    try {
        const shipment = await trackShipment(req.params.trackingNumber);
        res.json({ shipment });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getByUser = async (req, res) => {
    try {
        const shipments = await getShipmentsByUser(req.user.id);
        res.json({ shipments });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { create, updateStatus, track, getByUser };
