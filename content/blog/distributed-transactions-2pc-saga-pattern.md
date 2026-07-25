## Introduction

One of the biggest challenges in distributed systems isn't scaling, caching, or load balancing.

It's **maintaining data consistency across multiple services**.

In a monolithic application, life is simple. A single database transaction ensures that either all operations succeed or none of them do.

```sql
BEGIN;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

COMMIT;
```

If something fails midway, the database rolls everything back.

Atomic. Consistent. Reliable.

But what happens when your application is split into microservices?

Imagine an e-commerce platform.

```
Order Service
Payment Service
Inventory Service
Notification Service
```

Each service owns its own database.

Now a customer places an order. The business transaction involves:

1. Creating an order
2. Charging the customer
3. Reserving inventory
4. Sending a confirmation

There is no single database transaction that spans all four services.

This is where **distributed transactions** come into the picture.

---

## Why Distributed Transactions Are Hard

Let's assume the following flow:

```
Order Created
        ↓
Payment Charged
        ↓
Inventory Reserved
        ↓
Confirmation Email Sent
```

Now imagine the payment succeeds, but inventory reservation fails.

Your system now looks like this:

```
Order         ✅
Payment       ✅
Inventory     ❌
```

The customer has been charged. But there is no inventory.

You now have inconsistent business data.

Distributed transactions exist to solve exactly this problem. There are two common approaches:

- Two-Phase Commit (2PC)
- Saga Pattern

---

## Two-Phase Commit (2PC)

Two-Phase Commit is a protocol that allows multiple services or databases to behave like a single transaction.

The goal is simple:

> Either every participant commits, or none of them commits.

It introduces one extra component:

```
Transaction Coordinator
```

The coordinator controls the entire transaction.

### Phase 1 — Prepare

Suppose three services participate.

```
Coordinator
      |
      ├── Order Service
      ├── Payment Service
      └── Inventory Service
```

The coordinator asks everyone:

> Can you commit?

Each service:

- Executes its local transaction
- Doesn't commit yet
- Locks required resources
- Replies either `YES` or `NO`

Example:

```
Order        READY
Payment      READY
Inventory    READY
```

Nothing has been committed yet.

### Phase 2 — Commit

If every participant replies YES:

```
Coordinator
      |
      ├── COMMIT
      ├── COMMIT
      └── COMMIT
```

Every service commits. The customer sees:

```
Order Created
Payment Charged
Inventory Reserved
```

Everything happens atomically.

### Rollback

Suppose Inventory replies NO.

```
Order        READY
Payment      READY
Inventory    FAILED
```

The coordinator sends `ROLLBACK`. Every participant rolls back.

From the application's perspective, nothing happened.

### Advantages of 2PC

- Strong consistency
- Global atomicity
- Simple mental model
- Suitable for tightly controlled environments

### Problems with 2PC

Although elegant, 2PC has serious drawbacks.

#### 1. Blocking protocol

Imagine everyone replies READY.

```
Order       READY
Payment     READY
Inventory   READY
```

Just before sending COMMIT, the coordinator crashes.

Now every participant is waiting. They cannot:

- commit
- rollback
- release locks

They don't know what the final decision was. The transaction blocks until the coordinator recovers.

#### 2. Long-lived locks

Participants hold database locks while waiting. Long-running transactions reduce throughput.

#### 3. Poor scalability

Every participant waits for everyone else. As more services are added, latency increases.

#### 4. Not cloud friendly

Modern microservices are:

- independently deployed
- independently scaled
- independently available

2PC introduces tight coupling between services. That's one reason why companies like Amazon, Netflix, Uber and Stripe rarely use it across business services.

---

## Saga Pattern

Instead of creating one large distributed transaction, break the business transaction into multiple **local transactions**.

Each service commits independently. If a later step fails, execute **compensating transactions** to undo the business effect.

Notice the difference.

> 2PC says: Don't commit until everyone agrees.

> Saga says: Commit immediately. If something fails later, compensate.

### Example

```
Reserve Inventory      ✅
Charge Payment         ❌
```

Instead of rolling back the database transaction, execute another business transaction:

```
Release Inventory
```

This is called a **compensating transaction**. It reverses the business outcome rather than undoing the original database transaction.

