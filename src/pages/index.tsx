import { HomeContainer, Product } from '@/styles/pages/home'
import Image from 'next/image'
import camiseta1 from '../assets/Camisa-Maratona.png'
import camiseta2 from '../assets/IgniteLab-T-shirt.png'
import camiseta3 from '../assets/Igniter-abord-2-t-shirt.png'
import { GetServerSideProps } from 'next'
import Stripe from 'stripe'

export default function Home() {
  return (
    <HomeContainer>
      <Product>
        <Image src={camiseta1} width={520} height={480} alt="" />

        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product>
        <Image src={camiseta2} width={520} height={480} alt="" />

        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
    </HomeContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await stripe.products.list()
}
