const express = require('express');
const { borrowBook, returnBook, getUserBorrowedBooks } = require('../controllers/lendingController');
const authenticateJWT = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Lending
 *   description: Book lending and return operations
 */

/**
 * @swagger
 * /lending/borrow:
 *   post:
 *     summary: Borrow a book
 *     tags: [Lending]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: integer
 *               userId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Book borrowed successfully
 *       400:
 *         description: Invalid input or book is already borrowed
 */
router.post('/borrow', authenticateJWT, borrowBook);

/**
 * @swagger
 * /lending/return:
 *   post:
 *     summary: Return a borrowed book
 *     tags: [Lending]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lendingId:
 *                 type: integer
 *               userId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Book returned successfully
 *       400:
 *         description: Invalid input
 */
router.post('/return', authenticateJWT, returnBook);

/**
 * @swagger
 * /lending/borrowed:
 *   get:
 *     summary: Get all borrowed books of a user
 *     tags: [Lending]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of books currently borrowed
 *       400:
 *         description: Invalid input or user not found
 */
router.get('/borrowed', authenticateJWT, getUserBorrowedBooks);

module.exports = router;
