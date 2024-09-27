import express, { Request, Response } from 'express';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Load requests data
const loadRequests = (): any[] => {
    if (!fs.existsSync('requests.json')) {
        return [];
    }
    const data = fs.readFileSync('requests.json', 'utf-8');
    return JSON.parse(data);
};

// Save requests data
const saveRequests = (data: any[]): void => {
    fs.writeFileSync('requests.json', JSON.stringify(data, null, 4));
};

// Root endpoint for testing
app.get('/', (req: Request, res: Response) => {
    res.send('Hotel Room Service API is running');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


interface RoomServiceRequest {
    id: string;
    guestName: string;
    roomNumber: number;
    requestDetails: string;
    priority: number; // Lower is higher priority
    status: 'received' | 'in progress' | 'awaiting confirmation' | 'completed' | 'canceled';
}


app.post('/requests', (req: Request, res: Response) => {
    // Create a new request object from the request body
    const newRequest: RoomServiceRequest = {
        id: uuidv4(),  // Generate a unique ID
        guestName: req.body.guestName,  // Get guestName from the request body
        roomNumber: req.body.roomNumber,  // Get roomNumber from the request body
        requestDetails: req.body.requestDetails,  // Get requestDetails from the request body
        priority: req.body.priority,  // Get priority from the request body
        status: 'received'  // Default status is 'received'
    };

    // Load the existing requests
    const requests = loadRequests();
    
    // Add the new request to the existing list
    requests.push(newRequest);
    
    // Save the updated list back to the file
    saveRequests(requests);
    
    // Respond with the newly created request
    res.status(201).json(newRequest);
});

app.get('/requests', (req: Request, res: Response) => {
    const requests = loadRequests();
    const sortedRequests = requests.sort((a, b) => a.priority - b.priority);
    res.json(sortedRequests);
});


app.get('/requests/:id', (req: Request, res: Response) => {
    const requestId = req.params.id;
    const requests = loadRequests();
    const request = requests.find(r => r.id === requestId);
    
    if (request) {
        res.json(request);
    } else {
        res.status(404).json({ error: 'Request not found' });
    }
});


app.put('/requests/:id', (req: Request, res: Response) => {
    const requestId = req.params.id;
    const requests = loadRequests();
    const requestIndex = requests.findIndex(r => r.id === requestId);
    
    if (requestIndex !== -1) {
        const updatedRequest = { ...requests[requestIndex], ...req.body };
        requests[requestIndex] = updatedRequest;
        saveRequests(requests);
        res.json(updatedRequest);
    } else {
        res.status(404).json({ error: 'Request not found' });
    }
});


app.delete('/requests/:id', (req: Request, res: Response) => {
    const requestId = req.params.id;
    const requests = loadRequests();
    const updatedRequests = requests.filter(r => r.id !== requestId);
    
    if (updatedRequests.length === requests.length) {
        res.status(404).json({ error: 'Request not found' });
    } else {
        saveRequests(updatedRequests);
        res.json({ message: 'Request deleted successfully' });
    }
});


app.put('/requests/:id/complete', (req: Request, res: Response) => {
    const requestId = req.params.id;
    const requests = loadRequests();
    const request = requests.find(r => r.id === requestId);
    
    if (request) {
        request.status = 'completed';
        saveRequests(requests);
        res.json(request);
    } else {
        res.status(404).json({ error: 'Request not found' });
    }
});

app.put('/requests/:id/cancel', (req: Request, res: Response) => {
    const requestId = req.params.id;
    const requests = loadRequests();
    const request = requests.find(r => r.id === requestId);
    
    if (request) {
        request.status = 'canceled';
        saveRequests(requests);
        res.json(request);
    } else {
        res.status(404).json({ error: 'Request not found' });
    }
});
app.put('/requests/:id/awaitingconfirmation', (req: Request, res: Response) => {
    const requestId = req.params.id;
    const requests = loadRequests();
    const request = requests.find(r => r.id === requestId);
    
    if (request) {
        request.status = 'awaiting confirmation';
        saveRequests(requests);
        res.json(request);
    } else {
        res.status(404).json({ error: 'Request not found' });
    }
});
app.put('/requests/:id/inprogress', (req: Request, res: Response) => {
    const requestId = req.params.id;
    const requests = loadRequests();
    const request = requests.find(r => r.id === requestId);
    
    if (request) {
        request.status = 'in progress';
        saveRequests(requests);
        res.json(request);
    } else {
        res.status(404).json({ error: 'Request not found' });
    }
});

