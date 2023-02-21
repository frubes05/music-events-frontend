import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/components/EventItem.module.css";

const EventItem = ({ evt, id }) => {
  const format = useMemo(() => evt.image?.data?.attributes.formats, []);

  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          alt= 'image'
          src={evt.image.data?.attributes.url}
          width={170}
          height={100}
        />
      </div>
      <div className={styles.info}>
        <span>{new Date(evt.date).toLocaleDateString('hr-HR')} at {evt.time}</span>
        <h3>{evt.name}</h3>
      </div>
      <div className={styles.link}>
        <Link className="btn" href={`/events/${evt.slug}`}>
            Details
        </Link>
      </div>
    </div>
  );
};

export default EventItem;
