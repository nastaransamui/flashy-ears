'use strict';
var { Client, LogLevel } = require('hazelcast-client');
var toBoolean = require('to-boolean');

import type { NextApiResponse } from 'next';
import { HazelcastType } from '@/interfaces/next.interface';

function createClientConfig() {
  const lifecycleListener = (state: unknown) => {
    // console.log('Lifecycle Event >>> ' + state);
  };

  return {
    clusterName: 'dev',
    network: {
      connectionTimeout: 6000,
      clusterMembers: ['127.0.0.1:5701'],
    },
    properties: {
      'hazelcast.logging.level': 'OFF',
    },
    lifecycleListeners: [lifecycleListener],
    connectionStrategy: {
      asyncStart: false,
      reconnectMode: 'ASYNC',
      connectionRetry: {
        initialBackoffMillis: 100000,
        maxBackoffMillis: 60000,
        multiplier: 2,
        clusterConnectTimeoutMillis: 1,
        jitter: 0.2,
      },
    },
  };
}
const hazelCast = async (
  req: HazelcastType,
  res: NextApiResponse,
  next: () => void
) => {
  const isVercel = toBoolean(process.env.NEXT_PUBLIC_SERVERLESS);
  if (isVercel) {
    next();
    // req.hazelCast = null;
  } else {
    try {
      // Connect to Hazelcast cluster
      const client = await Client.newHazelcastClient(createClientConfig());
      req.hazelCast = client;
      next();
    } catch (err) {
      console.log(err);
      // req.hazelCast = null;
      next();
    }
  }
};

export default hazelCast;