### Eventual Consistency

A Saga does **not** provide global database atomicity. Instead it guarantees **eventual consistency**.

There may be moments when the system is temporarily inconsistent.

```
Order Created        ✅
Inventory Reserved   ✅
Payment Pending      ⏳
```

Eventually the system reaches one of two valid states.

Success:

```
Order Created
Inventory Reserved
Payment Completed
```

Or compensation:

```
Inventory Released
Order Cancelled
```

The system eventually becomes consistent again.

---

## Two Types of Saga

There are two common ways to coordinate a Saga:

- Orchestration
- Choreography

### Saga Orchestration

A central component controls the workflow.

```
                Saga Orchestrator
                       |
        --------------------------------
        |              |              |
     Order         Payment       Inventory
```

Flow:

```
Create Order
        ↓
Reserve Inventory
        ↓
Charge Payment
        ↓
Generate Invoice
```

If Payment fails:

```
Release Inventory
Cancel Order
```

The orchestrator decides:

- what happens next
- what to retry
- what to compensate

Think of it as a conductor leading an orchestra.

#### Advantages

- Easy to understand
- Centralised workflow
- Easier debugging
- Clear compensation logic

#### Disadvantages

- Orchestrator becomes a critical component
- Workflow logic is centralised
- Can become complex for very large systems

### Saga Choreography

Instead of one orchestrator, every service reacts to events.

```
Order Created Event
        ↓
Inventory Service
        ↓
Inventory Reserved Event
        ↓
Payment Service
        ↓
Payment Successful Event
        ↓
Notification Service
```

Nobody tells the next service what to do. Each service simply subscribes to the events it cares about.

#### Example

```
Customer places order
          ↓
Order Service
          ↓
OrderCreated
          ↓
Inventory Service
          ↓
InventoryReserved
          ↓
Payment Service
          ↓
PaymentCompleted
          ↓
Receipt & Notification
```

Every service is loosely coupled.

#### Failure Handling

Suppose payment fails. Payment Service publishes:

```
PaymentFailed
```

Order Service and Inventory Service receive it. Each performs its own compensation:

```
Release Inventory
Cancel Order
```

No central coordinator exists. The workflow emerges from events.

#### Advantages

- Very loosely coupled
- Highly scalable
- Easy to add new consumers
- Natural fit for Kafka and event-driven architectures

#### Disadvantages

- Harder to understand end-to-end flow
- Debugging becomes difficult
- Event chains can become complex
- Compensation logic is distributed

---

## 2PC vs Saga

| Feature | Two-Phase Commit | Saga |
| --- | --- | --- |
| Transaction type | Global transaction | Multiple local transactions |
| Atomicity | Strong atomicity | Business-level eventual consistency |
| Resource locking | Long-lived locks | Local locks only |
| Scalability | Lower | High |
| Failure handling | Rollback | Compensating transactions |
| Coupling | Tight | Loose |
| Best suited for | Small, tightly coupled systems | Large distributed microservices |

---

## Which One Should You Choose?

There isn't a universally "better" solution.

Use **Two-Phase Commit** when:

- Strong consistency is mandatory
- All participants support distributed transactions
- The number of services is small
- Performance is less important than correctness

Use **Saga** when:

- Building cloud-native microservices
- Services own independent databases
- Scalability is a priority
- Temporary inconsistency is acceptable
- Business operations can be compensated

Most modern internet companies adopt Saga because it aligns better with independently deployable services and event-driven architectures.

---

## Final Thoughts

Distributed systems force us to rethink what a "transaction" really means.

In a monolith, a transaction is a database concern.

In a microservices architecture, a transaction becomes a **business workflow**.

Two-Phase Commit achieves consistency through coordination and atomic commits.

Saga achieves consistency through local commits, events, and compensating actions.

Neither pattern is universally superior. Understanding their trade-offs is far more valuable than memorising their definitions.

As systems scale and services become increasingly independent, the industry has largely shifted towards Saga-based workflows, complemented by patterns such as **Transactional Outbox**, **Idempotency**, and **Reliable Messaging** to build resilient distributed systems.

Mastering these patterns will help you design systems that remain reliable even when networks fail, services crash, or messages are delivered more than once.
