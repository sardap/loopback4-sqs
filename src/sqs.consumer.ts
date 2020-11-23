import {bind, BindingScope} from '@loopback/core';
import * as AWS from 'aws-sdk';
import debugFactory from 'debug';
import {EventEmitter} from 'events';
import {Consumer, SQSMessage} from 'sqs-consumer';

const debug = debugFactory('loopback:sqs:consumer');

@bind({scope: BindingScope.SINGLETON})
export class SQSConsumer extends EventEmitter {
  private sqs: AWS.SQS;

  constructor() {
    super();
    debug('creating sqs instance');
    this.sqs = new AWS.SQS();
  }

  async subscribeToQueue<T>(
    queueName: string,
    handler: (msg: T | undefined, rawMessage: SQSMessage) => Promise<void>,
    onError: (err: Error) => void,
    onProcessingError: (err: Error) => void,
    messageAttributeNames?: string[],
  ): Promise<void> {
    const consumer = Consumer.create({
      queueUrl: queueName,
      pollingWaitTimeMs: 1,
      messageAttributeNames: messageAttributeNames,
      handleMessage: async message => {
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

    consumer.on('error', onError);

    consumer.on('processing_error', onProcessingError);

    consumer.start();
  }
}
