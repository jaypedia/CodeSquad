# Inspector

## Enable Inspector

- When started with the `--inspect` switch, a Node.js process listens for a debugging client.
- By default, it will listen at host and port 127.0.0.1:9229.
- Each process is also assigned a unique UUID.
- Inspector clients must know and specify host address, port, and UUID to connect.
  - A full URL example : `ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e`

### Reference

https://nodejs.org/en/docs/guides/debugging-getting-started/
https://blog.outsider.ne.kr/1307
https://tod2.tistory.com/214
