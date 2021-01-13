import {bind, BindingScope, LifeCycleObserver} from "@loopback/core";
import * as AWS from "aws-sdk";
import debugFactory from "debug";
import {EventEmitter} from "events";
import {Consumer, SQSMessage} from "sqs-consumer";

const debug = debugFactory("loopback:sqs:consumer");

@bind({ scope: BindingScope.SINGLETON })
export class SQSConsumer extends EventEmitter implements LifeCycleObserver {
  private sqs: AWS.SQS;
  private consumers: Consumer[];

  constructor() {
    super();
    debug("creating sqs instance");
    this.sqs = new AWS.SQS();
    this.consumers = [];
  }

  async subscribeToQueue<T>(
    queueName: string,
    handler: (msg: T | undefined, rawMessage: SQSMessage) => Promise<void>,
    onError: (err: Error) => void,
    onProcessingError: (err: Error) => void,
    messageAttributeNames?: string[]
  ): Promise<void> {
    const consumer = Consumer.create({
      queueUrl: queueName,
      pollingWaitTimeMs: 1,
      messageAttributeNames: messageAttributeNames,
      handleMessage: async (message) => {
        let body: T | undefined;
        body = undefined;
        if (message.Body) {
          try {
            body = <T>JSON.parse(message.Body);
          } catch (e) {
            body = undefined;
          }
        }
        await handler(body, message);
      },
      sqs: this.sqs,
    });

    consumer.on("error", onError);

    consumer.on("processing_error", onProcessingError);

    consumer.start();

    this.consumers.push(consumer);
  }

  stopAllConsumers() {
    debug(`stopping consumers`);
    let num = this.consumers.length;
    for (var consumer of this.consumers) {
      consumer.stop();
    }
    debug(`stopped ${num} consumers`);
  }

  init() {}

  start() {}

  stop() {
    this.stopAllConsumers();
  }
}
