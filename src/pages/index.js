import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import axios from "axios";

export default function Home() {
  const [imagesList, setImagesList] = useState(null);

  const getImagesList = async () => {
    axios.get("/api/data").then((response) => setImagesList(response));
  };

  useEffect(() => {
    getImagesList();
  }, []);

  return (
    <>
      <div className="flex  justify-center m-2">
        <h1 className="text-5xl  font-black ">Collage Images</h1>
        <div className="ml-5">
          <Modal />
        </div>
      </div>

      <div className="flex flex-wrap">
        {imagesList &&
          imagesList.map((imageList) => {
            return (
              <div
                className="max-w-sm rounded overflow-hidden shadow-lg m-2"
                key={imageList.key}
              >
                <img
                  className="w-full"
                  src={imageList.src}
                  alt={imageList.description}
                ></img>
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">Description</div>
                  <p className="text-gray-700 text-base">
                    {imageList.description}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
