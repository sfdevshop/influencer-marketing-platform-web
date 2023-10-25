import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faYoutube,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

function InfoModal({ closeModal, influencerInfo }: any) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal modal-open">
        <div className="modal-box">
          <h2 className="title font-bold text-2xl">
            {influencerInfo.fname} {influencerInfo.lname}
          </h2>
          <p>Email : {influencerInfo.email}</p>
          <p>Followers : {influencerInfo.followers}</p>
          <div className="modal-action p-4">
            <a
              href={influencerInfo.instagramLink}
              target="_blank"
              rel="noreferrer"
            >
              <button className="btn btn-secondary btn-circle">
                <FontAwesomeIcon icon={faInstagram} size="xl" />
              </button>
            </a>
            <a
              href={influencerInfo.youtubeLink}
              target="_blank"
              rel="noreferrer"
            >
              <button className="btn btn-secondary btn-circle">
                <FontAwesomeIcon
                  icon={faYoutube}
                  size="xl"
                  href={influencerInfo.youtubeLink}
                />
              </button>
            </a>
            <a
              href={influencerInfo.twitterLink}
              target="_blank"
              rel="noreferrer"
            >
              <button className="btn btn-secondary btn-circle">
                <FontAwesomeIcon
                  icon={faTwitter}
                  size="xl"
                  href={influencerInfo.twitterLink}
                />
              </button>
            </a>
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
