# Hotel Room Service API

This is a simple Hotel Room Service API built with Node.js, Express, and TypeScript. The API allows hotel staff to manage room service requests, including creating new requests, viewing all requests, updating request statuses, and deleting requests.

## Features

- **Create Room Service Requests**: Add a new room service request.
- **View All Requests**: Get a list of all room service requests sorted by priority.
- **Update Request Status**: Update the status of a room service request.
- **Delete Requests**: Remove a request from the system.
- **Status Options**: The status of a request can be one of the following:
  - `received`
  - `in progress`
  - `awaiting confirmation`
  - `completed`
  - `canceled`

## Prerequisites

- [Node.js](https://nodejs.org/) (v14.x or higher)
- [npm](https://www.npmjs.com/) (v6.x or higher)
- [TypeScript](https://www.typescriptlang.org/) (v4.x or higher)

## Getting Started

Follow these instructions to set up the project on your local machine.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/hotel-room-service-api.git
   cd hotel-room-service-api
