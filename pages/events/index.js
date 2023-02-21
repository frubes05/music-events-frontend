import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import Link from "next/link";
const PER_PAGE = 2;

export default function EventsPage({events, page, total}) {
  const lastPage = Math.ceil(total / PER_PAGE);

  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events found!</h3>}
      {events?.length > 0 && events.map(evt => (
        <EventItem key={evt.id} id={evt.id} evt={evt.attributes} />
      ))}
      {page > 1 && (
        <Link className='btn-secondary' href={`/events?page=${page - 1}`}>
          {'<'} Prev
        </Link>
      )}
      {page < lastPage && (
        <Link className='btn-secondary' href={`/events?page=${page + 1}`}>
          Next {'>'}
        </Link>
      )}
    </Layout>
  )
}

export async function getServerSideProps({ query: { page=1 }}) {
  let events;
  let allEvents;
  try {
    const response = await fetch(`http://localhost:1337/api/events?pagination[page]=${page}&pagination[pageSize]=2&_sort=date:ASC&populate=*`);
    events = await response.json();
    events = events.data;

    const eventRes = await fetch(`http://localhost:1337/api/events`) 
    const eventsData = await eventRes.json();
    allEvents = eventsData?.data;
  } catch (error) {
    throw new Error(error.message);
  }
  return {
    props: {
      events,
      page: +page,
      total: allEvents.length
    }
  }
}
