import React, { useContext, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";
import { NavLink } from "react-router-dom";
import StateContext from "../store/context";

const Navbar = ({ children }) => {
  const [menuBtn, setMenuBtn] = useState(false);

  const { machines } = useContext(StateContext);

  const navHandler = () => {
    setMenuBtn(!menuBtn);
  };
  //   let sClass = "mb-8 text-[#000] text-base";

  return (
    <div className="block overflow-hidden">
      <div className="w-full shadow-sfull md:fixed md:top-0 md:z-30 bg-white">
        <div className="flex justify-between items-center mx-6 md:mx-16 py-4 z-50">
          <div>
            <NavLink to={"/"}>
              <h1>ConstMAN</h1>
            </NavLink>
          </div>
          <ul className="hidden md:flex gap-10 text-n-gray text-sm ">
            <li>
              <NavLink to="">All</NavLink>
            </li>
            {/* <NavList /> */}
            {machines.length > 0 &&
              machines.map((item) => (
                <li key={item.id}>
                  <NavLink to={item.id}>{item.name}</NavLink>
                </li>
              ))}
            <li>
              <NavLink to="manage">Manage Types</NavLink>
            </li>
          </ul>
          <div onClick={navHandler} className="block md:hidden">
            {menuBtn ? (
              <MdOutlineClose size={20} />
            ) : (
              <AiOutlineMenu size={20} />
            )}
          </div>
        </div>
        {menuBtn && (
          <div className="fixed h-full left-0 top-0 bg-white w-full z-[4] overflow-hidden">
            <div className="flex justify-between items-center shadow-mobile-shadow">
              <div>
                <NavLink to={"/"}>
                  <h1>ConstMAN</h1>
                </NavLink>
              </div>
              <div onClick={navHandler} className="block md:hidden mr-6">
                {menuBtn ? (
                  <MdOutlineClose size={22} />
                ) : (
                  <AiOutlineMenu size={22} />
                )}
              </div>
            </div>
            <div className="mt-10 ml-6">
              <ul onClick={() => setMenuBtn(false)}>
                <li>
                  <NavLink to="">All</NavLink>
                </li>
                {machines.length > 0 &&
                  machines.map((item) => (
                    <li key={item.id}>
                      <NavLink to={item.id}>{item.name}</NavLink>
                    </li>
                  ))}
                <li>
                  <NavLink to="manage">Manage Types</NavLink>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
      {!menuBtn && children}
    </div>
  );
};

export default Navbar;
