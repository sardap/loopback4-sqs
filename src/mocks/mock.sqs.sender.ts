import debugFactory from "debug";
import { SendMessageRequest } from "..";
import { handlerFun } from "../sqs.consumer";

const debug = debugFactory("loopback:sqs:mock:consumer");

export class MockSQS {
  private static handlers: Record<string, handlerFun> = {};

  static async sendMessage(params: SendMessageRequest) {
    debug(`sending Mock Message ${JSON.stringify(params.MessageBody)} to ${params.QueueUrl}`);
    if(!params.MessageBody) {
      throw Error("don't send empty bodies to mock queue");
    }
    
    if(!(params.QueueUrl in this.handlers)) {
      return;
    }
        
    await this.handlers[params.QueueUrl](JSON.parse(params.MessageBody), {
      MessageId: "mr_mock",
      Body: params.MessageBody,
      //TODO Attributes
    });
  }

  static removeHandler(queue: string) {
    delete this.handlers[queue];
  }

  static addHandler(queue: string, handler: handlerFun) {
    debug(`mock handler added for ${queue}`);
    this.handlers[queue] = handler;
  }
}
  