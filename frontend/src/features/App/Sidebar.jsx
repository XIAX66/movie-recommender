import { Outlet } from 'react-router-dom';
import AppNav from './AppNav';

function Sidebar() {
  return (
    <div
      className="flex h-[calc(90vh-2.4rem)] 
        basis-[56rem] flex-col 
        items-center border-r-2 border-gray-800 
        bg-gray-700 px-[3rem] pt-[1.5rem]"
    >
      <AppNav />
      <Outlet />
    </div>
  );
}

export default Sidebar;
