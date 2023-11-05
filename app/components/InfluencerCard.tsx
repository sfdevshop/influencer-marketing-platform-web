import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faInfo } from "@fortawesome/free-solid-svg-icons";
import { Link } from "@remix-run/react";
import { API_URL } from "~/constants/api";
import { useState } from "react";
import InfoModal from "./InfoModal";
import type { DbInfluencer } from "~/types/ApiOps";
import { availableCategories } from "~/constants/categories";

interface InfluencerCardProps {
  influencer: DbInfluencer;
}

function InfluencerCard({ influencer }: InfluencerCardProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleInfoCLick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <figure className="px-5 pt-5">
        <img
          src={
            influencer.influencerProfile.profilePicture
              ? API_URL + influencer.influencerProfile.profilePicture
              : "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
          }
          alt="pfp"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-desc text-xl font-bold">
          {influencer.fname} {influencer.lname}
        </h2>
        <div className="card-tags justify-center">
          {(influencer.tags ?? []).map((tag, id) => (
            <div className="badge badge-secondary px-1 mr-2 text-sm" key={id}>
              {availableCategories[tag.toLowerCase()]}
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
          <Link to={`/chatbox?otherPerson=${influencer.id}`}>
            <button className="btn btn-circle btn-primary">
              <FontAwesomeIcon icon={faComment} size="xl" />
            </button>
          </Link>

          {isModalOpen && (
            <InfoModal closeModal={closeModal} influencer={influencer} />
          )}
        </div>
      </div>
    </div>
  );
}

export default InfluencerCard;
