import { Fragment, useContext, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { availableCategories } from "~/constants/categories";
import { FaCheck, FaChevronUp } from "react-icons/fa6";
import { BrandCampaignsContext } from "./CampaignsBrand";
import { createCampaign, getInfluencersForCampaign } from "~/utils/db";
import type { DbInfluencer } from "~/types/ApiOps";
import { InfluencerSmallCard } from "./InfluencerSmallCard";

export function CreateCampaignModal() {
  const context = useContext(BrandCampaignsContext);
  const [step, setStep] = useState(1);
  const [campaign, setCampaign] = useState<any>({});
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [fetchingInfluencers, setFetchingInfluencers] = useState(false);
  const [fetchedInfluencers, setFetchedInfluencers] = useState<DbInfluencer[]>(
    []
  );
  const [selectedInfluencerIds, setSelectedInfluencerIds] = useState<number[]>(
    []
  );
  const [picture, setPicture] = useState<string | null>(null);

  const [pictureFile, setPictureFile] = useState<File | null>(null);
  const [creatingCampaign, setCreatingCampaign] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setCampaign({ ...campaign, [name]: value });
  };

  const handleCampaignCreation = async (e: any) => {
    e.preventDefault();
    setCreatingCampaign(true);
    const newCampaign = await createCampaign(
      context.token,
      campaign,
      selectedInfluencerIds,
      pictureFile!
    );

    setCreatingCampaign(false);
    context.setCampaigns([...context.campaigns, newCampaign]);

    // @ts-ignore
    document.getElementById("create-new-campaign").close();
    setStep(1);
    setCampaign({});
    setSelectedCategories([]);
    setPicture(null);
    setPictureFile(null);
    setSelectedInfluencerIds([]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (step === 1) {
      setFetchingInfluencers(true);
      const inf = await getInfluencersForCampaign(
        context.token,
        selectedCategories,
        campaign.budgetPerInfluencer
      );
      setFetchedInfluencers(inf);
      setStep(2); // Move to the next step
      setFetchingInfluencers(false);
    }
  };

  return (
    <dialog id="create-new-campaign" className="modal">
      <div className="modal-box">
        <h2 className="font-black text-2xl">Create a new campaign</h2>
        <h3 className="font-medium text-lg">
          {step === 1 ? "Basic information" : "Select influencers"}
        </h3>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
        {fetchingInfluencers ? (
          <div className="flex justify-center items-center">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
          </div>
        ) : (
          <>
            {step === 1 ? (
              <form onSubmit={handleSubmit}>
                {/* The form fields */}
                {/* required field to upload jpg or png */}
                <div className="flex flex-row">
                  <label className="font-bold text-lg">Image:</label>
                  <div>
                    {picture && (
                      <img
                        src={picture}
                        alt="campaign"
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    )}
                    <input
                      type="file"
                      name="file"
                      required
                      onChange={(e) => {
                        // @ts-ignore
                        const file = e.target.files[0];
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onloadend = () => {
                          setPictureFile(file);
                          setPicture(reader.result as string);
                        };
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label className="font-bold text-lg">
                    Name of the campaign:
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="input input-bordered w-full"
                    required
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="font-bold text-lg">Description:</label>
                  <textarea
                    name="work"
                    required
                    className="textarea textarea-bordered w-full"
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div>
                  <label className="font-bold text-lg">Dos (optional):</label>
                  <textarea
                    name="postDos"
                    className="textarea textarea-bordered w-full"
                    rows={1}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div>
                  <label className="font-bold text-lg">
                    Don'ts (optional):
                  </label>
                  <textarea
                    name="postDonts"
                    rows={1}
                    className="textarea textarea-bordered w-full"
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div>
                  <label className="font-bold text-lg">Linkback URL</label>
                  <input
                    type="text"
                    name="linkBackURL"
                    className="input input-bordered w-full"
                    required
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-row">
                  <div>
                    <label className="font-bold text-lg">Start Date:</label>
                    <input
                      type="date"
                      name="startDate"
                      className="input input-bordered w-full"
                      required
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label className="font-bold text-lg">End Date:</label>
                    <input
                      type="date"
                      className="input input-bordered w-full"
                      name="endDate"
                      required
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-lg">
                    Budget per Influencer:
                  </label>
                  <input
                    type="number"
                    name="budgetPerInfluencer"
                    className="input input-bordered w-full"
                    min={0}
                    required
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="font-bold text-lg">Minimum Reach:</label>
                  <input
                    type="number"
                    name="minReach"
                    min={0}
                    required
                    className="input input-bordered w-full"
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="font-bold text-lg">
                    Number of Influencers:
                  </label>
                  <input
                    type="number"
                    name="numInfluencers"
                    min={0}
                    className="input input-bordered w-full"
                    required
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-full">
                  <label className="font-bold text-lg">Categories:</label>
                  <Listbox
                    value={selectedCategories}
                    onChange={setSelectedCategories}
                    multiple
                  >
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">
                          {selectedCategories.length === 0
                            ? "Select"
                            : selectedCategories
                                .map(
                                  (category: string) =>
                                    availableCategories[category.toLowerCase()]
                                )
                                .join(", ")}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <FaChevronUp />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        // @ts-ignore
                        className="mb-1 bottom-full"
                      >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                          {Object.entries(availableCategories).map(
                            ([key, displayName], personIdx) => (
                              <Listbox.Option
                                key={personIdx}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active
                                      ? "bg-amber-100 text-amber-900"
                                      : "text-gray-900"
                                  }`
                                }
                                value={key.toUpperCase()}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {displayName}
                                    </span>
                                    {selected ? (
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                        <FaCheck />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            )
                          )}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="btn btn-primary mt-5">
                    {step === 1 ? "Next Step" : "Create"}
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <div className="form-control">
                  {fetchedInfluencers.map((influencer, id) => (
                    <div
                      key={id}
                      className="flex flex-row justify-between items-center"
                    >
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedInfluencerIds([
                              ...selectedInfluencerIds,
                              influencer.id,
                            ]);
                          } else {
                            setSelectedInfluencerIds(
                              selectedInfluencerIds.filter(
                                (id) => id !== influencer.id
                              )
                            );
                          }
                        }}
                        checked={selectedInfluencerIds.includes(influencer.id)}
                        className="checkbox checkbox-secondary h-[4rem] w-[4rem] mr-2"
                      />
                      <InfluencerSmallCard influencer={influencer} />
                    </div>
                  ))}
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="btn btn-secondary mt-5"
                      disabled={
                        selectedInfluencerIds.length === 0 || creatingCampaign
                      }
                      onClick={handleCampaignCreation}
                    >
                      {creatingCampaign ? "Creating..." : "Create Campaign"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </dialog>
  );
}
