import React from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../../../hooks/UseAuth';
import { Link } from 'react-router-dom';
import SocialLogin from '../../../SocialLogin/SocialLogin';

const Register = () => {

    const {register, handleSubmit, formState : {errors}} = useForm()
    const {createUser} = UseAuth();
    const OnSubmit = (data)=>{
        console.log(data)
        createUser(data.email, data.password)
        .then(result=>{
            const user = result.user;
            console.log(user);
        })
        .catch(error=>{
            console.log(error);
        })
    }
    return (
      <div className="card-body">
              <h1 className="text-3xl font-bold">Register now!</h1>

        <form onSubmit={handleSubmit(OnSubmit)} className="fieldset">
          <label className="label">Email</label>
          <input type="email" {...register("email")} className="input" placeholder="Email" />
          <label className="label">Password</label>
          <input type="password" {...register("password", {minLength : 8, required : true})} className="input" placeholder="Password" />
          {errors.password && <p className="text-red-600" role="alert">Password must be 8 character</p>}
          <button className="btn bg-[#CAEB66] mt-4 w-[320px]">Register</button>
        </form>
        <p className='-mt-4'><small>Already Have An Account? <Link className='btn btn-link -ml-4 mb-1' to={'/login'}>Login</Link></small></p>
        <SocialLogin></SocialLogin>
      </div>

    );
}
export default Register;
