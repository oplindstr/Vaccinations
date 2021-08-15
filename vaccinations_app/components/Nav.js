import navStyles from '../styles/Nav.module.css'
import Link from 'next/link'

const Nav = () => {
    return (
        <nav className={navStyles.nav}>
            <ul>
                <li>
                    <Link href='/'>Home</Link>
                </li>
                <li>
                    <Link href='/vaccinations/dashboard'>Dashboard</Link>
                </li>
                <li>
                    <Link href='/orders/statistics'>Order statistics</Link>
                </li>
                <li>
                    <Link href='/vaccinations/statistics'>Vaccination statistics</Link>
                </li>
                <li>
                    <Link href='/vaccinations/expired'>Expirations</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav