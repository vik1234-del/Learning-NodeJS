//creating a simple server in nodejs
const http = require("http");
const fs = require("fs");

//create server that returns info at url/home
const server = http.createServer((req, res) => {
  if (req.url === "/home" && req.method === "POST") {
    fs.readFile("./hello.txt", (err, data) => {
      if (err) {
        console.log(err);
        res.write("Internal Server Error");
        res.end();
      } else {
        res.write(data);
        res.end();
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("Error, 404 not found.");
    res.end();
  }
});

server.listen(8900, () => {
  console.log("Server listening on port 8900");
});

// function greetAfterDelay(name, callback) {
//   setTimeout(() => {
//     console.log("Hi" + name + "!");
//     callback();
//   }, 2000);
// }

// function sayGoodbye() {
//   console.log("Goodbye");
// }

// greetAfterDelay("Sam", sayGoodbye);

// HTTP methods
const http = require("http");

//Using switch/case to handle conflicting GET/PUT methods
// const server = http.createServer((req, res) => {
//   switch (req.method) {
//     case "GET":
//       switch (req.url) {
//         case "/books":
//           res.write("This is the URL for books using " + req.method);
//           break;
//         case "/books/author":
//           res.write("Requesting author information using " + req.method);
//           break;
//         default:
//           res.statusCode = 404;
//           res.write("Not Found");
//       }
//       break;

//     case "PUT":
//       switch (req.url) {
//         case "/books":
//           res.write("Updating the details for books using " + req.method);
//           break;
//         case "/books/author":
//           res.write("Changing author information using " + req.method);
//           break;
//         default:
//           res.statusCode = 404;
//           res.write("Not Found");
//       }
//       break;

//     case "DELETE":
//       switch (req.url) {
//         case "/books":
//           res.write("Books were deleted successfully using " + req.method);
//           break;
//         default:
//           res.statusCode = 404;
//           res.write("Not Found");
//       }
//       break;

//     case "POST":
//       switch (req.url) {
//         case "/books/author":
//           res.write("Updating author information using " + req.method);
//           break;
//         default:
//           res.statusCode = 404;
//           res.write("Not Found");
//       }
//       break;

//     default:
//       res.statusCode = 405;
//       res.write("Method Not Allowed");
//   }

//   res.end();
// });

// server.listen(8000, () => {
//   console.log("Server is running on port 8000");
// });
