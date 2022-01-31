# Inside look at modern web browser

##### 2022.1.31

---

## CPU, GPU, Memory, and multi-process archtecture

> Core computing terminology and Chrome's multi-process architecture

### Objectives

- [ ] Look inside the Chrome browser from high-level architecture to the specifics of the rendering pipeline
- [ ] Know how the browser turns the code into a functional website
- [ ] Know why a specific technique is suggested for performance improvements

<br>

## At the core of the computer are the CPU and GPU

> In order to understand **the environment that the browser is running**, we need to understand a few computer parts and what they do.

| ![image](https://user-images.githubusercontent.com/85419343/151730401-77d475ac-8ce1-4a9d-80c7-4112895e6133.png) | ![image](https://user-images.githubusercontent.com/85419343/151730450-0c1b7872-c4f2-4679-a9b5-0caa28bc99fe.png) |
| --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |

### CPU : Central Processing Unit

- The CPU can be considered your **computer's brain**.
- A CPU core, pictured here as an office worker, **can handle many different tasks one by one as they come in**.
- It can handle everything from math to art while knowing how to reply to a customer call.
- In the past most CPUs were a single chip.
  - _A core is like another CPU living in the same chip._(?)
- In modern hardware, you often get more than one core, giving more computing power to your phones and laptops.

### GPU : Graphics Processing Unit

- Unlike CPU, GPU is good at handling simple tasks but **across multiple cores at the same time**.
- As the name suggests, it was first developed to handle graphics.
- This is why **in the context of graphics "using GPU" or "GPU-backed" is associated with fast rendering and smooth interaction.**
  - 컴퓨터 그래픽에서 "GPU 사용" 혹은 "GPU 보조"라고 하면 고속 렌더링과 자연스러운 처리를 의미한다.
- In recent years, with GPU-accelerated computing, more and more computation is becoming possible on GPU alone.

  <br>

![image](https://user-images.githubusercontent.com/85419343/151731343-147fa89d-d371-43dd-8600-160147870168.png)

- Figure 3 : Three layers of computer architecture. Machine Hardware at the bottom, Operating System in the middle, and Application on top.
- When you start an application on your computer or phone, the CPU and GPU are the ones powering the application.
- Usually, applications run on the CPU and GPU **using mechanisms provided by the Operating System**.

  <br>

## Executing program on Process and Thread

- When you start an application, a process is created.
- The program might create thread(s) to help it do work, but that's optional.
- The Operating System gives the process a "slab" of memory to work with and all application state is kept in that private memory space.
- When you close the application, the process also goes away and the Operating System frees up the memory.

![image](https://user-images.githubusercontent.com/85419343/151732090-61871922-9361-481a-aa73-62f961b09098.png)

### Process

- A process can be described as an application's executing program.

### Thread

- A thread is the one that lives inside of process and executes any part of its process's program.

<br>

---

### Reference

[Inside look at modern web browser (part 1) by MariKo Kosaka](https://developers.google.com/web/updates/2018/09/inside-browser-part1#cpu_gpu_memory_and_multi-process_architecture)
