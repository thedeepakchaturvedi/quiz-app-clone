const Header = ({ title }) => {
    return (
        <header className="main-header ">
            <h1 className="quizTitle">{title.toUpperCase()}</h1>
        </header>
    );
};
export default Header;
