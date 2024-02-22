import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider/AuthProvider";


const Comment = ({comment}) => {
  
   const{user} = useContext(AuthContext);
//    console.log(user)

    if (!comment) {
        
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="chat chat-start">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img alt="User avatar" src={comment?.comment?.photoURL || user?.photoURL} />
                    </div>
                </div>
                <div className="chat-header">
                    <h1>{comment?.comment?.userName}</h1>
                </div>
                <div className="chat-bubble">{comment?.comment?.comment}</div>
            </div>
        </div>
    );
};

export default Comment;