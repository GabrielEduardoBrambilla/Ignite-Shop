import { HomeContainer, Product } from '@/styles/pages/home'
import Image from 'next/image'
import camiseta1 from '../assets/Camisa-Maratona.png'
import camiseta2 from '../assets/IgniteLab-T-shirt.png'
import camiseta3 from '../assets/Igniter-abord-2-t-shirt.png'
import { GetServerSideProps, GetStaticProps } from 'next'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import Link from 'next/link'

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: number
  }[]
}
export default function Home({ products }: HomeProps) {
  return (
    <HomeContainer>
      {products.map(product => {
        return (
          <Link href="" key={product.id}>
            <Product className="keen-slider__slide">
              <Image src={product.imageUrl} width={520} height={480} alt="" />

              <footer>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </footer>
            </Product>
          </Link>
        )
      })}
    </HomeContainer>
  )
}

export const getServerSideProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount / 100)
    }
  })
  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2
  }
}
