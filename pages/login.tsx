import Head from "next/head";
import Image from "next/legacy/image";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useAuth from "../hooks/useAuth";

interface Inputs {
  email: string;
  password: string;
}

const login = () => {
  const [login, setLogin] = useState<boolean>(false);
  const { signIn, signUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
  };

  return (
    <div className="relative flex h-screen w-screen flex-col md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Login - Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src="https://assets.nflxext.com/ffe/siteui/vlv3/d0982892-13ac-4702-b9fa-87a410c1f2da/519e3d3a-1c8c-4fdb-8f8a-7eabdbe87056/AE-en-20220321-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        layout="fill"
        className="-z-10 opacity-60 !inline"
        objectFit="cover"
      />
      <img
        src="/benzmovie.png"
        alt="BenzMovie"
        width={120}
        height={30}
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
      />
      <form
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input type="email" placeholder="Email" className="input" {...register("email", { required: true })} />
            {errors.email && <p className="p-1 text-[13px] font-light  text-orange-500">Please enter a valid email.</p>}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="Password"
              className="input"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </label>
        </div>
        <button className="w-full rounded bg-[#E50914] py-3 font-semibold" onClick={() => setLogin(true)}>
          Sign In
        </button>
        <div className="text-[gray]">
          New to Netflix?{" "}
          <button className="cursor-pointer text-white hover:underline" onClick={() => setLogin(false)}>
            Sign up now
          </button>
        </div>
      </form>
    </div>
  );
};

export default login;
