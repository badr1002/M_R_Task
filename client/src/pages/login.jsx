import React, {Component} from 'react';

class Login extends Component {
    state={
        email:'',
        password:'',
    }
   
    stateHandler = e => {
        let state ={...this.state};
        state[e.currentTarget.name]=e.currentTarget.value;
        this.setState(state)
    }
    submitHandler = async e =>{
        e.preventDefault();
        if (this.state.email !== '' && this.state !== '') {
             try {
               let res = await fetch(
                 "http://127.0.0.1:5000/api/user/login",
                 {
                   method: "POST",
                   headers: {
                     "Content-Type": "application/json",
                   },
                   body: JSON.stringify(this.state),
                 }
               );
               res = await res.json();
               console.log(res.data);
             } catch (e) {
               console.log(e);
             }
        } 
    }
      
    render() {
        return (
           <React.Fragment>
              <form className='form-floating  m-5 text-center' onSubmit={this.submitHandler}>
                   <h2 style={{color:'#f6be15'}}>Login</h2>
                     <i className="fas fa-user fa-3x mb-3"/>
                   <div className="mb-3 row">
                     <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                     <div className="col-sm-10 mb-4">
                       <input
                           autoFocus={true}
                           name='email'
                           value={this.state.email}
                           onChange={this.stateHandler}
                           type="email"
                           className="form-control"
                           id="email"
                       />
                        
                    </div>
                   <label htmlFor="password" className="col-sm-2 col-form-label">password</label>
                   <div className="col-sm-10 mb-4">
                       <input
                           name='password'
                           value={this.state.password}
                           onChange={this.stateHandler}
                           type="password"
                           className="form-control"
                           id="password"
                       />
                   </div>
                </div>
                    <div className=" mb-4">
                       <input type="submit"  className='btn btn-success' value='Login' />
                   </div>
              </form>
           </React.Fragment>
        );
    }
}

export default Login;
