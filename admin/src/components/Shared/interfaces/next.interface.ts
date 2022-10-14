import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactNode } from 'react';
import { EmotionCache } from '@emotion/react';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { HazelcastClient } from 'hazelcast-client/lib/HazelcastClient';

export type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
  isVercel?: boolean;
};
export type NextProps = AppProps & {
  Component: Page;
};

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export interface HazelcastType extends NextApiRequest {
  hazelCast: HazelcastClient | undefined;
}
