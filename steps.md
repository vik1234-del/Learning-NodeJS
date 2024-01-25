Getting started with node.js

Check if node is installed properly / node version
$ node -v

Initialize project
$ npm init

NPM - Node Package Manager
Can also use Yarn or Pnpm --> should be installed separately

Install dependencies
$ npm install <package-name>

To run a nodejs file
$ node <file-name>.js

- Common core Modules in NodeJS, require them into your script and use.
  Http
  Path
  Fs
  OS
  Process

- Http message -->
  header, method, body

- Header {
  "content-type": "application/json",
  ...
  }

- HTTP Methods -> GET, POST, PUT, DELETE, OPTIONS...
  Commonly, HTML on webpages only supports GET, POST requests.
  1.GET:

Requests information from a resource, typically returning data like a web page or JSON.
Idempotent: Repeating the request with the same parameters has the same result.
Cachable: Responses can be cached by the browser for efficient subsequent retrieval.
Often used for retrieving static content like HTML files, scripts, images, and data APIs.

2. POST:

Submits data to a resource to create, update, or delete something.
Non-idempotent: Repeating the request might create duplicate resources.
Not cachable: Responses are usually not cached due to potential side effects.
Used for submitting forms, uploading files, and triggering actions on the server.

3. PUT:

Replaces all existing data on a resource with the sent data.
Idempotent: Repeating the request with the same data has the same result.
Not cachable: Similar to POST, responses are not typically cached.
Used for updating specific resources with complete and accurate data.

4. PATCH:

Applies partial modifications to a resource.
Idempotent: Repeating the request with the same patch data has the same result.
Not cachable: Similar to POST and PUT, responses are typically not cached.
Used for making specific changes to a resource without replacing everything.

5. DELETE:

Removes a resource from the server.
Idempotent: Repeating the request with the same target doesn't create additional deletions.
Not cachable: Similar to other methods with side effects, responses are not cached.
Used for deleting unwanted resources from the server.

6. HEAD:

Similar to GET, but only gets the header information of a resource, not the actual content.
Useful for checking if a resource exists or for its properties without transferring the entire content.

7. OPTIONS:

Requests information about the communication options available for a resource.
Useful for clients to check what methods are supported and what headers are accepted by the server.

8. TRACE:

Traces the path of a request through the network for debugging purposes.

- CLIENT -> Server Request makes use of http

- API -> Gives a set of instructions on how to communicate with the server.

- What is a server?

Something that can take a request and give a response.(Crude definition)

- Types of servers
  1. Application server
  2. Web server
  3. Proxy server
  4. Database server
  5. DNS server
  6. File Server

Application server: Run and manage applications, providing services such as application hosting, middleware, and backend processing.

Web Server: A web server is designed to serve web pages and content over the internet. It responds to requests from web browsers by delivering web pages, files, and other content.
Types --> Apache, Nginx, and Microsoft Internet Information Services (IIS) are popular web server software.

Proxy server: A proxy server acts as an intermediary between clients and other servers. It can enhance security, performance, and privacy by caching content, filtering requests, and masking client IP addresses

Database Servers: Manage and provide access to databases. Common database servers include MySQL, PostgreSQL, and Microsoft SQL Server.

DNS Servers: DNS servers resolve domain names to IP addresses. When you enter a domain name (e.g., www.example.com) in your browser, a DNS server is responsible for translating that domain into the corresponding IP address needed to locate the website on the internet.

File Server: A file server is dedicated to storing and managing files that can be shared across a network. It allows users to access and manage files from a centralized location. File Transfer Protocol (FTP) and Network Attached Storage (NAS) devices are examples of file servers.
