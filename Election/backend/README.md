# Election Assistant Backend

A Node.js/Express backend API for the Election Assistant application.

## Features

- **Chat API**: AI-powered responses to voting questions
- **Eligibility API**: Check voter eligibility based on criteria
- **Timeline API**: Election dates and deadlines
- **Guide API**: Step-by-step voting guide and FAQ

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root directory:

```
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## Running the Server

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## API Endpoints

### Chat
- `POST /api/chat/message` - Send a message to the AI assistant
- `GET /api/chat/history` - Get chat history

### Eligibility
- `POST /api/eligibility/check` - Check voter eligibility
- `GET /api/eligibility/requirements` - Get eligibility requirements

### Timeline
- `GET /api/timeline/events` - Get election timeline events
- `GET /api/timeline/deadlines` - Get important deadlines

### Guide
- `GET /api/guide/steps` - Get voting guide steps
- `GET /api/guide/faq` - Get frequently asked questions

## Example Requests

### Chat Message
```bash
curl -X POST http://localhost:5000/api/chat/message \
  -H "Content-Type: application/json" \
  -d '{"message": "What are the registration deadlines?"}'
```

### Check Eligibility
```bash
curl -X POST http://localhost:5000/api/eligibility/check \
  -H "Content-Type: application/json" \
  -d '{
    "age": 25,
    "isCitizen": true,
    "residencyMonths": 60,
    "mentallyCompetent": true,
    "hasActiveFelony": false
  }'
```

## Project Structure

```
Election/backend/
├── server.js           # Main server file
├── routes/
│   ├── chat.js        # Chat endpoints
│   ├── eligibility.js # Eligibility endpoints
│   ├── timeline.js    # Timeline endpoints
│   └── guide.js       # Guide endpoints
├── package.json
├── .env
└── README.md
```

## Technologies

- **Express.js**: Web framework
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management

## License

ISC
