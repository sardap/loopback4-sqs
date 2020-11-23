import {BindingAddress, BindingKey} from '@loopback/core';
import {SQSComponentConfig} from './interfaces';
import {SQSComponent} from './sqs.component';
import {SQSConsumer} from './sqs.consumer';
import {SQSProducer} from './sqs.producer';

/**
 * Binding keys used by this component.
 */
export namespace SQSBindings {
  export const SQS_PRODUCER = BindingKey.create<SQSProducer>(
    'components.SQSProducer',
  );

  export const SQS_CONSUMER = BindingKey.create<SQSConsumer>(
    'components.SQSConsumer',
  );

  export const COMPONENT = BindingKey.create<SQSComponent>(
    'components.SQSComponent',
  );

  export const CONFIG: BindingAddress<SQSComponentConfig> = BindingKey.buildKeyForConfig<
    SQSComponentConfig
  >(COMPONENT);
}
