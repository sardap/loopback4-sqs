import debugFactory from "debug";
import { SQSProducer } from "../sqs.producer";
import { MockSQSSender } from "./mock.sqs.sender";

const debug = debugFactory("loopback:sqs:mock:producer");

export class MockSQSProducer extends SQSProducer {
  constructor() {
    super();
  }

  async produce(params: AWS.SQS.Types.SendMessageRequest): Promise<void> { 
    MockSQSSender.sendMessage(params);
  }
}
  