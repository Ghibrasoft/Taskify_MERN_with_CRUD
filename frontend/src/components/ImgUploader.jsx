import React, { useRef } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import useZustandStore from "../store/ZustandStore";
import { useCookies } from "react-cookie";
import Resizer from "react-image-file-resizer";

export default function ImgUploader({ updateProfileImg }) {
  const inputFileRef = useRef(null);
  const userID = window.localStorage.getItem("userID");
  const [cookies, _] = useCookies(["access_token"]);
  const { getCurrUser } = useZustandStore();

  function handleInputFile(e) {
    const file = e.target.files?.[0];
    if (file) {
      new Promise((resolve) => {
        Resizer.imageFileResizer(
          file,
          300,
          300,
          "JPEG",
          80,
          0,
          (uri) => {
            toast.promise(
              updateProfileImg(uri, userID)
                .then(() => {
                  getCurrUser(cookies);
                })
                .catch((error) => {
                  console.error(error);
                }),
              {
                pending: "Uploading...",
                success: "Avatar uploaded",
                error: "Upload failed",
              }
            );
            resolve(uri);
          },
          "base64"
        );
      });
    }
  }

  return (
    <form
      action=""
      onClick={() => {
        document.querySelector(".input-file").click();
      }}
      className="absolute bg-white rounded-full bottom-0 right-0 translate-x-4 translate-y-4"
    >
      <input
        type="file"
        name="avatar"
        accept="/image/*"
        ref={inputFileRef}
        onChange={handleInputFile}
        className="input-file absolute inset-0 opacity-0 -z-10"
      />
      <label htmlFor="avatar" className="cursor-pointer text-yellow-400">
        <AiFillPlusCircle size={40} />
      </label>
    </form>
  );
}
