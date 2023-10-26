import type { LoaderFunction } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { getUserSession } from "~/utils/userSession";
import type { DbInfluencer } from "~/types/ApiOps";
import { UserTypes } from "~/types/ApiOps";
import { getUser } from "~/utils/db";

export const loader: LoaderFunction = async (args) => {
  const { userId, token } = await getUserSession(args);
  if (!userId || !token) {
    return redirect("/log-in");
  }

  const data = await getUser(token);
  // TODO: change to DbBrand
  const user = data.data as DbInfluencer;

  if (user.usertype === UserTypes.INFLUENCER) {
    return redirect("/influencer-home");
  }

  return json({ user, userId, token });
};

function BrandHome() {
  const data = useLoaderData<any>();
  const navigate = useNavigate();
  function goToChatBox() {
    let otherPerson = "16"; // this is where we set the id of the other person we want to chat with.

    navigate(`/chatbox?otherPerson=${otherPerson}`);
  }

  return (
    <div className="container">
      <div className="grid h-screen grid-flow-col gap-4">
        <div className="flex  bg-midnight">
          <div className="h-full w-full flex items-center justify-center">
            profilePicture
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
            <form method="post" action="/api">
              <div className="action-buttons">
                <div className="row-span-1 p-4 pt-12 pl-24">
                  <button
                    className="btn btn-primary btn-block"
                    style={{ height: "6rem" }}
                    name="operation"
                    value="DISCOVER-INFLUENCERS"
                  >
                    Discover Influencers
                  </button>
                </div>
                <div className="row-span-1 p-4 pt-16 pl-24">
                  <button
                    className="btn btn-primary btn-block"
                    style={{ height: "6rem" }}
                    name="operation"
                    value="LOGOUT"
                  >
                    LOGOUT
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrandHome;
