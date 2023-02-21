import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { useRouter } from "next/router";
import Link from "next/link";
import qs from "qs";

export default function SearchPage({ events }) {
  const router = useRouter();

  return (
    <Layout title={"Search Results"}>
      <Link href="/events">Go Back</Link>
      <h1>Search Results for {router.query.term}</h1>
      {events?.length === 0 && <h3>No events found!</h3>}
      {events?.length > 0 &&
        events.map((evt) => (
          <EventItem key={evt.id} id={evt.id} evt={evt.attributes} />
        ))}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    filters: {
      $or: [
        {
            name: {
                $contains: term
            }
        },
        {
            venue: {
                $contains: term
            }
        },
        {
            performers: {
                $contains: term
            }
        },
        {
            description: {
                $contains: term
            }
        }
      ]
    },
  });
  let events;
  try {
    const response = await fetch(
      `http://localhost:1337/api/events?${query}&populate=*`
    );
    events = await response.json();
    events = events.data;
  } catch (error) {
    throw new Error(error.message);
  }
  return {
    props: {
      events,
    },
  };
}
