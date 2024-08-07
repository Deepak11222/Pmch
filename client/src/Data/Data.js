import { FaPhotoVideo, FaRegNewspaper } from "react-icons/fa";
import { CiHome } from "react-icons/ci";
import { TbCategory } from "react-icons/tb";
import { IoIosContact } from "react-icons/io";
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  // UilChart,
  // UilSignOutAlt,
} from "@iconscout/react-unicons";

// Analytics Cards imports
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
// import { keyboard } from "@testing-library/user-event/dist/keyboard";

// Recent Card Imports
import img1 from "../components/imgs/img1.png";
import img2 from "../components/imgs/img2.png";
import img3 from "../components/imgs/img3.png";

// Sidebar Data
export const SidebarData = [
  {
    icon: CiHome ,
    heading: "Home",
    path: "/", // Make sure it's "/" for the Dashboard
  },
  {
    icon: UilUsersAlt,
    heading: "Users",
    path: "/users", // Make sure it's "/users" for the Users
  },
  {
    icon: TbCategory,
    heading: "Category",
    submenus: [
      {
        icon: UilEstate,
        heading: "Specialities",
        path: "/specialities",
      },
      {
        icon: UilClipboardAlt,
        heading: "About Us",
        path: "/about-us",
      },
      {
        icon: UilPackage,
        heading: "TPA and Insurance",
        path: "/tpa-insurance",
      },
      {
        icon: UilUsersAlt,
        heading: "Patient Care",
        path: "/patient-care",
      },
      {
        icon: FaRegNewspaper,
        heading: "News/Blog",
        path: "/news-blog",
      },
      {
        icon: IoIosContact,
        heading: "Contact Us",
        path: "/contact-us",
      },
    ],
  },

  {
    icon: FaPhotoVideo,
    heading: "Media",
  },
  {
    icon: FaRegNewspaper ,
    heading: 'News/Blog'
  },
  {
    icon: IoIosContact,
    heading: 'Contact Us'
  },
];

// Analytics Cards Data
export const cardsData = [
  {
    title: "Sales",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 70,
    value: "25,970",
    png: UilUsdSquare,
    series: [
      {
        name: "Sales",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
  },
  {
    title: "Revenue",
    color: {
      backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
      boxShadow: "0px 10px 20px 0px #FDC0C7",
    },
    barValue: 80,
    value: "14,270",
    png: UilMoneyWithdrawal,
    series: [
      {
        name: "Revenue",
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
  },
  {
    title: "Expenses",
    color: {
      backGround:
        "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
      boxShadow: "0px 10px 20px 0px #F9D59B",
    },
    barValue: 60,
    value: "4,270",
    png: UilClipboardAlt,
    series: [
      {
        name: "Expenses",
        data: [10, 25, 15, 30, 12, 15, 20],
      },
    ],
  },
];

// Recent Update Card Data
export const UpdatesData = [
  {
    img: img1,
    name: "Andrew Thomas",
    noti: "has ordered Apple smart watch 2500mh battery.",
    time: "25 seconds ago",
  },
  {
    img: img2,
    name: "James Bond",
    noti: "has received Samsung gadget for charging battery.",
    time: "30 minutes ago",
  },
  {
    img: img3,
    name: "Iron Man",
    noti: "has ordered Apple smart watch, samsung Gear 2500mh battery.",
    time: "2 hours ago",
  },
];