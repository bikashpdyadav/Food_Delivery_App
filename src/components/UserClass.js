import React from "react";

class UserClass extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            count : 1,
        }
        console.log(this.props.name+" Child Constructor");
    };

    componentDidMount() {
        console.log(this.props.name+" Child Component Did Mount");
    };

    render() {
        console.log(this.props.name+" Child Render");
        return (
            <div className="user-card">
                <h1>Current Count : {this.state.count}</h1>
                <button onClick={()=>{
                    this.setState(()=>{
                        return {count:this.state.count+1};
                    });
                }}>Count Increment</button>
                <h2>Name: {this.props.name}</h2>
                <h3>Location: Dehradun</h3>
                <h4>Contact: @akshaysaini</h4>
            </div>
        );
    };
};

export default UserClass;