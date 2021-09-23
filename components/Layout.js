import Head from 'next/head'
import styles from '@/styles/Layout.module.css'
import Footer from './Footer'
import Header from './Header'

export default function Layout({ children, title, keyword, description }) {
   return (
      <div>
         <Head>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keyword' content={keyword} />
         </Head>

         <Header />
         <div className={styles.container}>{children}</div>
         <Footer />
      </div>
   )
}

Layout.defaultProps = {
   title: 'Musically | Find Best Musical Events nearBy',
   description: 'Find the latest musical events',
   keywords: 'music, musical, latest, dj, edm, events',
}
