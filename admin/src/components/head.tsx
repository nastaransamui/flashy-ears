import Head from 'next/head';
import PropTypes from 'prop-types'
import brand from '@/public/text/brand'
import React from "react";
import { useTranslation } from 'react-i18next';


type ObjectKey = keyof typeof brand;

export default function HeadComponent({ title }: { title: string }) {
  const { i18n } = useTranslation();

  const langName = `name_${i18n.language}` as ObjectKey;

  return (
    <Head>
      <title>{title}</title>
      <meta charSet='UTF-8' />
      <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
      <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
      <meta charSet='utf-8' />
      <meta name='description' content={brand[langName]} />
      <link rel='shortcut icon' href='/admin/favicons/favicon.ico' />
      <link
        rel='apple-touch-icon'
        sizes='57x57'
        href='/admin/favicons/apple-icon-57x57.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='60x60'
        href='/admin/favicons/apple-icon-60x60.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='72x72'
        href='/admin/favicons/apple-icon-72x72.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='76x76'
        href='/admin/favicons/apple-icon-76x76.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='114x114'
        href='/admin/favicons/apple-icon-114x114.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='120x120'
        href='/admin/favicons/apple-icon-120x120.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='144x144'
        href='/admin/favicons/apple-icon-144x144.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='152x152'
        href='/admin/favicons/apple-icon-152x152.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='/admin/favicons/apple-icon-180x180.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='192x192'
        href='/admin/favicons/android-icon-192x192.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='/admin/favicons/favicon-32x32.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='96x96'
        href='/admin/favicons/favicon-96x96.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='16x16'
        href='/admin/favicons/favicon-16x16.png'
      />
      <link rel='manifest' href='/admin/favicons/manifest.json' />
      <meta name='msapplication-TileColor' content='#ffffff' />
      <meta
        name='msapplication-TileImage'
        content='/admin/admin/favicons/ms-icon-144x144.png'
      />
    </Head>
  )
}