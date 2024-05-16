const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
});

const Entities = {};

// Create Entity dynamically
app.post('/api/entity', async (req, res) => {
    const { name, attributes } = req.body;
    const schema = {};
    for (const attr of attributes) {
        schema[attr.name] = {
            type: DataTypes[attr.type.toUpperCase()],
        };
    }
    Entities[name] = sequelize.define(name, schema);
    await Entities[name].sync({ force: true });
    res.status(201).send({ message: `${name} entity created.` });
});

// CRUD Operations
app.post('/api/:entity', async (req, res) => {
    const entityName = req.params.entity;
    if (!Entities[entityName]) {
        return res.status(404).send({ message: 'Entity not found.' });
    }
    const entity = await Entities[entityName].create(req.body);
    res.status(201).send(entity);
});

app.get('/api/:entity', async (req, res) => {
    const entityName = req.params.entity;
    if (!Entities[entityName]) {
        return res.status(404).send({ message: 'Entity not found.' });
    }
    const entities = await Entities[entityName].findAll();
    res.send(entities);
});

app.get('/api/:entity/:id', async (req, res) => {
    const entityName = req.params.entity;
    if (!Entities[entityName]) {
        return res.status(404).send({ message: 'Entity not found.' });
    }
    const entity = await Entities[entityName].findByPk(req.params.id);
    res.send(entity);
});

app.put('/api/:entity/:id', async (req, res) => {
    const entityName = req.params.entity;
    if (!Entities[entityName]) {
        return res.status(404).send({ message: 'Entity not found.' });
    }
    await Entities[entityName].update(req.body, { where: { id: req.params.id } });
    res.send({ message: 'Entity updated.' });
});

app.delete('/api/:entity/:id', async (req, res) => {
    const entityName = req.params.entity;
    if (!Entities[entityName]) {
        return res.status(404).send({ message: 'Entity not found.' });
    }
    await Entities[entityName].destroy({ where: { id: req.params.id } });
    res.send({ message: 'Entity deleted.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
