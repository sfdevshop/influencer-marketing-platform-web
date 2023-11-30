import { useNavigate } from "@remix-run/react";
import { API } from "~/constants/api";

export default function CampaignHandler({
  notif_id,
  token,
}: {
  notif_id: string;
  token: string;
}) {
  const navigate = useNavigate();
  const acceptInvite = async () => {
    console.log("accept invite");
    const response = await fetch(API.ACCEPT_CAMPAIGN + `${notif_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(token),
      },
    });
    const data = await response.json();
    console.log(data);
    navigate("/campaigns");
  };

  const declineInvite = async () => {
    console.log("decline invite");

    const response = await fetch(API.DECLINE_CAMPAIGN + `${notif_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(token),
      },
    });
    const data = await response.json();
    navigate("/dashboard");
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex justify-center card w-96 bg-neutral text-neutral-content">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Campaign Invite!</h2>
          <p>Join campaign with ID: {notif_id}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={acceptInvite}>
              Accept
            </button>
            <button
              className="btn btn-secondary btn-ghost"
              onClick={declineInvite}
            >
              Deny
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
