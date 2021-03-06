import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from '@/styles/Event.module.css'
import { useRouter } from 'next/router'

export default function EventPage({ evt }) {
   const router = useRouter()

   const deleteEvent = async (e) => {
      if (confirm('Are you sure?')) {
         const res = await fetch(`${API_URL}/events/${evt.id}`, {
            method: 'DELETE',
         })

         const data = await res.json()

         if (!res.ok) {
            toast.error(data.error)
         } else {
            router.push('/events')
         }
      }
   }

   return (
      <Layout>
         <div className={styles.event}>
            <div className={styles.controls}>
               <Link href={`/events/edit/${evt.id}`}>
                  <a>
                     <FaPencilAlt /> Edit Event
                  </a>
               </Link>
               <a href='#' className={styles.delete} onClick={deleteEvent}>
                  <FaTimes /> Delete Event
               </a>
            </div>

            <ToastContainer />

            <span>
               {evt.date} at {evt.time}
            </span>
            <h1>{evt.name}</h1>
            {evt.image && (
               <div className={styles.image}>
                  <Image
                     src={evt.image.formats.medium.url}
                     width={960}
                     height={600}
                  />
               </div>
            )}

            <h3>Performers:</h3>
            <p>{evt.performers}</p>
            <h3>Description:</h3>
            <p>{evt.description}</p>
            <h3>Venue: {evt.venue}</h3>
            <p>{evt.address}</p>

            <Link href='/events'>
               <a className={styles.back}>{'<'}Go Back</a>
            </Link>
         </div>
      </Layout>
   )
}

export async function getStaticPaths() {
   const res = await fetch(`${API_URL}/events`)
   const evevts = await res.json()

   const paths = evevts.map((evt) => ({
      params: { slug: evt.slug },
   }))

   return {
      paths,
      fallback: true, //If false: Show 404 if the slug is not found
   }
}

export async function getStaticProps({ params: { slug } }) {
   const res = await fetch(`${API_URL}/events?slug=${slug}`)
   const event = await res.json()
   return {
      props: {
         evt: event[0],
      },
      revalidate: 1,
   }
}

// export async function getServerSideProps({ query: { slug } }) {
// props.query.slug
//    const res = await fetch(`${API_URL}/api/events/${slug}`)
//    const event = await res.json()
//    console.log(event)
//    return {
//       props: {
//          evt: event[0],
//       },
//    }
// }
