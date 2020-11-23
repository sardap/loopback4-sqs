import {bind, BindingScope} from '@loopback/core';
import {SQS} from 'aws-sdk';
import debugFactory from 'debug';
import {EventEmitter} from 'events';

const debug = debugFactory('loopback:sqs:producer');

@bind({scope: BindingScope.SINGLETON})
export class SQSProducer extends EventEmitter {
  private sqs: SQS;

  constructor() {
    super();
    debug('creating sqs instance for producer');
    this.sqs = new SQS();
  }

  async produce(params: SQS.Types.SendMessageRequest): Promise<void> {
    this.sqs.sendMessage(params, function (err, data) {
      if (err) {
        debug('Error', err);
      } else {
        debug('Success', data.MessageId);
      }
    });
  }
}
