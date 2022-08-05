import { useEffect, useRef } from 'react';
import Input from '../components/Input';
import { AiFillFacebook } from 'react-icons/ai';
import { Formik, Form } from 'formik';
import { Navigate, useLocation } from 'react-router-dom';
import { login } from 'firebase.js';
import { LoginSchema } from 'validation';

export default function Login() {
  const ref = useRef();
  const location = useLocation();

  useEffect(() => {
    let images = ref.current.querySelectorAll('img'),
      total = images.length,
      current = 0;
    const imageSlider = () => {
      images[(current > 0 ? current : total) - 1].classList.add('opacity-0');
      images[current].classList.remove('opacity-0');
      current === total - 1 ? (current = 0) : current++;
    };
    imageSlider();
    let interval = setInterval(imageSlider, 3000);
    return () => {
      clearInterval(interval);
    };
  }, ref);

  const handleSubmit = async (values, actions) => {
    await login(values.username, values.password);
    <Navigate to={location.state?.return_url || '/'} replace={true} />;
  };

  const images = [
    'https://www.instagram.com/static/images/homepage/screenshots/screenshot1.png/fdfe239b7c9f.png',
    'https://www.instagram.com/static/images/homepage/screenshots/screenshot2.png/4d62acb667fb.png',
    'https://www.instagram.com/static/images/homepage/screenshots/screenshot3.png/94edb770accf.png',
    'https://www.instagram.com/static/images/homepage/screenshots/screenshot4.png/a4fd825e3d49.png'
  ];

  return (
    <>
      <div className="hidden md:block w-[380px] h-[580px] bg-logo-pattern bg-[length:468px_634px] bg-[top_left_-46px] relative">
        <div
          className="w-[250px] h-[538px] absolute top-[27px] right-[18px]"
          ref={ref}
        >
          {images.map((image, key) => (
            <img
              key={key}
              className="h-full w-full absolute top-0 left-0 opacity-0 transition-opacity-0 duration-700"
              src={image}
            />
          ))}
        </div>
      </div>

      <div className="w-[350px] grid gap-y-3">
        <div className=" bg-white border p-[40px] pt-10 pb-6 ">
          <a href="https://www.instagram.com/" className="flex justify-center">
            <img
              className="h-[51px] mb-8"
              src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png"
            />
          </a>
          <Formik
            validationSchema={LoginSchema}
            initialValues={{
              username: '',
              password: ''
            }}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, isValid, dirty, values }) => (
              <Form onSubmit={handleSubmit} className="grid gap-y-1.5">
                <pre>{JSON.stringify(values, null, 2)}</pre>
                <Input
                  name="username"
                  label="Phone Number, username or email"
                />
                <Input type="password" name="password" label="Password .." />
                <button
                  type="submit"
                  disabled={!isValid || !dirty || isSubmitting}
                  className="bg-brand text-gray-50 px-2 text-sm border w-full h-[30px] rounded-sm font-medium disabled:opacity-50"
                >
                  Log In
                </button>
                <div className="flex items-center my-2.5 mb-3.5">
                  <div className="h-px bg-gray-300 flex-1" />
                  <span className="px-4 text-[13px] text-gray-500 font-semibold">
                    {' '}
                    OR{' '}
                  </span>
                  <div className="h-px bg-gray-300 flex-1" />
                </div>
                <a
                  href="#"
                  className="flex justify-center items-center gap-x-2 text-sm v-full font-semibold text-facebook "
                >
                  <AiFillFacebook size={20} />
                  Log in with Facebook
                </a>
                <a
                  href="#"
                  className="flex justify-center items-center p-4 text-xs v-full  text-link "
                >
                  forgot Password?
                </a>
              </Form>
            )}
          </Formik>
        </div>
        <div className=" bg-white border p-4 text-center text-sm ">
          Don't have an account?{' '}
          <a href="" className="font-semibold text-sm text-brand ">
            Sing up
          </a>
        </div>
      </div>
    </>
  );
}
