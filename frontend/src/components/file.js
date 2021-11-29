import React from "react";
class File extends React.Component {
    state = {
        timerInterval: 5000,
        message: "database is called"
    };
    getDb = () => {
        //console.log("calling database");
        setTimeout(this.getDb, this.state.timerInterval);
    };
    //componentDidMount() {
    //  setTimeout(this.getDb, this.state.timerInterval);
    //}
    handleChange = (e) => {
        fetch("http://localhost:3001/secondary/")
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                this.setState({
                    data: json[0].users,
                });
                // console.log("data");
            });

        const val = e.target.value;
        console.log("interval", val * 1000);
        this.setState({ timerInterval: val * 1000 });
    };

    handleChange1 = () => {
        fetch("http://localhost:3001/secondary/")
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                this.setState({
                    data: json[0].users,
                });
            });


    };
    componentDidMount() {
        this.timerInterval = setInterval(
            () => this.handleChange1({ time: Date.now() }),

            this.state.timerInterval, this.state.message);
    }


    componentWillUnmount() {
        clearInterval(this.timerInterval);
    }



    render() {
        return (
            <div>
                <select id="timerInterval"  onChange={this.handleChange1}>
                    <option value="1">1 sec</option>
                    <option value="5">5 sec</option>
                    <option value="10">10 sec</option>
                </select>

                <p> <h5>{this.state.message}</h5></p>

            </div>
        );
    }
}
export default File;
