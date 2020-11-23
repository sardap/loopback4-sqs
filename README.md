# Loopback4-SQS

## Where are the tests?
Good news I have chosen given YOU the opportunity to write them. Quickly before I trick someone else into doing it.

## How to use?
```
  const consumer = await app.get<SQSConsumer>(SQSBindings.SQS_CONSUMER);
  await consumer.subscribeToQueue(
    process.env.SQS_QUEUE_NAME,
    HANDLER_FUNCTION,
    err => {
      console.log(err);
    },
    err => {
      console.log(err);
    },
    MESSAGE_ATTR_NAMES,
  );

```

