import type { DbInfluencer } from "~/types/ApiOps";

export interface CampaignsInfluencerProps {
  userId: string;
  token: string;
  user: DbInfluencer;
}
export function CampaignsInfluencer({
  userId,
  token,
  user,
}: CampaignsInfluencerProps) {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="max-w-xl bg-red-300">asdf</div>
    </div>
  );
}
