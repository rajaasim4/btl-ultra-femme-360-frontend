import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { inputFieldContainerStyles, inputFieldStyles } from "../utils/styles";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const dummyEmail = "admin@admin.com";
  const dummyPassword = "password123";

  const handleLogin = () => {
    if (email === dummyEmail && password === dummyPassword) {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/admin");
    } else {
      setErrorMsg("Invalid email or password");
    }
  };

  return (
    <div
      dir="rtl"
      className="font-['Assistant'] bg-[url('/bg.jpg')] bg-no-repeat bg-cover min-w-full min-h-screen flex items-center justify-center overflow-hidden pt-6 pb-16 md:pt-12 md:pb-6 relative"
    >
      <div className="bg-transparent p-8 md:px-20 md:py-16 border-8 border-white rounded-2xl w-11/12 md:w-10/12 max-w-screen-2xl relative">
        <div className="bg-white/85 p-4 rounded-2xl items-center min-h-[700px] flex flex-col">
          <img
            src="/logo.webp"
            className="max-w-52 min-w-36 md:max-w-60 md:max-h-none mt-4 md:mt-0"
            alt="btl-ultra-femme-360 Logo"
          />
          <h2 className="font-semibold text-3xl">כְּנִיסָה לַמַעֲרֶכֶת</h2>

          <div className="mt-10 w-full flex flex-col justify-center items-center gap-5">
            <div className="w-5/12">
              <label htmlFor="email" className="font-semibold text-xl">
                הזן אימייל
              </label>
              <div dir="" className={inputFieldContainerStyles}>
                <input
                  placeholder="הזן אימייל"
                  id="email"
                  type="email"
                  className={inputFieldStyles}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="w-5/12">
              <label htmlFor="password" className="font-semibold text-xl">
                הזן סיסמה
              </label>
              <div dir="" className={inputFieldContainerStyles}>
                <input
                  placeholder="הזן סיסמה"
                  id="password"
                  type="password"
                  className={inputFieldStyles}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              onClick={handleLogin}
              className="bg-themeBlue w-44 text-white rounded-md px-4 py-2"
            >
              לְהַגִישׁ
            </button>
          </div>
          {errorMsg && (
            <p className="text-red-500 font-medium mt-2">{errorMsg}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
