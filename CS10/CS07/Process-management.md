# Process Management in OS

##### 2022.1.24

## Objectives

- [ ] 프로세스를 관리하는 자료구조에 대해 학습한다.
- [ ] 프로세스와 스레드의 관계를 학습한다.
- [ ] 운영체제에서 사용하는 작업 스케줄링 알고리즘을 학습한다.

---

## 1. What is process?

- Process is a program that is under execution.
- Process is an important part of modern-day operating systems.
- CPU가 처리하는 작업(task)
- 디스크에 저장되어 있던 실행 가능한 프로그램이 메모리에 적재되어 운영체제가 관리하는 상태

### Processes in task manager

![image](https://user-images.githubusercontent.com/85419343/150717427-892f8c8e-76b6-4cd9-a01d-e06158a8318a.png)

### Job vs. Process

![image](https://user-images.githubusercontent.com/85419343/150717137-85f56c6b-ddf6-4d71-9079-5d9ab17b1c30.png)

#### Job

- A bundle of program and data to be executed
  - 실행할 프로그램과 그 프로그램이 처리하는 데이터를 묶어놓은 것
- An entity before submission for execution
  - 컴퓨터 시스템에 실행 요청을 하기 전의 상태 (아직 실행되지 않은 상태)

#### Process (= running program)

- An entity that is registered to kernel for execution
  - 실행을 위해 **시스템(커널)에 등록된 작업**(프로그램)
- Kernel manages the processes to improve overall system performance
  - 시스템 성능 향상을 위해 프로세스는 커널에 의해 관리됨

## 2. What is Process Management?

- Process management involves various tasks like creation, scheduling, termination of processes, and a dead lock.

## 4. Process Control Block (PCB)

- Process operations can be easily controlled with the help of PCB.
- You can consider it as the brain of the process, which contains all the crucial information related to processing like process id, priority, state, CPU registers, etc.
- It is a data structure that is maintained by the Operating system for every process.

### PID

- The PCB should be identified by an integer Process ID (PID).
- It helps you to store all the information required to keep track of all the running proceeses.

## 5. Process states

- A process state is a condition of the process at a specific instant of time.
- It also defines **the current position of the process.**

### Process Lifecycle

![image](https://user-images.githubusercontent.com/85419343/150764964-d7047e8d-60b8-4807-bb0d-78049cd24c8d.png)

- CPU is able to execute a process when the process is in Ready or Running state.
- After completing every step, all the resources are used by a process, and memory becomes free.

#### New

#### Ready

- In a ready state, the process should be loaded into the primary memory, which is ready for execution.

#### Waiting

- The process is waiting for the allocation of CPU time and other resources for execution.

#### Running

- The process is an execution state.

#### Terminated

- Terminated state specifies the time when a process is terminated.

---

### Reference

[Operating system notes | Process Lifecycle](https://applied-programming.github.io/Operating-Systems-Notes/2-Process-Management/)
[Guru99 | Process Management in OS : PCB in Operating System](https://www.guru99.com/process-management-pcb.html)
