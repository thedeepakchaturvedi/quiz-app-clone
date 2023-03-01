const Header = (props) => {
    const { title, totalPoints } = props;
    return (
        <header className="main-header ">
            <h1 className="quizTitle">{title.toUpperCase()} </h1>
            {/* <br /> */}
            <p className="totalPoints">Total Marks:{totalPoints}</p>
        </header>
    );
};
export default Header;
