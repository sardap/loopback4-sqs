import debugFactory from "debug";
import { SQSMessage } from "..";
import { handlerFun } from "../sqs.consumer";
const debug = debugFactory("loopback:sqs:mock:consumer");

export class MockSQSSender {
    private static handlers: Record<string, handlerFun>;
  
    static async sendMessage(queue: string, msg: SQSMessage) {
      debug(`sending Mock Message ${JSON.stringify(msg)}`);
      if(!msg.Body) {
        throw Error("don't send empty bodies to mock queue");
      }
      await this.handlers[queue](JSON.parse(msg.Body), msg);
    }
  
    static addHandler(queue: string, handler: handlerFun) {
      debug(`mock handler added for ${queue}`);
      this.handlers[queue] = handler;
    }
  }
  