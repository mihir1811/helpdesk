import { useDispatch, useSelector } from "react-redux";
import APIInstance from "../API";
import { Card } from "../component/Card";
import { useForm } from "react-hook-form";
import { IS_LOADING } from "../redux/action";
import toast from "react-hot-toast";

export const AddNewDriver = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { isLoading } = useSelector((state) => state);
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    try {
      console.log("dataaaaaaaaaa", data);
      dispatch({ type: IS_LOADING, payload: true });
      const datas = new FormData();
      datas.append("name", data.name);
      datas.append("accountType", "DRIVER");
      datas.append("fatherName", data.fatherName);
      datas.append("currentAddress", data.currentAddress);
      datas.append("permanentAddress", data.permanentAddress);
      datas.append("mobileNumber", data.mobileNumber);
      datas.append("email", data.email);
      if (data.drivingLicense.length)
        datas.append("drivingLicense", data.drivingLicense[0]);
      if (data.panCard.length) datas.append("panCard", data.panCard[0]);
      if (data.aadharCard.length)
        datas.append("aadharCard", data.aadharCard[0]);
      datas.append("bankBranch", data.bankBranch);
      datas.append("bankName", data.bankName);
      datas.append("beneficiaryName", data.beneficiaryName);
      datas.append("accountNumber", data.accountNumber);
      datas.append("ifscCode", data.ifscCode);
      datas.append("securityDeposit", data.securityDeposit);
      if (data.securityDepositCheque.length)
        datas.append("securityDepositCheque", data.securityDepositCheque[0]);
      datas.append("emergencyContact[name]", data.emergencyContact.name);
      datas.append("emergencyContact[address]", data.emergencyContact.address);
      datas.append(
        "emergencyContact[mobileNumber]",
        data.emergencyContact.mobileNumber
      );
      datas.append(
        "emergencyContact[relationship]",
        data.emergencyContact.relationship
      );

      const addDriver = await APIInstance.post("/api/auth/signup", datas);
      if (addDriver.data.success) {
        dispatch({ type: IS_LOADING, payload: false });
        console.log("data", addDriver.data);
        reset();
        toast.success("driver added successfully.");
      }
    } catch (error) {
      console.log("error", error);
      dispatch({ type: IS_LOADING, payload: false });
      toast.error("something went wrong.");
    }
  };

  return (
    <>
      <div className="mt-2">
        <Card>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-8">
              <div className="w-2/4">
                <div className="flex flex-col">
                  <label className="text-[14px] font-bold mb-1">
                    Driver's Name
                  </label>
                  <input
                    type="text"
                    className="border rounded-sm p-1"
                    placeholder="Driver's Name"
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <span className="text-[red]">driver name is required</span>
                  )}
                </div>
                <div className="flex flex-col mt-2">
                  <label className="text-[14px] font-bold mb-1">
                    Current Address
                  </label>
                  <textarea
                    className="border-sm border p-1"
                    placeholder="enter current address"
                    {...register("currentAddress", { required: true })}
                  ></textarea>
                  {errors.currentAddress && (
                    <span className="text-[red]">
                      current address is required
                    </span>
                  )}
                </div>
                <div className="flex flex-col mt-2">
                  <label className="text-[14px] font-bold mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    className="border rounded-sm p-1"
                    placeholder="Mobile Number"
                    {...register("mobileNumber", { required: true })}
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <label className="text-[14px] font-bold mb-1">
                    Upload Driving License
                  </label>
                  <input
                    type="file"
                    className="border rounded-sm p-1"
                    {...register("drivingLicense")}
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <label className="text-[14px] font-bold mb-1">
                    Upload Aadhar Card
                  </label>
                  <input
                    type="file"
                    className="border rounded-sm p-1"
                    {...register("aadharCard")}
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <label className="text-[14px] font-bold mb-1">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    className="border rounded-sm p-1"
                    placeholder="Bank Name"
                    {...register("bankName")}
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <label className="text-[14px] font-bold mb-1">
                    Account Name
                  </label>
                  <input
                    type="text"
                    className="border rounded-sm p-1"
                    placeholder="Account Name"
                    {...register("accountNumber")}
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <label className="text-[14px] font-bold mb-1">
                    Emergency Contact Person Name
                  </label>
                  <input
                    type="text"
                    className="border rounded-sm p-1"
                    placeholder="Emergency Contact Person Name"
                    {...register("emergencyContact.name")}
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <label className="text-[14px] font-bold mb-1">
                    Person Mobile Number
                  </label>
                  <input
                    type="text"
                    className="border rounded-sm p-1"
                    placeholder="Person Mobile Number"
                    {...register("emergencyContact.mobileNumber")}
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <label className="text-[14px] font-bold mb-1">
                    Security Deposit (Rs. 5999 Deposit)
                  </label>
                  <input
                    type="number"
                    className="border rounded-sm p-1"
                    placeholder="5900"
                    {...register("securityDeposit")}
                  />
                </div>
              </div>

              <div className="w-2/4">
                <div className="flex flex-col w-full">
                  <label className="text-[14px] font-bold mb-1">
                    Father's Name
                  </label>
                  <input
                    type="text"
                    className="border p-1 rounded-sm"
                    placeholder="Father's Name"
                    {...register("fatherName")}
                  />
                </div>

                <div className="flex flex-col mt-2">
                  <label className="text-[14px] font-bold mb-1">
                    Permanent Address
                  </label>
                  <textarea
                    className="border-sm border p-1"
                    placeholder="Enter Permanent Address"
                    {...register("permanentAddress")}
                  ></textarea>
                </div>
                <div className="flex flex-col mt-2">
                  <label className="text-[14px] font-bold mb-1">Email ID</label>
                  <input
                    type="email"
                    className="border rounded-sm p-1"
                    placeholder="Email ID"
                    {...register("email")}
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <label className="text-[14px] font-bold mb-1">
                    Upload Pan Card
                  </label>
                  <input
                    type="file"
                    className="border rounded-sm p-1"
                    {...register("panCard")}
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <label className="text-[14px] font-bold mb-1">
                    Bank Branch Name
                  </label>
                  <input
                    type="text"
                    className="border rounded-sm p-1"
                    placeholder="Bank Branch Name"
                    {...register("bankBranch")}
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <label className="text-[14px] font-bold mb-1">
                    Beneficiary Name
                  </label>
                  <input
                    type="text"
                    className="border rounded-sm p-1"
                    placeholder="Beneficiary Name"
                    {...register("beneficiaryName")}
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <label className="text-[14px] font-bold mb-1">IFSC</label>
                  <input
                    type="text"
                    className="border rounded-sm p-1"
                    placeholder="IFSC"
                    {...register("ifscCode")}
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <label className="text-[14px] font-bold mb-1">
                    Person Address
                  </label>
                  <input
                    type="text"
                    className="border rounded-sm p-1"
                    placeholder="Person Address"
                    {...register("emergencyContact.address")}
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <label className="text-[14px] font-bold mb-1">
                    Person Relation
                  </label>
                  <input
                    type="text"
                    className="border rounded-sm p-1"
                    placeholder="Person Relation"
                    {...register("emergencyContact.relationship")}
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <label className="text-[14px] font-bold mb-1">
                    Security Deposit Cheque Value of 1 Lakh
                  </label>
                  <input
                    type="file"
                    className="border rounded-sm p-1"
                    {...register("securityDepositCheque")}
                  />
                </div>
                <div className="flex mt-2 justify-end">
                  <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    register
                  </button>
                </div>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};
