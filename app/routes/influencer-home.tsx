import type { LoaderFunction } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { Link, useLoaderData, useNavigate } from "@remix-run/react";
import { getUserSession } from "~/utils/userSession";
import { getUser } from "~/utils/db";
import { UserTypes, type DbInfluencer } from "~/types/ApiOps";
import { API_URL } from "~/constants/api";

export const loader: LoaderFunction = async (args) => {
  const { userId, token } = await getUserSession(args);
  if (!userId || !token) {
    return redirect("/log-in");
  }

  const data = await getUser(token);
  const user = data.data as DbInfluencer;

  if (user.usertype === UserTypes.BRAND) {
    return redirect("/brand-home");
  }

  return json({ user, userId, token });
};

function InfluencerHome() {
  const data = useLoaderData<any>();
  const navigate = useNavigate();
  function goToChatBox() {
    let otherPerson = "69"; // this is where we set the id of the other person we want to chat with.

    navigate(`/chatbox?otherPerson=${otherPerson}`);
  }

  return (
    <div className="container">
      <div className="grid h-screen grid-flow-col gap-4">
        <div className="flex  bg-midnight">
          <div className="h-full w-full flex items-center justify-center">
            <img
              className="h-96 w-96 rounded-full"
              src={API_URL + data.user.influencerProfile.profilePicture}
              alt="profile"
            />
          </div>
        </div>

        <div className="col-span-1">
          <div className="flex grid gap-4">
            <div className="row-span-1 p-4 pt-24 pl-24">
              <button
                className="btn btn-primary btn-block"
                style={{ height: "6rem" }}
                onClick={() => {
                  goToChatBox();
                }}
              >
                CHATS
              </button>
            </div>
            <div className="action-buttons">
              <div className="row-span-1 p-4 pt-12 pl-24">
                <Link to="/profile" prefetch="intent">
                  <button
                    className="btn btn-primary btn-block"
                    style={{ height: "6rem" }}
                    name="operation"
                    value="PROFILE"
                  >
                    PROFILE
                  </button>
                </Link>
              </div>
              <div className="row-span-1 p-4 pt-16 pl-24">
                <form method="post" action="/api">
                  <button
                    className="btn btn-primary btn-block"
                    style={{ height: "6rem" }}
                    name="operation"
                    value="LOGOUT"
                  >
                    LOGOUT
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfluencerHome;
