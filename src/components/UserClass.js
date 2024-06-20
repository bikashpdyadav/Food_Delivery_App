import React from "react";

class UserClass extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userInfo: {
                name: "Akshay",
                location: "Default",
                avatar_url: "dummy"
            }
        };
        //console.log(this.props.name+" Child Constructor");
    };

    async componentDidMount() {
        //console.log(this.props.name+" Child Component Did Mount");
        const data = await fetch("https://api.github.com/users/bikashpdyadav");
        const userData = await data.json();
        console.log(userData);
        this.setState({
            userInfo: userData,
        });
    };

    render() {
        //console.log(this.props.name+" Child Render");
        const {name,location,avatar_url} = this.state.userInfo;
        return (
            <div className="user-card">
                <img src={avatar_url}/>
                <h2>Name: {name}</h2>
                <h3>Location: {location}</h3>
                <h4>Contact: @akshaysaini</h4>
            </div>
        );
    };
};

export default UserClass;