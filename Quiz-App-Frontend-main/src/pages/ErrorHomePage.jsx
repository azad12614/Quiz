import { useEffect, useState } from "react";
import { HiUserCircle } from "react-icons/hi2";
import { IoMdReturnRight } from "react-icons/io";
import QuesAnswer from "../components/QuesAnswer";
import { Link, useLoaderData, useLocation } from "react-router-dom";
import AvgResults from "../components/AvgResults";
function ErrorHomePage() {
  return (
    <div className="bg-black text-gray-500 h-screen">
        <p className="text-2xl text-gray-300 font-bold text-center p-5">Check your server connection. Thank You</p>
      <div>
        <button
          className="flex justify-center items-center gap-x-2 font-mono absolute bottom-28 right-32"
        >
          <IoMdReturnRight /> Next
        </button>
        <Link
          to="./"
          className="flex justify-center items-center gap-x-2 font-mono absolute top-28 left-32"
        >
          <span className="text-2xl">
            <HiUserCircle />
          </span>
          Results
        </Link>
      </div>
    </div>
  );
}

export default ErrorHomePage;
