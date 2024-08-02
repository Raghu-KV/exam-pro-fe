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
  MdMenuBook,
  MdOutlineArticle,
  MdNotifications,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { isNavOpen } from "../redux/reducers/nav-reducer";
import { useLogoutMutation } from "../redux/requests/adminRequest";

const navMenu = [
  {
    title: "Dashboard",
    icon: <MdDashboard size={25} />,
    link: "/auth/dashboard",
  },
  {
    title: "Students",
    icon: <MdPeopleAlt size={25} />,
    link: "/auth/students",
  },
  {
    title: "Exam Types",
    icon: <MdNewspaper size={25} />,
    link: "/auth/exam-types",
  },
  {
    title: "Subjects",
    icon: <MdMenuBook size={25} />,
    link: "/auth/subjects",
  },
  {
    title: "Chapters",
    icon: <MdOutlineArticle size={25} />,
    link: "/auth/chapters",
  },
  {
    title: "Test Types",
    icon: <MdOutlineLan size={25} />,
    link: "/auth/test-types",
  },
  {
    title: "Questions",
    icon: <MdQuestionMark size={25} />,
    link: "/auth/questions",
  },
  {
    title: "Announcements",
    icon: <MdNotifications size={25} />,
    link: "/auth/Announcements",
  },
  {
    title: "Settings",
    icon: <MdSettings size={25} />,
    link: "/auth/settings",
  },
];

function SideBar() {
  const navigate = useNavigate();
  const navState = useSelector((state) => state.navState);
  const dispatch = useDispatch();

  const handleCloseNav = () => {
    dispatch(isNavOpen({ value: !navState.value }));
  };

  const [logout, { isLoading }] = useLogoutMutation();

  return (
    <div
      className={`h-screen px-4 py-4 font-inter text-appGray border-r-2 flex flex-col justify-between ${
        navState.value ? ` w-1/6` : `w-20 items-center`
      } duration-500 sticky top-0`}
    >
      <div>
        <div
          className={`flex items-center  border-b-2 pb-2 ${
            navState.value ? `justify-between` : `justify-center`
          }`}
        >
          {navState.value && <p>LOGO</p>}
          <MdMenu
            size={25}
            className="cursor-pointer"
            onClick={() => handleCloseNav()}
          />
        </div>
        <div className="flex flex-col mt-7 gap-2">
          {navMenu.map((navItem) => (
            <NavLink
              key={navItem.link}
              to={navItem.link}
              className={({ isActive }) =>
                `p-2 rounded-lg flex items-center font-semibold gap-2 text-sm  duration-200 ${
                  isActive
                    ? " hover:bg-appGreen bg-appGreen text-white"
                    : "hover:bg-appLightGray/30"
                }`
              }
            >
              {navItem.icon}
              {navState.value && <p>{navItem.title}</p>}
            </NavLink>
          ))}
        </div>
      </div>

      <div
        className="p-2 rounded-lg flex items-center font-semibold gap-2 text-sm hover:bg-appLightGray/30 duration-200 cursor-pointer"
        onClick={async () => {
          await logout().unwrap();
          navigate("/");
        }}
      >
        {isLoading ? (
          "Loading..."
        ) : (
          <>
            <MdLogout size={25} />
            {navState.value && <p>Log Out</p>}
          </>
        )}
      </div>
    </div>
  );
}

export default SideBar;
