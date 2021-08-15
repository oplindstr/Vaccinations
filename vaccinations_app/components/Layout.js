import styles from '../styles/Layout.module.css'
import Nav from './Nav'
import Header from './Header'
import { DateContext, DateProvider } from '../context/DateContext'

const Layout = ({children}) => {
    return (
        <DateProvider>
            <>
            <Nav />
            <Header />
            <div className={styles.container}>
                <main className={styles.main}>
                    {children}
                </main>
            </div>
            </>
        </DateProvider>
    ) 
}

export default Layout