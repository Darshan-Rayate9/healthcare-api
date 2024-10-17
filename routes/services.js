
const express = require('express');
const Service = require('../models/Service');
const router = express.Router();

// Add a new service
router.post('/', async (req, res) => {
    const { name, description, price } = req.body;
    if (!name || !price) {
        return res.status(400).json({ message: 'Service name and price are required' });
    }

    const service = new Service({ name, description, price });
    await service.save();
    res.status(201).json(service);
});

// Get all services
router.get('/', async (req, res) => {
    const services = await Service.find();
    res.json(services);
});

// Update a service
router.put('/:id', async (req, res) => {
    const { name, description, price } = req.body;
    const service = await Service.findByIdAndUpdate(req.params.id, { name, description, price }, { new: true });
    if (!service) {
        return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
});

// Delete a service
router.delete('/:id', async (req, res) => {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
        return res.status(404).json({ message: 'Service not found' });
    }
    res.status(204).send();
});

module.exports = router;
