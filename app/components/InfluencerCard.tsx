import { Influencer } from "~/types/ApiOps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faInfo } from "@fortawesome/free-solid-svg-icons";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getUserSession } from "~/utils/userSession";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { API } from "~/constants/api";
import { useState } from "react";
import InfoModal from "./InfoModal";

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
  const data = useLoaderData<any>();
  const [influencerInfo, setInfluencerInfo] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleInfoCLick = () => {
    console.log(API.GET_INFLUENCER_INFO + influencer.id);

    fetch(API.GET_INFLUENCER_INFO + influencer.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(data.token),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setInfluencerInfo(data.data);
        setIsModalOpen(true);
      });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleMessageClick = (id: number) => {
    navigate(`/chatbox?otherPerson=${influencer.id}`);
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
        <div className="card-tags justify-center">
          {influencer.tags.map((tag, id) => (
            <div className="badge badge-secondary px-1 mr-2 text-sm" key={id}>
              {tag}
            </div>
          ))}
        </div>
        <div className="card-actions justify-center">
          <button
            className="btn btn-circle btn-primary"
            onClick={handleInfoCLick}
          >
            <FontAwesomeIcon icon={faInfo} size="xl" />
          </button>
          <button
            className="btn btn-circle btn-primary"
            onClick={() => {
              handleMessageClick(influencer.id);
            }}
          >
            <FontAwesomeIcon icon={faEnvelope} size="xl" />
          </button>

          {isModalOpen && (
            <InfoModal
              closeModal={closeModal}
              influencerInfo={influencerInfo}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default InfluencerCard;
