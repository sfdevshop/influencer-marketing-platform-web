import { API_URL } from "~/constants/api";
import type { DbInfluencer } from "~/types/ApiOps";

export const InfluencerSmallCard = ({
  influencer,
}: {
  influencer: DbInfluencer;
}) => {
  return (
    <div className="stats shadow w-full my-1">
      <div className="stat">
        <div className="stat-value">{influencer.fname}</div>
        <div className="stat-title">{influencer.lname}</div>

        <div className="stat-figure text-secondary">
          <div className="avatar">
            <div className="w-16 rounded-full">
              <img
                src={
                  influencer.influencerProfile.profilePicture
                    ? API_URL + influencer.influencerProfile.profilePicture
                    : "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                }
                alt="pfp"
                className="rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* <div className="stat-title">Tasks done</div> */}
        {/* <div className="stat-desc text-secondary">31 tasks remaining</div> */}
      </div>
    </div>
  );
};
