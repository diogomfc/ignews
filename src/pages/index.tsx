import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <>
     <Head>
       <title>Home</title>
     </Head>
    <div className={styles.container}>
      <h1 className={styles.title}>Hello world!</h1>
    </div>
    </>
   
  )
}
