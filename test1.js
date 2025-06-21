const http = require('http');

const server = http.createServer((req, res) => {
    if(req.url =='/' && req.method=='GET'){
        res.end("Hello World");
    } else if(req.url == '/hi' && req.method =='GET'){
        res.end("sgdjhgdjhf");
    }

})


server.listen(3000, ()=> {
    console.log("Server is running at 3000");
});

