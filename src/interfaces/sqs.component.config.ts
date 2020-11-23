import {ConfigurationOptions} from 'aws-sdk';
import {APIVersions} from 'aws-sdk/lib/config';
import {ConfigurationServicePlaceholders} from 'aws-sdk/lib/config_service_placeholders';

export interface AWSConfigOptions {
  region: string;
  accessKeyID: string;
  secretAccessKey: string;
  endpoint: string;
}

export interface SQSComponentConfig {
  aws: ConfigurationOptions & ConfigurationServicePlaceholders & APIVersions;
}

export const ConfigDefaults: SQSComponentConfig = {
  aws: {
    region: 'ap-southeast-2',
    accessKeyId: 'basura',
    secretAccessKey: 'basura',
    sqs: {
      endpoint: 'basura',
    },
  },
};
