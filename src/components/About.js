import User from "./User";
import UserClass from "./UserClass";
import React from "react";

/*class AboutClass extends React.Component{
    constructor(props){
        super(props);
        //console.log("Parent Constructor");
    };

    componentDidMount(){
        //console.log("Parent Component Did Mount");
    };

    render() {
        console.log("Parent Render");
        return (
            <div>
                <h1>About Us</h1>
                <User/>
            </div>
        );
    };
};*/

const About = () => {
    return (
        <div>
            <h1>About Us</h1>
            <User name={"Akshay Saini"}/>
        </div>
    )
};

export default About;