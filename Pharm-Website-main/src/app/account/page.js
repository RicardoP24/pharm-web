"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import { GlobalContext } from "@/context";
import { addNewAddressFormControls } from "@/utils";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import {
  addNewAddress,
  deleteAddress,
  fetchAllAddresses,
  updateAddress,
} from "../services/address";
import Notification from "@/components/Notifications";

export default function Account() {
  const {
    user,
    addresses,
    setAddresses,
    addressFormData,
    setAddressFormData,
    componentLevelLoader,
    setComponentLevelLoader,
    pageLevelLoader,
    setPageLevelLoader,
  } = useContext(GlobalContext);

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [currentEditedAddressId, setCurrentEditedAddressId] = useState(null);
  const router = useRouter();

  async function extractAllAddresses() {
    setPageLevelLoader(true);
    const res = await fetchAllAddresses(user?._id);

    if (res.success) {
      setPageLevelLoader(false);

      setAddresses(res.data);
    }
  }

  async function handleAddOrUpdateAddress() {
    setComponentLevelLoader({ loading: true, id: "" });
    const res =
      currentEditedAddressId !== null
        ? await updateAddress({
            ...addressFormData,
            _id: currentEditedAddressId,
          })
        : await addNewAddress({ ...addressFormData, userID: user?._id });

    console.log(res);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setAddressFormData({
        nomeCompleto: "",
        cidade: "",
        pais: "",
        codigoPostal: "",
        address: "",
      });
      extractAllAddresses();
      setCurrentEditedAddressId(null);
    } else {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setAddressFormData({
        nomeCompleto: "",
        cidade: "",
        pais: "",
        codigoPostal: "",
        address: "",
      });
    }
  }

  function handleUpdateAddress(getCurrentAddress) {
    setShowAddressForm(true);
    setAddressFormData({
      nomeCompleto: getCurrentAddress.nomeCompleto,
      cidade: getCurrentAddress.cidade,
      pais: getCurrentAddress.pais,
      codigoPostal: getCurrentAddress.codigoPostal,
      address: getCurrentAddress.address,
    });
    setCurrentEditedAddressId(getCurrentAddress._id);
  }

  async function handleDelete(getCurrentAddressID) {
    setComponentLevelLoader({ loading: true, id: getCurrentAddressID });

    const res = await deleteAddress(getCurrentAddressID);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });

      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      extractAllAddresses();
    } else {
      setComponentLevelLoader({ loading: false, id: "" });

      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  useEffect(() => {
    if (user !== null) extractAllAddresses();
  }, [user]);

  return (
    <section>
      <div className="mx-auto bg-gray-100 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-white shadow p-6 sm:p-12 mt-12">
          <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
            {/* como meter foto do perfil ???????????*/}
          </div>
          <div className="flex flex-col flex-1">
            <h4 className="text-lg font-semibold text-center md:text-left">
              {user?.name}
            </h4>
            <p>{user?.email}</p>
            <p>{user?.role}</p>
          </div>
          <button
            onClick={() => router.push("/orders")}
            className="mt-5 inline-block bg-green-500 text-white px-5 py-3 text-xs font-medium uppercase tracking-wide rounded"
          >
            Ver Suas Encomendas
          </button>
          <div className="mt-6">
            <h1 className="font-bold text-lg">Seus Endereços :</h1>
            {pageLevelLoader ? (
              <PulseLoader
                color={"#000000"}
                loading={pageLevelLoader}
                size={15}
                data-testid="loader"
              />
            ) : (
              <div className="mt-4 flex flex-col gap-4">
                {addresses && addresses.length ? (
                  addresses.map((item) => (
                    <div className="border p-6" key={item._id}>
                      <p>Name : {item.nomeCompleto}</p>
                      <p>Address : {item.address}</p>
                      <p>Cidade : {item.cidade}</p>
                      <p>Pais : {item.pais}</p>
                      <p>CodigoPostal : {item.codigoPostal}</p>
                      <button
                        onClick={() => handleUpdateAddress(item)}
                        className="mt-5 mr-5 inline-block bg-green-500 text-white px-5 py-3 text-xs font-medium uppercase tracking-wide rounded"
                      >
                        Atualizar
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="mt-5 inline-block bg-green-500 text-white px-5 py-3 text-xs font-medium uppercase tracking-wide rounded"
                      >
                        {componentLevelLoader &&
                        componentLevelLoader.loading &&
                        componentLevelLoader.id === item._id ? (
                          <ComponentLevelLoader
                            text={"A eliminar"}
                            color={"#ffffff"}
                            loading={
                              componentLevelLoader &&
                              componentLevelLoader.loading
                            }
                          />
                        ) : (
                          "Eliminar"
                        )}
                      </button>
                    </div>
                  ))
                ) : (
                  <p>
                    Nenhum endereço encontrado! Por favor, adicione um novo
                    endereço abaixo
                  </p>
                )}
              </div>
            )}
          </div>
          <div className="mt-4">
            <button
              onClick={() => setShowAddressForm(!showAddressForm)}
              className="mt-5 inline-block bg-green-500 text-white px-5 py-3 text-xs font-medium uppercase tracking-wide rounded"
            >
              {showAddressForm
                ? "Ocultar Formulário de Endereço"
                : "Adicionar Novo Endereço"}
            </button>
          </div>
          {showAddressForm ? (
            <div className="flex flex-col mt-5 justify-center pt-4 items-center">
              <div className="w-full mt-6 space-y-8">
                {addNewAddressFormControls.map((controlItem) => (
                  <InputComponent
                    type={controlItem.type}
                    placeholder={controlItem.placeholder}
                    label={controlItem.label}
                    value={addressFormData[controlItem.id]}
                    onChange={(event) =>
                      setAddressFormData({
                        ...addressFormData,
                        [controlItem.id]: event.target.value,
                      })
                    }
                  />
                ))}
              </div>
              <button
                onClick={handleAddOrUpdateAddress}
                className="mt-5 inline-block bg-green-500 text-white px-5 py-3 text-xs font-medium uppercase tracking-wide rounded"
              >
                {componentLevelLoader && componentLevelLoader.loading ? (
                  <ComponentLevelLoader
                    text={"A guardar"}
                    color={"#ffffff"}
                    loading={
                      componentLevelLoader && componentLevelLoader.loading
                    }
                  />
                ) : (
                  "Guardar"
                )}
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <Notification />
    </section>
  );
}
