import {
  FaComment,
  FaUser,
  FaMagnifyingGlass,
  FaArrowRightFromBracket,
  FaSquarePlus,
} from "react-icons/fa6";
import { MdCampaign } from "react-icons/md";
import { Link } from "@remix-run/react";
import { API_URL } from "~/constants/api";
import type { DbInfluencer } from "~/types/ApiOps";

export default function UserHomeCard({ user }: { user: DbInfluencer }) {
  return (
    <div className="flex">
      <div className="h-screen w-full flex flex-col items-center justify-center">
        <div className="avatar">
          <div className="w-full rounded-xl ring ring-secondary">
            <img
              src={
                user.influencerProfile?.profilePicture
                  ? API_URL + user.influencerProfile.profilePicture
                  : "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
              }
              className="max-w-sm"
              alt="profile"
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center mt-10 font-bold text-4xl">
          <h2>
            {user.fname} {user.lname}
          </h2>
          <div className="badge badge-secondary my-1">
            {user.usertype.toLowerCase()}
          </div>
          <div className="flex flex-row justify-center items-center mt-5">
            <Link to={`/mychats`} prefetch="intent">
              <button className="btn btn-primary btn-circle mx-2">
                <FaComment />
              </button>
            </Link>
            {user.usertype.toLowerCase() === "influencer" ? (
              <Link to="/profile" prefetch="intent">
                <button className="btn btn-primary btn-circle mx-2">
                  <FaUser />
                </button>
              </Link>
            ) : (
              <Link to="/discover-influencers" prefetch="intent">
                <button className="btn btn-primary btn-circle mx-2">
                  <FaMagnifyingGlass />
                </button>
              </Link>
            )}
            {user.usertype.toLowerCase() === "influencer" ? (
              <Link to="/campaigns" prefetch="intent">
                <button className="btn btn-primary btn-circle mx-2">
                  <MdCampaign />
                </button>
              </Link>
            ) : (
              <Link to="/campaigns" prefetch="intent">
                <button className="btn btn-primary btn-circle mx-2">
                  <FaSquarePlus />
                </button>
              </Link>
            )}

            <form method="post" action="/api">
              <button
                className="btn btn-primary btn-circle mx-2"
                name="operation"
                value="LOGOUT"
              >
                <FaArrowRightFromBracket />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
