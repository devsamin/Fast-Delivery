import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import SocialLogin from "../../../SocialLogin/SocialLogin";


const Login = () => {
    const {register, handleSubmit, formState : {errors},
} = useForm()
    const onSubmit = data => {
        console.log(data);
    }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
        <label className="label">Email</label>
        <input type="email" {...register("email", {required : "Email Address Is Requierd"})}
        arial-invalid={errors.email ? "true" : "false"} className="input" placeholder="Email" />
              {errors.email && <p className="text-red-600" role="alert">{errors.email.message}</p>}

        <label className="label">Password</label>
        <input type="password" {...register("password")} className="input" placeholder="Password" />
        <div>
          <a className="link link-hover">Forgot password?</a>
        </div>
        <button className="btn w-[320px] bg-[#CAEB66] hover:bg-[#c0ef32] mt-4">Login</button>
      </form>
              <p className='-mt-4'><small>Don't Have Any Account? <Link className='btn btn-link -ml-4 mb-1' to={'/register'}>Register</Link></small></p>
              <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;
