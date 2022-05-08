import cls from './Header.module.css';

const Header = () => {
  return <header className={cls.header}>
    <a href="/" className={cls.logo}><span>D</span>ished</a>
  </header>
}

export default Header;