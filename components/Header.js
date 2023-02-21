import React from 'react';
import Link from 'next/link';
import Search from '@/components/Search';
import styles from '@/components/Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
        <div className={styles.logo}>
            <Link href='/'>
                DJ Events
            </Link>
        </div>
        <Search/>
        <nav>
            <ul>
                <li>
                    <Link href='/events'>
                        Events
                    </Link>
                </li>
                <li>
                    <Link href='/events/add'>
                        Add Event
                    </Link>
                </li>
            </ul>
        </nav>
    </header>
  )
}

export default Header