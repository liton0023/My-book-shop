
import { useEffect, useState } from "react";

const Comment = (props) => {
    const [bookComment, setBookComment] = useState([]);
    const [Loading,setLoading]=useState(false)
    const { id, comment } = props;
   
    useEffect(() => {
        setLoading(true)
       if (comment && comment.comment.bookId === id) {
        console.log(comment);
        setBookComment(comment);
        setLoading(false)
       }
    }, []);

    if (!bookComment) {
        
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="chat chat-start">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img alt="User avatar" src={bookComment?.comment?.photoURL} />
                    </div>
                </div>
                <div className="chat-header">
                    <h1>{bookComment?.comment?.userName}</h1>
                </div>
                <div className="chat-bubble">{bookComment?.comment?.comment}</div>
            </div>
        </div>
    );
};

export default Comment;