# url-shortening-svc

Setup and installation
```
npm install
```

Start the back end server locally
```
npm start
```

Run unit tests
```
npm run test
```

### API endpoints
1. POST: http://localhost:4000/encode  
API Testing Payload (raw-Json):  
{  
    "longUrl": "https://aspirasi.co/pasar/capital-plus"  
}  
Response:  
{  
    "shortUrl": "https://tinyurl.com/ygnp5lyp",  
    "longUrl": "https://aspirasi.co/pasar/capital-plus"  
}  

2. POST: http://localhost:4000/decode  
API Testing Payload (raw-Json):  
{  
    "shortUrl": "https://tinyurl.com/ygnp5lyp"  
}  
Response:  
{  
    "shortUrl": "https://tinyurl.com/ygnp5lyp",  
    "longUrl": "https://aspirasi.co/pasar/capital-plus"  
}  
