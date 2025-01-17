const shipmentService = require('../services/shipmentService');
const Shipment = require('../models/shipment');
const { faker } = require('@faker-js/faker');

jest.mock('../models/shipment');

describe('Shipment Service', () => {
  let mockShipmentData;
  let mockShipmentInstance;

  beforeEach(() => {
    mockShipmentData = {
      sender: 'John Doe',
      recipient: 'Jane Smith',
      itemDetails: 'Books',
      trackingNumber: faker.string.uuid(),
      status: 'Pending',
      userId: faker.string.uuid()
    };

    mockShipmentInstance = {
      ...mockShipmentData,
      id: faker.string.uuid(),
      save: jest.fn().mockResolvedValue(mockShipmentData),
      update: jest.fn().mockResolvedValue(mockShipmentData),
      destroy: jest.fn().mockResolvedValue(),
      get: jest.fn().mockReturnValue(mockShipmentData),
    };
  });

  describe('createShipment', () => {
    it('should create a new shipment successfully', async () => {
      const mockCreatedShipment = {
        ...mockShipmentData,
        id: faker.string.uuid(),
      };

      Shipment.create.mockResolvedValue(mockCreatedShipment);

      const shipment = await shipmentService.createShipment(
        mockShipmentData.sender,
        mockShipmentData.recipient,
        mockShipmentData.itemDetails,
        mockShipmentData.trackingNumber,
        mockShipmentData.userId,
      );

      expect(shipment).toEqual(mockCreatedShipment);
      expect(Shipment.create).toHaveBeenCalledWith({
        sender: mockShipmentData.sender,
        recipient: mockShipmentData.recipient,
        itemDetails: mockShipmentData.itemDetails,
        trackingNumber: mockShipmentData.trackingNumber,
        userId: mockShipmentData.userId,
      });
    });

    it('should throw an error if shipment creation fails', async () => {
      Shipment.create.mockRejectedValue(new Error('Error creating shipment'));

      try {
        await shipmentService.createShipment(
          mockShipmentData.sender,
          mockShipmentData.recipient,
          mockShipmentData.itemDetails,
          mockShipmentData.trackingNumber,
          mockShipmentData.userId,
        );
      } catch (error) {
        expect(error.message).toBe('Error creating shipment');
      }
    });
  });

  describe('trackShipment', () => {
    it('should track shipment successfully', async () => {
      Shipment.findOne.mockResolvedValue(mockShipmentInstance);

      const shipment = await shipmentService.trackShipment(mockShipmentData.trackingNumber);

      expect(shipment).toEqual(mockShipmentData);
      expect(Shipment.findOne).toHaveBeenCalledWith({
        where: { trackingNumber: mockShipmentData.trackingNumber },
      });
    });

    it('should throw an error if shipment is not found', async () => {
      Shipment.findOne.mockResolvedValue(null);

      try {
        await shipmentService.trackShipment(mockShipmentData.trackingNumber);
      } catch (error) {
        expect(error.message).toBe('Shipment not found');
      }
    });
  });

  describe('updateShipmentStatus', () => {
    it('should update shipment status successfully', async () => {
      Shipment.findOne.mockResolvedValue(mockShipmentInstance);

      const updatedStatus = 'shipped';
      const updatedShipment = await shipmentService.updateShipmentStatus(
        mockShipmentData.trackingNumber,
        updatedStatus
      );

      expect(updatedShipment.status).toBe(updatedStatus);
      expect(Shipment.findOne).toHaveBeenCalledWith({
        where: { trackingNumber: mockShipmentData.trackingNumber },
      });
      expect(mockShipmentInstance.save).toHaveBeenCalled();
    });

    it('should throw an error if shipment is not found', async () => {
      Shipment.findOne.mockResolvedValue(null);

      try {
        await shipmentService.updateShipmentStatus(
          mockShipmentData.trackingNumber,
          'shipped'
        );
      } catch (error) {
        expect(error.message).toBe('Shipment not found');
      }
    });
  });

  describe('getShipmentsByUser', () => {
    it('should return shipments for a user', async () => {
      const mockUserId = faker.string.uuid();
      const mockShipments = [mockShipmentInstance];
      Shipment.findAll.mockResolvedValue(mockShipments);

      const shipments = await shipmentService.getShipmentsByUser(mockUserId);

      expect(shipments).toEqual(mockShipments);
      expect(Shipment.findAll).toHaveBeenCalledWith({ where: { userId: mockUserId } });
    });

    it('should return an empty array if no shipments are found for a user', async () => {
      const mockUserId = faker.string.uuid();
      Shipment.findAll.mockResolvedValue([]);

      const shipments = await shipmentService.getShipmentsByUser(mockUserId);

      expect(shipments).toEqual([]);
      expect(Shipment.findAll).toHaveBeenCalledWith({ where: { userId: mockUserId } });
    });
  });
});
