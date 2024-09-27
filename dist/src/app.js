"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(body_parser_1.default.json());
// Load requests data
const loadRequests = () => {
    if (!fs_1.default.existsSync('requests.json')) {
        return [];
    }
    const data = fs_1.default.readFileSync('requests.json', 'utf-8');
    return JSON.parse(data);
};
// Save requests data
const saveRequests = (data) => {
    fs_1.default.writeFileSync('requests.json', JSON.stringify(data, null, 4));
};
// Root endpoint for testing
app.get('/', (req, res) => {
    res.send('Hotel Room Service API is running');
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
app.post('/requests', (req, res) => {
    const newRequest = {
        id: (0, uuid_1.v4)(),
        guestName: req.body.guestName,
        roomNumber: req.body.roomNumber,
        requestDetails: req.body.requestDetails,
        priority: req.body.priority,
        status: 'received'
    };
    const requests = loadRequests();
    requests.push(newRequest);
    saveRequests(requests);
    res.status(201).json(newRequest);
});
app.get('/requests', (req, res) => {
    const requests = loadRequests();
    const sortedRequests = requests.sort((a, b) => a.priority - b.priority);
    res.json(sortedRequests);
});
app.get('/requests/:id', (req, res) => {
    const requestId = req.params.id;
    const requests = loadRequests();
    const request = requests.find(r => r.id === requestId);
    if (request) {
        res.json(request);
    }
    else {
        res.status(404).json({ error: 'Request not found' });
    }
});
app.put('/requests/:id', (req, res) => {
    const requestId = req.params.id;
    const requests = loadRequests();
    const requestIndex = requests.findIndex(r => r.id === requestId);
    if (requestIndex !== -1) {
        const updatedRequest = Object.assign(Object.assign({}, requests[requestIndex]), req.body);
        requests[requestIndex] = updatedRequest;
        saveRequests(requests);
        res.json(updatedRequest);
    }
    else {
        res.status(404).json({ error: 'Request not found' });
    }
});
app.delete('/requests/:id', (req, res) => {
    const requestId = req.params.id;
    const requests = loadRequests();
    const updatedRequests = requests.filter(r => r.id !== requestId);
    if (updatedRequests.length === requests.length) {
        res.status(404).json({ error: 'Request not found' });
    }
    else {
        saveRequests(updatedRequests);
        res.json({ message: 'Request deleted successfully' });
    }
});
app.put('/requests/:id/complete', (req, res) => {
    const requestId = req.params.id;
    const requests = loadRequests();
    const request = requests.find(r => r.id === requestId);
    if (request) {
        request.status = 'completed';
        saveRequests(requests);
        res.json(request);
    }
    else {
        res.status(404).json({ error: 'Request not found' });
    }
});
app.put('/requests/:id/cancel', (req, res) => {
    const requestId = req.params.id;
    const requests = loadRequests();
    const request = requests.find(r => r.id === requestId);
    if (request) {
        request.status = 'canceled';
        saveRequests(requests);
        res.json(request);
    }
    else {
        res.status(404).json({ error: 'Request not found' });
    }
});
app.put('/requests/:id/awaitingconfirmation', (req, res) => {
    const requestId = req.params.id;
    const requests = loadRequests();
    const request = requests.find(r => r.id === requestId);
    if (request) {
        request.status = 'awaiting confirmation';
        saveRequests(requests);
        res.json(request);
    }
    else {
        res.status(404).json({ error: 'Request not found' });
    }
});
app.put('/requests/:id/inprogress', (req, res) => {
    const requestId = req.params.id;
    const requests = loadRequests();
    const request = requests.find(r => r.id === requestId);
    if (request) {
        request.status = 'in progress';
        saveRequests(requests);
        res.json(request);
    }
    else {
        res.status(404).json({ error: 'Request not found' });
    }
});
