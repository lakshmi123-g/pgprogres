import React from "react";
//import { scaleLinear } from "d3-scale";
//import Progress from "./progress";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

const total = 100;


class Secondary extends React.Component {
  state = {
    data: total + 1,
    // timeInterval: '5000'
  };

  handleOnClick = (e) => {
    fetch("http://localhost:3001/secondary/")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.setState({
          data: json[0].users,
        });

        // toast('Second Database is called', { position: toast.POSITION.TOP_RIGHT })
      });


    // e.preventDefault();
    this.setState({
      data: Math.floor(Math.random * total + 1),
    });

  };

  componentDidMount() {
    this.interval = setInterval(
      () => this.handleOnClick({ time: Date.now() }),

      5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }


  render() {
    return (
      <div>
      </div>
    );
  }
}

export default Secondary;
