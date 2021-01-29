import debugFactory from "debug";
import { SQSConsumer, handlerFun } from "../sqs.consumer";
import { MockSQSSender } from "./mock.sqs.sender";

const debug = debugFactory("loopback:sqs:mock:consumer");

export class MockSQSConsumer extends SQSConsumer {
    constructor() {
      super();
    }
  
    async subscribeToQueue<T>(
      queueName: string,
      handler: handlerFun,
      onError: (err: Error) => void,
      onProcessingError: (err: Error) => void,
      messageAttributeNames?: string[]
    ): Promise<void> {
      debug(`Subscribed to mock queue:${queueName}`);
      MockSQSSender.addHandler(queueName, handler);
    }
  
    stopAllConsumers() {}
  
    init() {}
  
    start() {}
  
    stop() {}
  }
  