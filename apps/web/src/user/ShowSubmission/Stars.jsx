const Stars = (props) => {
    const { score, totalPoints } = props;
    let stars = [];
    for (let index = 0; index < totalPoints; index++) {
        stars.push(index);
    }

    return stars.map((star, i) => {
        return star < score ? (
            <span
                key={'star-' + i}
                className="fa fa-star checked , stars"
            ></span>
        ) : (
            <span key={'star-' + i} className="fa fa-star , stars"></span>
        );
    });
};
export default Stars;
