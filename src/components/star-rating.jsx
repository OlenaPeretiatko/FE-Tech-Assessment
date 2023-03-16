import { AiFillStar } from 'react-icons/ai';

const StarRating = ({ rating }) => {
    const stars = Array.from({ length: 5 }).map((_, index) => (
        <AiFillStar key={index} style={{ color: "#FF9B00" }} />
    ));
    return <div className="flex my-1">{stars.slice(0, rating)}</div>;
};

export default StarRating;