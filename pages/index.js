import Layout from "@/components/Layout";
import Link from "next/link";
import EventItem from "@/components/EventItem";

export default function HomePage({ events, leadspace }) {
  const { title, description, video } = leadspace;
  return (
    <Layout>
      {events.length === 0 && <h3>No events found!</h3>}
      {events?.length > 0 &&
        events.map((evt) => (
          <EventItem key={evt.id} id={evt.id} evt={evt.attributes} />
        ))}
      {events?.length > 0 && (
        <Link className="btn-secondary" href="/events">
          View all events
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  let events;
  let leadspace;
  try {
    const response = await fetch(
      "http://localhost:1337/api/events?_sort=date:ASC&_limit=3&populate=*"
    );
    events = await response.json();
    events = events.data;

    const leadspaceResponse = await fetch(
      "http://localhost:1337/api/leadspaces?populate=*"
    );
    leadspace = await leadspaceResponse.json();
    leadspace = leadspace.data;
  } catch (error) {
    throw new Error(error.message);
  }
  return {
    props: {
      events,
      leadspace: leadspace[0].attributes,
    },
    revalidate: 1,
  };
}
