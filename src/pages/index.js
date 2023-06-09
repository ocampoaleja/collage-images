import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Modal from "../components/Modal";

export default function Home() {
  const [imagesList, setImagesList] = useState([]);

  const getImagesList = async () => {
    try {
      const response = await axios.get("/api/data");
      //const responsePost = await axios.post("/api/data");
      setImagesList(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error, "error list");
    }
  };

  useEffect(() => {
    getImagesList();
  }, []);

  console.log(imagesList, "imagesList");

  return (
    <>
      <div className="flex justify-center mb-5">
        <h1 className="text-5xl  font-black">Collage Images</h1>
        <div className="ml-8">
          <Modal getImagesList={getImagesList} />
        </div>
      </div>

      <div className="flex flex-wrap">
        {imagesList &&
          imagesList.map((imageList) => {
            return (
              <div
                className="max-w-sm rounded overflow-hidden shadow-lg m-2"
                key={imageList.id}
              >
                <Image
                  className="w-full"
                  src={imageList.src}
                  alt={imageList.description}
                  width={100}
                  height={100}
                />
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
