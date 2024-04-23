import LOGO from "../images/ppssf_logo.png";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import APIInstance from "../API";
import { useDispatch , useSelector } from "react-redux";
import { IS_LOADING, USER_INFO } from "../redux/action";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const LogIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const isLoading = useSelector((data)=> data.isLoading)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log("------------------", data);

    // try {
    //   dispatch({ type: IS_LOADING, payload: true });
    //   const logIn = await APIInstance.post("/auth/signupAdmin", data);
    //   if (logIn.data.success) {
    //     dispatch({ type: IS_LOADING, payload: false });
    //     dispatch({ type: USER_INFO, payload: logIn.data.data });
    //     localStorage.setItem("authtoken", logIn.data.data.token);
    //     toast.success(logIn.data.message);
    //     navigate("/");
    //   }
    // } catch (error) {
    //   toast.error(error.response.data.message);
    //   console.log("login error", error);
    //   dispatch({ type: IS_LOADING, payload: false });
    // }
    try {
      dispatch({ type: IS_LOADING, payload: true });
      console.log(data, "response--------");
      const response = await axios.post(
        
        "https://helpdesk-latest.onrender.com/user_accounts/login/",
        data,
        {
          headers: {
            "Content-Type": "application/json", // Set appropriate content type for JSON data
          },
        }
      );

      const accessToken = response.data.access;
      const refreshToken = response.data.refresh;
      const role = response.data.role;
      localStorage.setItem("authtoken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      dispatch({ type: IS_LOADING, payload: false });
      console.log("response---", response);


      if(accessToken){
        console.log("userData--" , accessToken)
        const userData = await axios.get(
          "https://helpdesk-latest.onrender.com/user_accounts/accounts/1/",
          {
            headers: {
              "Content-Type": "application/json", // Set appropriate content type for JSON data,
              Authorization: `Token ${accessToken}`
            },
          }
        );
        dispatch({ type: USER_INFO, payload:userData.data });

        if(userData?.data?.role == "parent"||"staff"){
          navigate("/message")
        }

      }

      toast.success("logged in");


      navigate("/")

    } catch (error) {
      dispatch({ type: IS_LOADING, payload: false });

      console.log(error ,"efververver")
      toast.error(error?.response?.data?.error||error?.response?.data?.email[0]);
      console.log("login error", error?.response?.data?.email[0]);
    }
  };
  return (
    <>
      <div className="h-screen bg-gray-50 relative flex justify-center items-center">
        <div className="w-full flex text-center justify-center items-center px-3 bottom-80">
          <form
            className="bg-white shadow w-[500px] border rounded-lg h-auto py-5 px-8 relative"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col items-center mt-0">
              <div className="flex flex-col text-left">
                <img src={LOGO} width={"80px"} alt="ppssf logo" />
              </div>
              <div>
                <p className="text-2xl font-bold mt-3">user | admin</p>
              </div>
              <div className="flex flex-col w-full text-left mt-3">
                <label className="text-lg ml-1 font-medium text-gray-900">
                  email
                </label>
                <input
                  className="p-3 w-full mt-1 bg-gray-50 border border-gray-300 rounded"
                  type="text"
                  placeholder="enter email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-[red]">email is required</span>
                )}
              </div>
              <div className="flex flex-col w-full text-left mt-3">
                <label className="text-lg ml-1 font-medium text-gray-900">
                  password
                </label>
                <input
                  className="p-3 w-full mt-1 bg-gray-50 border border-gray-300 rounded"
                  type="password"
                  placeholder="enter password"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="text-[red]">password is required</span>
                )}
              </div>
              <div>

                {console.log(isLoading ,"ewgrghwsrthaewfs")}
                <button disabled={isLoading} className="px-12 disabled:bg-blue-200 py-3 mt-4 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm">
                  sign in
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
