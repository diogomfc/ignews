import { GetStaticProps } from 'next'

import Head from 'next/head'
import Image from 'next/image'
import { SubscriberButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'
import styles from './home.module.scss'

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }: HomeProps) {

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <main className={styles.container}>
        <section className={styles.hero}>
          <span>👋 Hey, Welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications<br />
            <span>for {product.amount} month</span>
          </p>
          <SubscriberButton priceId={product.priceId} />
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

//stripe
export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1Kq0V8BOTot1v7GKXWBBqc4f', {
    expand: ['product']
  })
  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100)
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}
