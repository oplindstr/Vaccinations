import headerStyles from '../styles/Header.module.css'
import Head from 'next/head'
import { useState } from 'react';
import { DateSelector } from './DateSelector';

const Header = () => {
    const [ date, setDate ] = useState("2021-04-12")
    const value = { date, setDate };

    return (
        <>
            <Head>
                <title>Vaccinations App</title>
                <meta name="description" content="Vaccination application using Next.js framework. Initialized by create next app" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet"  href="https://cdnjs.cloudflare.com/ajax/libs/react-datepicker/2.14.1/react-datepicker.min.css" />
            </Head>

            <div className={headerStyles.dateSelection}>
                <p>Set current date: </p>
                <DateSelector />
            </div>
        </>
    ) 
}

export default Header