# Internet

##### 2022.2.10

---

## What is the Internet?

- A huge **distributed network** that sends data around as little packets

</br>

## Internet Protocol (IP)

- Internet packets have to conform to a standard called the Internet Protocol.
- IP is a very low level protocol.
  - There isn't much more than a destination address in a packet's header, which is the metadata that's stored in front of the _data payload_. This means that a packet can show up at a computer, but the computer may not know which application to give the data to.
  - For this reason, more advanced protocols were developed that sit on top of IP.

</br>

## User DataGram Protocol (UDP)

- UDP has its own header, which sits inside the data payload.
- Inside of the UDP header is some useful, extra information.
  - One of them is a port number.
  - Every program wanting to access the internet will ask its host computer's Operating System to be given a unique port.
- When a packet arrives to the computer, the Operating System will look inside the UDP header and read the port number.

### UDP header

- UDP headers also include something called a checksum, which allows the data to be verified for correctness.
- As the name suggests, it does this by checking the sum of the data.
- UDP is simple and fast.
  - For example, Skype, which uses UDP for video chat, can handle corrupt or missing packets. That's why sometimes if you're on a bad internet connection, Skype gets all glitch - only some of the UDP packets are making it to your computer.

</br>

> #### IP gets the packet to the right computer, but UDP gets the packet to the right program running on that computer.

</br>

## Transmission Control Protocol (TCP)

- TCP rides inside the data payload of IP packets. For this reason, people refer to this combination of protocols as TCP/IP.
- Like UDP, the TCP header contains a destination port and checksum.
- TCP packets are given sequantial numbers.
  - This sequance numbers allow a receiving computer to put the packets into the correct order, even if they arrive at different times across the network.
- TCP requires that once a computer has correctly received a packet - and the data passes the checksum - that is send back an acknowledgement, or "ACK" to the sending computer.
  - Knowing the packet made it successfully, the sender can now transmit the next packet.

</br>

## Domain Name System (DNS)

- When you type something like "youtube.com" into your web browser, it goes and asks a DNS server - usually one provided by your ISP - to lookup the address.

### Reference
