import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="h-full w-full flex flex-wrap overflo-auto gap-x-8 items-center justify-center ">
      <Outlet />
    </div>
  );
}
