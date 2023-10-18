import { Influencer } from "~/types/ApiOps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faInfo } from "@fortawesome/free-solid-svg-icons";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getUserSession } from "~/utils/userSession";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { API } from "~/constants/api";

export const loader: LoaderFunction = async (args) => {
  const { userId, token } = await getUserSession(args);
  if (!userId || !token) {
    return redirect("/log-in");
  }

  return json({ userId, token });
};

interface InfluencerCardProps {
  influencer: Influencer;
}

function InfluencerCard({ influencer }: InfluencerCardProps) {
  // const datas = useLoaderData<any>();

  const handleTextCLick = () => {
    console.log("text");

    // const query = API.CHAT + `otherPerson=${influencer.id}`;
    // console.log(query);
    // console.log(data.token);
    // redirect(API.CHAT + `otherPerson=${influencer.id}`, {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + String(data.token),
    //   },
    // });

    // send a GET request to /api/text-influencer
    // with the influencer id
    // and the user id
    // fetch(API.CHAT + `otherPerson=${influencer.id}`, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + String(data.token),
    //   },
    // });

    //   .then((response) => {
    //     console.log(response);
    //     return response.json();
    //   })
    //   .then((data) => {
    //     // convert data to obj
    //     console.log(data);
    //   });
  };

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <figure className="px-5 pt-5">
        <img
          src="https://cdn.vox-cdn.com/thumbor/VWRbS9TmU4jzd1gUbC2nN4l85Pc=/0x0:2184x1372/1200x800/filters:focal(984x384:1332x732)/cdn.vox-cdn.com/uploads/chorus_image/image/72025507/GettyImages_1280349927.0.jpg"
          alt="pfp"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-desc text-xl font-bold">
          {influencer.fname} {influencer.lname}
        </h2>
        <p>{influencer.followers}</p>
        <div className="card-tags justify-center">
          {influencer.tags.map((tag, id) => (
            <div className="badge badge-secondary px-1 mr-2 text-sm" key={id}>
              {tag}
            </div>
          ))}
        </div>
        <div className="card-actions justify-center">
          <button className="btn btn-circle btn-primary">
            <FontAwesomeIcon icon={faInfo} size="xl" />
          </button>
          <button
            className="btn btn-circle btn-primary"
            onClick={handleTextCLick}
          >
            <FontAwesomeIcon icon={faEnvelope} size="xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default InfluencerCard;
