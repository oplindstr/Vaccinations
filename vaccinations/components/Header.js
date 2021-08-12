import headerStyles from '../styles/Header.module.css'

const Header = () => {
    return (
        <div>
            <h2 className={headerStyles.title}>
                <span>Vaccinations App</span>
            </h2>
        </div>
    ) 
}

export default Header