const express = require('express');
const { create, updateStatus, track, getByUser } = require('../controllers/shipmentController');
const authenticateJWT = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /logistics/create:
 *   post:
 *     summary: Create a new shipment
 *     description: Creates a new shipment and returns the shipment data
 *     operationId: createShipment
 *     security:
 *       - bearerAuth: []  # This indicates that the route requires JWT token in the Authorization header
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sender:
 *                 type: string
 *                 example: "John Doe"
 *               recipient:
 *                 type: string
 *                 example: "Jane Smith"
 *               itemDetails:
 *                 type: string
 *                 example: "Books"
 *               trackingNumber:
 *                 type: string
 *                 example: "f0407e76-c7de-4896-b8d4-3a392fd73b02"
 *               status:
 *                 type: string
 *                 example: "Pending"
 *     responses:
 *       201:
 *         description: Shipment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "b7fcd7a6-946e-4a0b-9ca9-9e7c7f56c389"
 *                 sender:
 *                   type: string
 *                   example: "John Doe"
 *                 recipient:
 *                   type: string
 *                   example: "Jane Smith"
 *                 itemDetails:
 *                   type: string
 *                   example: "Books"
 *                 trackingNumber:
 *                   type: string
 *                   example: "f0407e76-c7de-4896-b8d4-3a392fd73b02"
 *                 status:
 *                   type: string
 *                   example: "Pending"
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Internal server error
 */
router.post('/create', authenticateJWT, create);

/**
 * @swagger
 * /logistics/update-status:
 *   put:
 *     summary: Update shipment status
 *     description: Updates the status of an existing shipment
 *     operationId: updateShipmentStatus
 *     security:
 *       - bearerAuth: []  # JWT token required in Authorization header
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               trackingNumber:
 *                 type: string
 *                 example: "f0407e76-c7de-4896-b8d4-3a392fd73b02"
 *               status:
 *                 type: string
 *                 example: "Shipped"
 *     responses:
 *       200:
 *         description: Shipment status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Shipped"
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Shipment not found
 *       500:
 *         description: Internal server error
 */
router.put('/update-status', authenticateJWT, updateStatus);

/**
 * @swagger
 * /logistics/track/{trackingNumber}:
 *   get:
 *     summary: Track a shipment by its tracking number
 *     description: Fetches the details of a shipment using the provided tracking number
 *     operationId: trackShipment
 *     security:
 *       - bearerAuth: []  # JWT token required in Authorization header
 *     parameters:
 *       - in: path
 *         name: trackingNumber
 *         required: true
 *         description: The tracking number of the shipment to be tracked
 *         schema:
 *           type: string
 *           example: "f0407e76-c7de-4896-b8d4-3a392fd73b02"
 *     responses:
 *       200:
 *         description: Shipment found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "b7fcd7a6-946e-4a0b-9ca9-9e7c7f56c389"
 *                 sender:
 *                   type: string
 *                   example: "John Doe"
 *                 recipient:
 *                   type: string
 *                   example: "Jane Smith"
 *                 itemDetails:
 *                   type: string
 *                   example: "Books"
 *                 trackingNumber:
 *                   type: string
 *                   example: "f0407e76-c7de-4896-b8d4-3a392fd73b02"
 *                 status:
 *                   type: string
 *                   example: "Pending"
 *       404:
 *         description: Shipment not found
 *       500:
 *         description: Internal server error
 */
router.get('/track/:trackingNumber', authenticateJWT, track);

/**
 * @swagger
 * /logistics/user-shipments:
 *   get:
 *     summary: Get all shipments for the authenticated user
 *     description: Returns all shipments associated with the authenticated user
 *     operationId: getUserShipments
 *     security:
 *       - bearerAuth: []  # JWT token required in Authorization header
 *     responses:
 *       200:
 *         description: Shipments found for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "b7fcd7a6-946e-4a0b-9ca9-9e7c7f56c389"
 *                   sender:
 *                     type: string
 *                     example: "John Doe"
 *                   recipient:
 *                     type: string
 *                     example: "Jane Smith"
 *                   itemDetails:
 *                     type: string
 *                     example: "Books"
 *                   trackingNumber:
 *                     type: string
 *                     example: "f0407e76-c7de-4896-b8d4-3a392fd73b02"
 *                   status:
 *                     type: string
 *                     example: "Pending"
 *       500:
 *         description: Internal server error
 */
router.get('/user-shipments', authenticateJWT, getByUser);

module.exports = router;
