import React from 'react';
import Link from 'next/link';
import styles from '@/components/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
        <p>Copyright &copy; DJ Events 2023</p>
        <Link href='/about'>About this project</Link>
    </footer>
  )
}

export default Footer