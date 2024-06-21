import React from "react";
import {
  MdMenu,
  MdDashboard,
  MdPeopleAlt,
  MdNewspaper,
  MdOutlineLan,
  MdQuestionMark,
  MdSettings,
  MdLogout,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const navMenu = [
  {
    title: "Dashboard",
    icon: <MdDashboard size={25} />,
    link: "/dashboard",
  },
  {
    title: "Students",
    icon: <MdPeopleAlt size={25} />,
    link: "/students",
  },
  {
    title: "Exam Types",
    icon: <MdNewspaper size={25} />,
    link: "/exam-types",
  },
  {
    title: "Test Types",
    icon: <MdOutlineLan size={25} />,
    link: "/test-types",
  },
  {
    title: "Questions",
    icon: <MdQuestionMark size={25} />,
    link: "/questions",
  },
  {
    title: "Settings",
    icon: <MdSettings size={25} />,
    link: "/settings",
  },
];

function SideBar() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-1/6 px-4 py-4 font-inter text-appGray border-r-2 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between border-b-2 pb-2">
          <p>LOGO</p>
          <MdMenu size={25} className="cursor-pointer" />
        </div>
        <div className="flex flex-col mt-7 gap-2">
          {navMenu.map((navItem) => (
            <NavLink
              key={navItem.link}
              to={navItem.link}
              className={({ isActive }) =>
                `p-2 rounded-lg flex items-center font-semibold gap-2 text-sm hover:bg-appLightGray/30 duration-200 ${
                  isActive ? "bg-appGreen hover:bg-appGreen text-white" : ""
                }`
              }
            >
              {navItem.icon}
              <p>{navItem.title}</p>
            </NavLink>
          ))}
        </div>
      </div>

      <div
        className="p-2 rounded-lg flex items-center font-semibold gap-2 text-sm hover:bg-appLightGray/30 duration-200 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <MdLogout size={25} />
        <p>Log Out</p>
      </div>
    </div>
  );
}

export default SideBar;
