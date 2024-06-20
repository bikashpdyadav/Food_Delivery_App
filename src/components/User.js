import { useState } from "react";

const User = (props) => {
    const [count,setcount] = useState(1);
    const [count2,setcount2] = useState(2);
    return (
        <div className="user-card">
            <h2>Name: {props.name}</h2>
            <h3>Location: Dehradun</h3>
            <h4>Contact: @akshaysaini</h4>
        </div>
    );
};

export default User;