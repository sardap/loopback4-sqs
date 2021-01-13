import {
  bind,
  Binding,
  Component,
  config,
  ContextTags,
  createBindingFromClass,
  ProviderMap,
} from "@loopback/core";
import * as AWS from "aws-sdk";
import debugFactory from "debug";
import {ConfigDefaults, SQSComponentConfig} from "./interfaces";
import {SQSBindings} from "./keys";
import {SQSConsumer} from "./sqs.consumer";
import {SQSProducer} from "./sqs.producer";

const debug = debugFactory("loopback:sqs:component");

@bind({
  tags: {
    [ContextTags.KEY]: SQSBindings.COMPONENT.key,
  },
})
export class SQSComponent implements Component {
  providers?: ProviderMap = {};
  bindings?: Binding[];
  lifeCycleObservers = [SQSConsumer]

  constructor(
    @config({ fromBinding: SQSBindings.COMPONENT })
    private componentConfig: Required<SQSComponentConfig>
  ) {
    debug("SQSComponent::init");
    debug("updating aws config");
    this.componentConfig = { ...ConfigDefaults, ...this.componentConfig };
    //Really not sure about this seems bad to set this global only in this com
    AWS.config.update(this.componentConfig.aws);
    this.bindings = [
      createBindingFromClass(SQSProducer, {
        key: SQSBindings.SQS_PRODUCER,
      }),

      createBindingFromClass(SQSConsumer, {
        key: SQSBindings.SQS_CONSUMER,
      }),
    ];
  }
}
