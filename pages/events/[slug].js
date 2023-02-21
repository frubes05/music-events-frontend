import React, { useMemo } from "react";
import Layout from "@/components/Layout";
import styles from "@/styles/Event.module.css";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";

const EventPage = ({ event, eventId }) => {
  const router = useRouter();
  const format = useMemo(() => event?.image?.data?.attributes?.formats, []);
  const deleteEvent = async () => {
    const res = await fetch(`http://localhost:1337/api/events/${eventId}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
    } else {
      router.push("/events");
    }
  };

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${eventId}`}>
            <FaPencilAlt /> Edit Event
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>
        <span>
          {new Date(event.date).toLocaleDateString("hr-HR")} at {event.time}
        </span>
        <h1>{event.name}</h1>
        <ToastContainer />
        {event.image && (
          <div className={styles.image}>
            <Image
              alt="image"
              src={event.image.data?.attributes.url}
              width={960}
              height={600}
            />
          </div>
        )}
        <h3>Performers:</h3>
        <p>{event.performers}</p>
        <h3>Description:</h3>
        <p>{event.description}</p>
        <h3>Venue: {event.venue}</h3>
        <p>{event.address}</p>

        <Link className={styles.back} href="/events">
          {"<"} Go Back
        </Link>
      </div>
    </Layout>
  );
};

export default EventPage;

export async function getStaticPaths() {
  let events;
  try {
    const res = await fetch(`http://localhost:1337/api/events?populate=*`);
    events = await res.json();
    events = events.data;
  } catch (error) {
    throw new Error(error.message);
  }
  const paths = events.map((evt) => ({
    params: { slug: evt.attributes.slug },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  let event;
  let eventId;
  try {
    const url = `http://localhost:1337/api/events?filters[slug][$eq]=${slug}&populate=*`;
    const response = await fetch(url);
    event = await response.json();
    eventId = event
    eventId = eventId.data[0].id;
    event = event.data[0].attributes;
  } catch (error) {
    throw new Error(error.message);
  }

  return {
    props: {
      event,
      eventId
    },
    revalidate: 1,
  };
}

/*export async function getServerSideProps({query: { slug }}) {
  let event;
try {
  const response = await fetch(`http://localhost:3000/api/events/${slug}`);
  event = await response.json();
} catch (error) {
  throw new Error(error.message);
}

return {
  props: {
    event
  }
};
}*/
