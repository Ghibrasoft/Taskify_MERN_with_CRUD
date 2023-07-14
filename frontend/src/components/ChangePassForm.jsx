import React, { useRef } from "react";
import { toast } from "react-toastify";
import useZustandStore from "../store/ZustandStore";
import { useCookies } from "react-cookie";

export default function ChangePassForm({ setShowChangePass }) {
  const formRef = useRef(null);
  const [_, setCookies] = useCookies(["access_token"]);
  const { changePassword } = useZustandStore();

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const passwordData = Object.fromEntries(formData);

    try {
      if (passwordData.oldPass === passwordData.newPass) {
        toast.warning("Passwords must be different!");
        return;
      }

      const credentialsData = {
        oldPass: passwordData.oldPass,
        newPass: passwordData.newPass,
        userID: window.localStorage.getItem("userID"),
      };

      const res = await changePassword(credentialsData);
      if (res.status === 200) toast.success("Password changed successfully!");
      setCookies("access_token", res.data.newToken);
      setShowChangePass(false);
    } catch (error) {
      // console.error(error);

      if (error.response && error.response.status === 401) {
        toast.error("Invalid current password!");
      } else {
        toast.error("Password changing failed due to an internal server error");
      }
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <input
          type="text"
          name="oldPass"
          placeholder="Current password..."
          required
          className="border rounded-md text-sm px-2 py-1 outline-none shadow-sm focus:shadow-md"
        />
        <input
          type="text"
          name="newPass"
          placeholder="New password..."
          required
          className="border rounded-md text-sm px-2 py-1 outline-none shadow-sm focus:shadow-md"
        />
      </div>
      <div className="flex gap-1">
        <button
          type="submit"
          className="w-full bg-blue-500 text-white text-sm px-2 py-1 rounded-md hover:bg-blue-700 transition-colors"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => setShowChangePass(false)}
          className="w-full bg-gray-500 text-white text-sm px-2 py-1 rounded-md hover:bg-gray-700 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
