import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { RequestHandler } from "@remix-run/node";
import Cookies from "js-cookie";

export default function Dashboard() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title font-bold text-2xl mb-4">Dashboard</h2>
          <p className="text-center">Welcome to your dashboard!</p>
        </div>
      </div>
    </div>
  );
}
