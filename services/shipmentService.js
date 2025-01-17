const Shipment = require('../models/shipment');

const createShipment = async (sender, recipient, itemDetails, trackingNumber, userId) => {
    const shipment = await Shipment.create({ sender, recipient, itemDetails, trackingNumber, userId });
    return shipment;
};

const updateShipmentStatus = async (trackingNumber, status) => {
    const shipment = await Shipment.findOne({ where: { trackingNumber } });
    if (!shipment) throw new Error('Shipment not found');
    shipment.status = status;
    await shipment.save();
    return shipment;
};

const trackShipment = async (trackingNumber) => {
    const shipment = await Shipment.findOne({ where: { trackingNumber } });
    if (!shipment) throw new Error('Shipment not found');
    return shipment.get({ plain: true });
};

const getShipmentsByUser = async (userId) => {
    const shipments = await Shipment.findAll({ where: { userId } });
    return shipments;
};

module.exports = { createShipment, updateShipmentStatus, trackShipment, getShipmentsByUser };