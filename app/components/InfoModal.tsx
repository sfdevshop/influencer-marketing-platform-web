import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import type { DbInfluencer } from "~/types/ApiOps";

function InfoModal({
  closeModal,
  influencer,
}: {
  closeModal: () => void;
  influencer: DbInfluencer;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal modal-open">
        <div className="modal-box">
          <h2 className="title font-bold text-2xl">
            {influencer.fname} {influencer.lname}
          </h2>
          <p>Email : {influencer.email}</p>
          <p>Followers : {influencer.influencerProfile.followerRange}</p>
          <div className="modal-action p-4">
            {influencer.influencerProfile.instagramLink && (
              <a
                href={influencer.influencerProfile.instagramLink}
                target="_blank"
                rel="noreferrer"
              >
                <button className="btn btn-secondary btn-circle">
                  <FaInstagram size={15} />
                </button>
              </a>
            )}
            {influencer.influencerProfile.youtubeLink && (
              <a
                href={influencer.influencerProfile.youtubeLink}
                target="_blank"
                rel="noreferrer"
              >
                <button className="btn btn-secondary btn-circle">
                  <FaYoutube size={15} />
                </button>
              </a>
            )}
            {influencer.influencerProfile.twitterLink && (
              <a
                href={influencer.influencerProfile.twitterLink}
                target="_blank"
                rel="noreferrer"
              >
                <button className="btn btn-secondary btn-circle">
                  <FaTwitter size={15} />
                </button>
              </a>
            )}
          </div>
          <button className="btn btn-primary" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default InfoModal;
