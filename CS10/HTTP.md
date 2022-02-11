# HTTP

##### 2022.2.10

> Understand the basics of **how web browser communicates with the Internet**.

---

## What is HTTP?

> Hypertext Transfer Protocol

- HTTP is used to _structure_ requests and responses over the internet.
- HTTP requires data to be transferred from one point to another over the network.

## HTTP & TCP : How it works

- When you type an address such as www.goggle.com into your browser, you are commanding it to open a _TCP channel_ to the server that responds to that URL(Uniform Resource Locator).
  - A URL is like your home address or phone number because it describes how to reach you.
- In this situation, your computer, which is **making the request**, is called the **client**.
- The URL you are requesting is **the address that belongs to the server**.

- Once the _TCP connection_ is established, the client sends a HTTP GET request to the server to retrieve the webpage it should display.
- After the server has sent the response, it closes the TCP connection.

## What is HTTPS?

> HTTP Secure

- Since your HTTP request can be read by anyone at certain network junctures, it might not be good idea to deliver information such as your credit card or password using this protocol.
- Fortunately, many servers support HTTPS, which allows you to **encrypt data that you send and receive**.
- HTTP is important to use when passing sensitive or personal information to and from websites.

---

### Reference

[Code Academy article - HTTP Requests](https://www.codecademy.com/article/http-requests)
