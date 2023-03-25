import { useContext, useEffect, useState } from "react";
import PhoneInput from "./PhoneInput";
import { toast } from "react-toastify";
import AuthContext from "../../context/AuthContext";
import Button from "./Button";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    title: "Mr.",
    name: "",
    email: "",
    dateOfBirth: "",
    emailUpdate: true,
    phoneUpdate: true,
    whatsappUpdate: true,
  });

  const {
    title,
    name,
    email,
    dateOfBirth,
    emailUpdate,
    phoneUpdate,
    whatsappUpdate,
  } = formData;

  const {
    inputBorder,
    number,
    registerUser,
    firebaseUID,
    initialState: { isSuccess, isError, message, user },
    resetInitialState,
  } = useContext(AuthContext);

  useEffect(() => {
    if (isSuccess && user) {
      toast.success("Registration Success");
      resetInitialState();
    }
    if (isError) {
      toast.error(message);
      resetInitialState();
    }
    // eslint-disable-next-line
  }, [isSuccess, isError]);

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value !== "on" ? e.target.value : e.target.checked,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !dateOfBirth) {
      return toast.error("Please fill all details");
    }
    const formDataCopy = {
      phoneNumber: number,
      name: `${title} ${name}`,
      email,
      firebaseUID,
      dateOfBirth,
      phoneUpdate,
      emailUpdate,
      whatsappUpdate,
    };
    await registerUser(formDataCopy);
    setFormData({
      title: "Mr.",
      name: "",
      email: "",
      dateOfBirth: "",
      emailUpdate: true,
      phoneUpdate: true,
      whatsappUpdate: true,
    });
  };

  const spanBasic = "text-sm font-semibold absolute top-0 left-0";
  const customInput = "text-[rgba(0,0,0,0.8)] font-normal";

  return (
    <div className="mt-5 ">
      <form onSubmit={onSubmit}>
        <div className={`relative pt-4`}>
          <span className={spanBasic}>Phone Number</span>
          <PhoneInput number={number} disabled={true} />
        </div>
        <div
          className={`relative w-full flex gap-3 ${inputBorder}`}
          style={{ paddingTop: "0rem" }}
        >
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Title</span>
            <select
              className="outline-none font-semibold"
              name="title"
              onChange={onChange}
              value={title}
            >
              <option value={"Mr."}>Mr.</option>
              <option value={"Ms."}>Ms.</option>
              <option value={"Mrs."}>Mrs.</option>
            </select>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold pb-[1px]">Name</span>
            <input
              type="text"
              className={`outline-none ${customInput} w-[125%]`}
              name="name"
              value={name}
              onChange={onChange}
            />
          </div>
        </div>
        <div className={`relative ${inputBorder}`}>
          <span className={spanBasic}>Date of Birth</span>
          <input
            type="date"
            className="date-picker mt-3 outline-none font-semibold"
            value={dateOfBirth}
            onChange={onChange}
            name="dateOfBirth"
          />
        </div>
        <div
          className={`relative ${inputBorder}`}
          style={{ borderTop: "none" }}
        >
          <span className={spanBasic}>Email</span>
          <input
            type="email"
            className={`outline-none ${customInput} mt-3 w-[90%]`}
            name="email"
            value={email}
            required
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <p className="text-sm py-2">
            Keep me updated about my orders, account & offers on:
          </p>
          <div className="font-semibold flex gap-3 items-center py-1">
            <input
              name="emailUpdate"
              id="email-checkbox"
              className="checked:accent-[#2136d4] h-5 w-5"
              type="checkbox"
              checked={emailUpdate}
              onChange={onChange}
            />
            <label htmlFor="email-checkbox">Email</label>
            <input
              name="phoneUpdate"
              id="phone-checkbox"
              className="checked:accent-[#2136d4] h-5 w-5"
              type="checkbox"
              checked={phoneUpdate}
              onChange={onChange}
            />
            <label htmlFor="phone-checkbox">Phone</label>
            <input
              name="whatsappUpdate"
              id="whatsapp-checkbox"
              className="checked:accent-[#2136d4] h-5 w-5"
              type="checkbox"
              checked={whatsappUpdate}
              onChange={onChange}
            />
            <label htmlFor="whatsapp-checkbox">WhatsApp</label>
          </div>
        </div>
        <Button type="submit" text="continue" />
      </form>
    </div>
  );
};

export default RegisterForm;
