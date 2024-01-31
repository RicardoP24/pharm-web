"use client"; // Importa a biblioteca "client".

import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import { registrationFormControls } from "@/utils";
import { useContext, useEffect, useState } from "react";
import { registerNewUser } from "../services/register";
import { toast } from "react-toastify";
import { GlobalContext } from "@/context";
import Notification from "@/components/Notifications";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import { useRouter } from "next/navigation";

const isRegistered = false;

const initialFormData = {
  name: "",
  email: "",
  nif: "",
  password: "",
  role: "customer",
};

export default function Register() {
  const [formData, setFormData] = useState(initialFormData);
  const [isRegistered, setIsRegistered] = useState(false);
  const { pageLevelLoader, setPageLevelLoader, isAuthUser } =
    useContext(GlobalContext);
  const router = useRouter();

  function isFormValid() {
    return (
      formData &&
      formData.name &&
      formData.name.trim() !== "" &&
      formData.email &&
      formData.email.trim() !== "" &&
      /^\d+$/.test(formData.nif) &&
      formData.password &&
      formData.password.trim() !== ""
    );
  }

  async function handleRegisterOnSubmit() {
    setPageLevelLoader(true);
    const data = await registerNewUser(formData);

    if (data.success) {
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsRegistered(true);
      setPageLevelLoader(false);
      setFormData(initialFormData);
    } else {
      toast.error(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setPageLevelLoader(false);
      setFormData(initialFormData);
    }
  }

  useEffect(() => {
    if (isAuthUser) router.push("/");
  }, [isAuthUser]);

  return (
<div className="bg-gradient-to-b from-blue-100 to-blue-500 h-screen flex items-center justify-center mt-14">
      <div style={{width:"50%"}} className="bg-white p-8 rounded-xl shadow-lg ">
        <h1 className="text-2xl font-bold text-center ">
          {isRegistered ? "Registrado com sucesso" : "Registo"}
        </h1>
        {isRegistered ? (
          <button
            className="bg-green-500 rounded-full text-white py-3 px-6 mt-4 w-full "
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        ) : (
          <div className="space-y-4 mt-4">
            {registrationFormControls.map((controlItem) =>
              controlItem.componentType === "input" ? (
                <InputComponent
                  key={controlItem.id}
                  type={controlItem.type}
                  placeholder={controlItem.placeholder}
                  label={controlItem.label}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      [controlItem.id]: event.target.value,
                    });
                  }}
                  value={formData[controlItem.id]}
                  rounded="rounded"
                  bgColor="bg-gray-100"
                  focusBorderColor="focus:border-blue-500"
                />
              ) : controlItem.componentType === "select" ? (
                <SelectComponent
                  key={controlItem.id}
                  options={controlItem.options}
                  Label={controlItem.label}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      [controlItem.id]: event.target.value,
                    });
                  }}
                  value={formData[controlItem.id]}
                  rounded="rounded"
                  bgColor="bg-gray-100"
                  focusBorderColor="focus:border-blue-500"
                />
              ) : null
            )}
          </div>
        )}
        <button
          className={`${
            !isFormValid() ? "opacity-50" : ""
          } bg-green-500 rounded-full text-white py-3 px-6 mt-4 w-full flex justify-center`}
          disabled={!isFormValid()}
          onClick={handleRegisterOnSubmit}
        >
          {pageLevelLoader ? (
            <ComponentLevelLoader text="Registrando" color="#ffffff" loading={pageLevelLoader} />
          ) : (
            "Registar"
          )}
        </button>
      </div>
      <Notification/>
    </div>
  );
}
