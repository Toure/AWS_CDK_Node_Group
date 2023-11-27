#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { EksNodeGroupStack } from '../lib/make_node_group-stack';

const app = new cdk.App();
new EksNodeGroupStack(app, 'MakeNodeGroup', {
});
