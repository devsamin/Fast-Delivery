import { useForm } from "react-hook-form";


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
        <button className="btn bg-[#CAEB66] hover:bg-[#c0ef32] mt-4">Login</button>
      </form>
    </div>
  );
};

export default Login;
