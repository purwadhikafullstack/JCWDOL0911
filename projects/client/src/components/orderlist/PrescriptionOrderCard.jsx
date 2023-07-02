import React, { useState } from "react";
import { parse, format } from "date-fns";
import { useSelector } from "react-redux";
import dots_comment from "../../assets/dots_comment.png";
import PaymentModal from "../payment/PaymentModal";
import { setSelectedTransaction } from "../../features/order/orderSlice";
import PrescriptionImageModal from "./PrescriptionImageModal";
import { useDispatch } from "react-redux";

function PrescriptionOrderCard() {
  //function to close the modal

  const dispatch = useDispatch();
  const [isPaymentModal, setIsPaymentModal] = useState(false);
  const prescriptions = useSelector((state) => state.order.prescriptions);

  const onClickPayNowHandler = (prescription) => {
    dispatch(setSelectedTransaction(prescription));
    setIsPaymentModal((prev) => !prev);
  };

  const onClickClosePaymentHandler = () => {
    setIsPaymentModal((prev) => !prev);
  };

  return (
    <>
      {prescriptions.map((prescription, prescriptionIndex) => {
        return (
          <div
            key={prescription.idprescription}
            className="w-full rounded even:bg-green-50 odd:bg-gray-50 shadow-xl px-6 pb-4 pt-1 mb-10"
          >
            <div className="font-bold mt-4 md:text-left text-center text-green-700">
              Transaction ID : {prescription.idprescription}
            </div>
            <div className="flex md:flex-col flex-col-reverse">
              <div className="flex items-center sm:flex-row sm:gap-0 gap-4 flex-col justify-between mb-4">
                <div>
                  {prescription?.date
                    ? format(
                        Date.parse(prescription.date),
                        "EEEE, dd-MMMM-yyyy, HH:mm:ss"
                      )
                    : null}
                </div>
                <div className="rounded bg-yellow-400 border-2 font-bold text-yellow-900 border-yellow-700 p-2">
                  {prescription.status}
                </div>
              </div>
              <div className="my-4 text-center sm:text-left">
                See Prescription :{" "}
                <span
                  onClick={(e) => {
                    const modal = document.getElementById(prescriptionIndex);
                    modal.style.display = "block";
                    console.log(modal.style.display);
                  }}
                  className="font-bold text-green-600 cursor-pointer hover:text-green-700"
                >
                  Click Here
                </span>
              </div>
              <hr className="mt-2" />
            </div>
            <div className="flex flex-row w-[100%] sm:justify-end justify-between sm:gap-20"></div>
            <div className="flex sm:flex-row-reverse flex-col mt-4 justify-between items-center">
              <div className="flex sm:w-[50%] w-full flex-row gap-4">
                <button
                  hidden={localStorage.getItem("user") ? true : false}
                  className=" w-full p-2 font-bold mx-auto rounded hover:bg-red-800 text-white bg-red-600"
                >
                  Reject
                </button>
                <button
                  hidden={localStorage.getItem("user") ? true : false}
                  onClick={() => onClickPayNowHandler(prescription)}
                  className=" w-full  p-2 font-bold mx-auto rounded hover:bg-green-800 text-white bg-green-600"
                >
                  Accept
                </button>
              </div>
              <div className="flex flex-row mt-4 items-center hover:cursor-pointer gap-5 md:justify-start">
                <img className="w-[30px]" src={dots_comment} alt="dots" />
                <div className="font-bold text-green-600">
                  Are you confused?
                </div>
              </div>
            </div>
            <div style={{ display: "none" }} id={prescriptionIndex}>
              <PrescriptionImageModal
                index={prescriptionIndex}
                image={prescription.prescription_image}
              />
            </div>
          </div>
        );
      })}
    </>
  );
}

export default PrescriptionOrderCard;
