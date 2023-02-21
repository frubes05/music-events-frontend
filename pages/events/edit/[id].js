import React, { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import styles from "@/styles/Form.module.css";
import { FaImage } from 'react-icons/fa';
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";

const EditEventsPage = ({ event, id }) => {
  const [values, setValues] = useState({
    name: event.data.attributes.name,
    performers: event.data.attributes.performers,
    venue: event.data.attributes.venue,
    address: event.data.attributes.address,
    date: event.data.attributes.date,
    time: event.data.attributes.time,
    description: event.data.attributes.description,
  });
  const [imagePreview, setImagePreview] = useState(
    event.data?.attributes.image
      ? (event.data?.attributes.image.data?.attributes.formats ? event.data?.attributes.image.data?.attributes.formats.thumbnail.url : event.data?.attributes.image.data?.attributes.url)
      : null
  );
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasEmptyFields = Object.values(values).some((elem) => elem === "");

    if (hasEmptyFields) {
      toast.error("Please fill in all fields!");
    }

    const res = await fetch(`http://localhost:1337/api/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: values }),
    });

    if (!res.ok) {
      toast.error("Something went wrong!");
    } else {
      const event = await res.json();
      router.push(`/events`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const imageUploaded = async(e) => {
    const res = await fetch(`http://localhost:1337/api/events/${id}?populate=*`);
    const event = await res.json();
    setImagePreview(event.data?.attributes.image.data?.attributes.formats ? event.data?.attributes.image.data?.attributes.formats.thumbnail.url : event.data?.attributes.image.data?.attributes.url);
    setShowModal(false);
  }

  return (
    <Layout title="Edit existing Event">
      <Link href="/events">Go Back</Link>
      <h1>Edit Event</h1>
      <ToastContainer />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              name="performers"
              id="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              name="venue"
              id="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "numeric",
              })
                .format(new Date(values.date))
                .replace(/\//g, "-")}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              name="time"
              id="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <input type="submit" value="Update Event" className="btn" />
      </form>

      <h2>Event Image</h2>
      {imagePreview ? (
        <Image src={imagePreview} height={100} width={170} alt="image" />
      ) : (
        <div>
          <p>No image uploaded</p>
        </div>
      )}
      <div>
        <button className="btn-secondary" onClick={() => setShowModal(true)}>
          <FaImage /> Set image
        </button>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload eventId={id} imageUploaded={imageUploaded}/>
      </Modal>
    </Layout>
  );
};

export default EditEventsPage;

export async function getServerSideProps({ params: { id } }) {
  let event;
  try {
    const res = await fetch(
      `http://localhost:1337/api/events/${id}?populate=*`
    );
    event = await res.json();
  } catch (error) {
    throw new Error(error.message);
  }

  return {
    props: {
      event,
      id,
    },
  };
}
