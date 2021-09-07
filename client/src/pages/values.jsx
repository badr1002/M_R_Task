import React, { Component } from "react";

class values extends Component {
  constructor() {
    super()
    try {
      fetch("http://127.0.0.1:5000/api/value/allValues")
      .then((res) => res.json())
      .then((data) => {
        let state = { ...this.state }
        state.values =  data.data.map((a) => a.val) 
        this.setState(state);
      });
    }catch(e){console.log(e);}
    
  }
  state = {
    input: 0,
    values: [],
    currentValue: 410,
  };
  stateHandler = async (e) => {
    let state = { ...this.state };
    state[e.currentTarget.name] = e.currentTarget.value;
    this.setState(state);
  };
  render() {
    return (
      <React.Fragment>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Input</th>
              <th scope="col">Value</th>
              <th scope="col">Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="input val"
                  name="input"
                  value={this.state.input}
                  onChange={this.stateHandler}
                  className="form-control"
                />
              </td>
              <td>
                <select name="currentValue" onChange={this.stateHandler} value={this.state.currentValue}>
                  {this.state.values.map((a, key) => (
                    <option key={key} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                {Math.round(
                  (this.state.input / parseInt(this.state.currentValue)) * 100
                )}
                %
              </td>
            </tr>
          </tbody>
        </table>
        ;
      </React.Fragment>
    );
  }
}

export default values;
