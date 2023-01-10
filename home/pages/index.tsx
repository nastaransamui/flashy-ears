import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import HeadComponent from '@/src/components/head'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <HeadComponent title='Flasy Ears' />
      <main className={styles.main}>
        <div className={styles.thirteen}>
          <Image
            src="/images/logo_white.png"
            alt="13"
            width={150}
            height={150}
            priority
          />
        </div>
        <p className={inter.className}>
          Comming soon
        </p>
      </main>

    </>
  )
}
