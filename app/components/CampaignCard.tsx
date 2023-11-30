import { FaInfo, FaTrash, FaUpload } from "react-icons/fa6";
import { useContext, useState } from "react";
import { API_URL } from "~/constants/api";
import { UserTypes } from "~/types/ApiOps";
import type {
  ApprovalWorkflow,
  Campaign,
  DbBrand,
  DbInfluencer,
} from "~/types/ApiOps";
import { FiRefreshCcw } from "react-icons/fi";

import {
  deleteApproval,
  deleteCampaign,
  getApprovals,
  submitWorkflowPhotos,
  switchApproval,
} from "~/utils/db";
import { InfluencerCampaignsContext } from "./CampaignsInfluencer";
import { BrandCampaignsContext } from "./CampaignsBrand";
// user?.usertype === UserTypes.BRAND ? (

export function CampaignCard({
  campaign,
  user,
}: {
  campaign: Campaign;
  user: DbBrand | DbInfluencer | undefined;
}) {
  const [deleting, setDeleting] = useState<boolean>(false);
  const influencerContext = useContext(InfluencerCampaignsContext);
  const brandContext = useContext(BrandCampaignsContext);
  const [uploadPhotos, setUploadPhotos] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState<FileList | null>(null);
  const [submittingPhotos, setSubmittingPhotos] = useState(false);

  const [openApprovals, setOpenApprovals] = useState(false);
  const [openingApprovals, setOpeningApprovals] = useState(false);
  const [approvals, setApprovals] = useState<ApprovalWorkflow[] | null>([]);

  const handleOpenApprovals = async () => {
    setOpeningApprovals(true);
    const approvals = await getApprovals(brandContext.token, campaign.id);
    console.log(approvals);

    setApprovals(approvals);
    setOpeningApprovals(false);
    setOpenApprovals(true);
  };

  const handleSubmitPhotos = async () => {
    setSubmittingPhotos(true);
    await submitWorkflowPhotos(
      influencerContext.token,
      (user! as DbInfluencer).influencerProfile.id,
      campaign.id,
      uploadedPhotos
    );

    setSubmittingPhotos(false);
    setUploadPhotos(false);
    setUploadedPhotos(null);
  };

  const handleDeleteCampaign = async () => {
    setDeleting(true);

    await deleteCampaign(brandContext.token, campaign.id);
    setDeleting(false);
    brandContext.setCampaigns(
      brandContext.campaigns.filter((c) => c.id !== campaign.id)
    );
  };
  return (
    <div className="card w-full bg-white shadow-xl my-5">
      <figure>
        <img
          src={API_URL + campaign.image}
          alt="pfp"
          className="rounded-xl object-cover h-48 w-full"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{campaign.name}</h2>
        <p>{campaign.work}</p>
        {user?.usertype === UserTypes.BRAND ? (
          <div className="card-actions justify-end">
            <button
              className="btn btn-ghost hover:text-error hover:bg-transparent border-none"
              onClick={handleDeleteCampaign}
              disabled={deleting}
            >
              <FaTrash size={15} />
            </button>
            <button
              className="btn btn-circle hover:btn-secondary"
              onClick={handleOpenApprovals}
              disabled={openingApprovals}
            >
              {openApprovals ? (
                <FiRefreshCcw size={15} />
              ) : (
                <FaInfo size={15} />
              )}
            </button>

            {openApprovals && (
              <div className="card w-full bg-white shadow-xl my-5">
                <div className="card-body">
                  <h2 className="card-title">Approvals</h2>
                  <p>
                    These are the influencers that have accepted your campaign.
                  </p>
                  <div className="flex flex-col">
                    {approvals?.map((approval, id) => (
                      <details className="collapse bg-base-200" key={id}>
                        <summary className="collapse-title text-xl font-medium">
                          <div className="flex flex-row justify-between items-center">
                            <h1>
                              Submitted work from influencer{" "}
                              {approval.influencerId}
                            </h1>

                            {approval.isApproved && (
                              <span className="badge badge-secondary">
                                Approved
                              </span>
                            )}
                          </div>
                        </summary>
                        <div className="collapse-content">
                          <img
                            src={approval.documentLink}
                            alt="pfp"
                            className="h-80"
                          />

                          <div className="flex flex-row items-center mt-3 justify-end">
                            {/* delete */}
                            <button
                              className="btn btn-ghost hover:text-error hover:bg-transparent border-none"
                              onClick={async () => {
                                setApprovals(
                                  approvals?.filter(
                                    (a: ApprovalWorkflow) =>
                                      a.id !== approval.id
                                  )
                                );

                                await deleteApproval(
                                  brandContext.token,
                                  approval.id
                                );
                              }}
                            >
                              <FaTrash size={15} />
                            </button>
                            {!approval.isApproved && (
                              <button
                                className="btn btn-primary"
                                onClick={async () => {
                                  setApprovals(
                                    approvals?.map((a: ApprovalWorkflow) =>
                                      a.id === approval.id
                                        ? { ...a, isApproved: true }
                                        : a
                                    )
                                  );

                                  await switchApproval(
                                    brandContext.token,
                                    approval.id,
                                    "1"
                                  );
                                }}
                              >
                                Approve
                              </button>
                            )}
                          </div>
                        </div>
                      </details>
                    ))}
                  </div>
                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-ghost hover:text-error hover:bg-transparent border-none"
                      onClick={() => setOpenApprovals(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="card-actions justify-end">
            <button
              className="btn btn-circle hover:btn-secondary"
              onClick={() => setUploadPhotos(true)}
            >
              <FaUpload size={15} />
            </button>

            {uploadPhotos && (
              <div className="card w-full bg-white shadow-xl my-5">
                <div className="card-body">
                  <h2 className="card-title">Submit for Approval</h2>
                  <p>
                    Upload evidence for the campaign. You can upload up to 3
                    photos.
                  </p>
                  {uploadedPhotos && (
                    <div className="carousel rounded-box">
                      {Array.from(uploadedPhotos).map((photo, id) => (
                        <div key={id} className="carousel-item">
                          <img
                            src={URL.createObjectURL(photo)}
                            alt="pfp"
                            className="h-80"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  <input
                    type="file"
                    name="file"
                    id="file"
                    className="input-file"
                    multiple
                    onChange={(e) => {
                      if ((e.target.files?.length ?? 0) > 3) {
                        alert("You can only upload 3 photos");
                        return;
                      }
                      setUploadedPhotos(e.target.files);
                    }}
                  />

                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-ghost hover:text-error hover:bg-transparent border-none"
                      onClick={() => setUploadPhotos(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={handleSubmitPhotos}
                      disabled={submittingPhotos}
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
