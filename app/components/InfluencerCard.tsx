// InfluencerCard.tsx

import React from "react";
import { Influencer } from "~/types/ApiOps";

interface InfluencerCardProps {
  influencer: Influencer; // Replace 'any' with your actual influencer data type
}

function InfluencerCard({ influencer }: InfluencerCardProps) {
  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <figure>
        <img
          src="https://cdn.vox-cdn.com/thumbor/VWRbS9TmU4jzd1gUbC2nN4l85Pc=/0x0:2184x1372/1200x800/filters:focal(984x384:1332x732)/cdn.vox-cdn.com/uploads/chorus_image/image/72025507/GettyImages_1280349927.0.jpg"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {influencer.fname} {influencer.lname}
        </h2>
        <p>{influencer.followers}</p>
        <div className="card-actions justify-end">
          {influencer.tags.map((tag, id) => (
            <div className="badge badge-outline" key={id}>
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InfluencerCard;
