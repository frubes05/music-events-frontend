import React from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import styles from '@/styles/404.module.css';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <Layout title='Page not found'>
        <div className={styles.error}>
            <h1><FaExclamationTriangle/> Page not found!</h1>
            <Link href='/'>Go to home page</Link>
        </div>
    </Layout>
  )
}

export default NotFoundPage