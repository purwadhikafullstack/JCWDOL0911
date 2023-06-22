import React from "react";
import { useEffect } from "react";

function PrescriptionModal({ modalHandler }) {
  useEffect(() => {
    console.log("Prescription Modal Running");
  }, []);
  return (
    <div className="w-full h-full absolute top-0 left-0 bg-opacity-25 backdrop-blur-sm">
      <div className="bg-white border-4 border-gray-600 rounded-xl sm:w-[50%] w-[90%] mx-auto mt-10">
        <div>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita
          dolore sed dolorum? Illo sed quae praesentium aliquid alias atque ut?
          Fuga hic blanditiis vero aperiam voluptate eos architecto tenetur
          facere?
        </div>
        <button onClick={() => modalHandler()}>Back</button>
      </div>
    </div>
  );
}

export default PrescriptionModal;
