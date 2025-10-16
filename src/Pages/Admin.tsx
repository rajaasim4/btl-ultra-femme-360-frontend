import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Admin = () => {
  const API_BASE_URL =
    import.meta.env.VITE_API_URL ||
    "https://btl-ultra-femme-360-backend.vercel.app";

  const ZAPIER_WEBHOOK_URL =
    "https://hooks.zapier.com/hooks/catch/12961765/2lfbo4h/";
  const [error, setError] = useState("");
  interface User {
    _id: number;
    fullName: string;
    phoneNumber: string;
    status: boolean;
    isSendToZapier: boolean;
    stepTwo?: string;
    stepThree?: string;
    stepFour?: string;
    stepFive?: string;
    stepSix?: string;
    stepSeven?: string;
    pageUrl?: string;
  }

  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/get-all-users`);
        // setData(response.data);
        console.log("this is all data", response?.data);
        const filteredUsers = response.data.filter(
          (user: any) => user.status === false
        );
        setData(filteredUsers);
        console.log("this is to show", data);
      } catch (error) {
        setError("Error fetching data"); // Handle the error
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Stop loading when done
      }
    };

    fetchData();
  }, []);
  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  const formatPhoneNumber = (phoneNumber: string) => {
    if (phoneNumber.startsWith("05")) {
      return `+972${phoneNumber.substring(1)}`;
    }
    if (phoneNumber.startsWith("972")) {
      return `+972${phoneNumber.substring(3)}`;
    }
    return phoneNumber;
  };

  const updateUserData = async (num: string) => {
    const phone = formatPhoneNumber(num);
    const userData = {
      phoneNumber: phone,
      status: false,
      isSendToZapier: true,
    };
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/update-data`,
        userData
      );
      return response.data;
    } catch (error) {
      // throw error.response.data;
      console.log("Error Occured While Updating the Data");
    }
  };

  const addToZapier = async (userId: number) => {
    try {
      // Find the user by ID from the `data` array
      const user = data.find((item) => item._id === userId);

      if (!user) {
        toast.error("User not found!");
        return;
      }
      const {
        fullName,
        stepTwo,
        stepThree,
        stepFour,
        stepFive,
        stepSix,
        stepSeven,
        phoneNumber,
        pageUrl,
        status,
      } = user;
      const zapierData = {
        fullName,
        stepTwo,
        stepThree,
        stepFour,
        stepFive,
        stepSix,
        stepSeven,

        phoneNumber,
        pageUrl,
        status: status === false ? "Unverified" : "Verified",
      };

      const response = await fetch(ZAPIER_WEBHOOK_URL, {
        method: "POST",
        body: JSON.stringify(zapierData),
      });
      // const response = await axios.post(ZAPIER_WEBHOOK_URL, zapierData);

      // Check if the response from Zapier is successful
      if (response.status === 200) {
        updateUserData(user?.phoneNumber);
        toast.success(`User ${user.fullName} Sended to Zapier!`);
        setData((prevData) =>
          prevData.map((item) =>
            item._id === userId ? { ...item, isSendToZapier: true } : item
          )
        );
      } else {
        toast.error("Failed to send data to Zapier.");
      }
    } catch (error) {
      console.error("Error sending data to Zapier:", error);
      toast.error("An error occurred while sending data to Zapier.");
    }
  };
  return (
    <div
      dir="rtl"
      className="font-['Assistant'] bg-[url('/bg.jpg')] bg-no-repeat bg-cover min-w-full min-h-screen flex items-center justify-center overflow-hidden pt-6 pb-16 md:pt-12 md:pb-6 relative"
    >
      <div className="bg-transparent p-8 lg:px-20 md:py-16 border-8 border-white rounded-2xl w-11/12 md:w-10/12 max-w-screen-2xl relative">
        <div className="bg-white/85 p-4 rounded-2xl items-center  min-h-[700px] flex flex-col relative w-full">
          <button
            className="bg-themeBlue text-white rounded-md w-32 px-4 py-2 lg:absolute static mx-auto top-4 right-4"
            onClick={logout}
          >
            התנתק
          </button>
          <img
            src="/logo.webp"
            className="max-w-52 min-w-36 md:max-w-60 md:max-h-none mt-4 md:mt-0"
            alt="btl-ultra-femme-360 Logo"
          />

          <h2 className="font-semibold text-3xl">נתוני לקוחות</h2>
          {/* <div className="">
            <button>All</button>
            <button>Verified</button>
            <button></button>
          </div> */}

          {loading ? (
            <p className="text-4xl text-center mt-20">טוען נתונים...</p>
          ) : error ? (
            <p className="text-4xl text-center mt-20 text-red-600">{error}</p>
          ) : data?.length <= 0 ? (
            <p className="text-4xl text-center mt-20">לא נמצאו נתונים</p>
          ) : (
            <div className="mt-10 w-full  h-[400px] overflow-y-auto">
              <div className="xl:flex hidden justify-center text-right gap-5 mx-auto">
                <div className="font-semibold xl:text-xl text-base w-14">
                  סר.
                </div>
                <div className="font-semibold xl:text-xl text-base w-44">
                  שֵׁם
                </div>
                <div className="font-semibold xl:text-xl text-base w-40">
                  מספר טלפון
                </div>
                <div className="font-semibold xl:text-xl text-base w-28">
                  סטָטוּס
                </div>
                <div className="font-semibold xl:text-xl text-base w-32"></div>
              </div>

              <div className="w-full grid xl:grid-cols-1 gap-y-3 sm:grid-cols-2 grid-cols-1 ">
                {data?.map((item, ind) => (
                  <div
                    key={ind}
                    className={`flex justify-center flex-col xl:flex-row text-right gap-5 xl:border-b border-b-black xl:w-max w-full py-3 mx-auto place-items-center ${
                      ind % 2 === 0
                        ? "md:border-l-black md:border-l xl:border-l-0 xl:pl-0 pl-3 "
                        : "xl:pr-0 pr-3"
                    }`}
                  >
                    <div className="font-semibold xl:block flex justify-between xl:text-xl text-base xl:w-14 w-full">
                      <span className="xl:hidden block ">סר.</span>
                      <span>{ind + 1}</span>
                    </div>
                    <div className="font-semibold xl:block flex justify-between xl:text-xl text-base xl:w-44 w-full">
                      <span className="xl:hidden block ">שֵׁם</span>
                      <span>{item.fullName}</span>
                    </div>
                    <div className="font-semibold xl:block flex justify-between xl:text-xl text-base xl:w-40 w-full">
                      <span className="xl:hidden block ">מספר טלפון</span>
                      <span>{item.phoneNumber}</span>
                    </div>
                    <div className="font-semibold xl:block flex justify-between xl:text-xl text-base xl:w-28 w-full">
                      <span className="xl:hidden block ">סטָטוּס</span>
                      <span>
                        {item.status === false ? "Unverified" : "Verified"}
                      </span>
                    </div>
                    <button
                      disabled={item?.isSendToZapier}
                      className={`bg-themeBlue text-white rounded-md px-4 py-2 xl:w-36 w-28 ${
                        item?.isSendToZapier
                          ? "bg-opacity-45 cursor-not-allowed"
                          : ""
                      }`}
                      onClick={() => addToZapier(item?._id)} // Dummy function for demo
                    >
                      שלח לזאפייר
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
