import React from "react";
import { Button } from "@chakra-ui/react";
import CardProduct from "../components/CardProduct";

function LandingPage() {
  return (
    <>
      <div className="">
        <div className="flex justify-center lg:justify-between items-center h-48 mx-5 lg:mx-24 my-11 background-color-green rounded-2xl">
          <div className="px-5 lg:pl-16 flex flex-col gap-6">
            <p className="font-bold text-2xl lg:text-3xl text-white">
              One-stop for your health goods
            </p>
            <p className="font-bold text-white">
              buy drugs with or without a prescription
            </p>
          </div>

          <img
            src="./assets/banner.png"
            alt=""
            className="banner-homepage hidden lg:block"
          />
        </div>
        <div className="flex flex-wrap lg:flex-nowrap gap-6 justify-center lg:justify-between items-center h-full lg:h-44 mx-5 lg:mx-24 my-16 bg-white shadow-card-tagline px-16 py-4 rounded-2xl">
          <img
            src="./assets/icon-resep-obat.png"
            alt=""
            className="banner-homepage-perscription"
          />

          <div>
            <p className="font-bold text-lg">already have a prescription?</p>
            <p>
              No need to stand in line & the medicine is sent directly to your
              location!
            </p>
          </div>
          <div>
            <Button className="button-primary">Upload prescription</Button>
          </div>
        </div>
        <hr className="mx-5 lg:mx-24  m-11" />
        <div className="mx-5 lg:mx-24 ">
          <p className="font-bold text-2xl">Popular Product</p>

          <div className="flex gap-4 justify-between mt-6 overflow-auto">
            <CardProduct />
            <CardProduct />
            <CardProduct />
            <CardProduct />
            <CardProduct />
            <CardProduct />
          </div>
        </div>
        <hr className="mx-5 lg:mx-24  m-11" />
      </div>
      <div className="my-16">
        <p className="font-bold text-2xl mx-5 lg:mx-24 ">Our Services</p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mx-5 lg:mx-24  pt-6 mb-11">
          <div className="bg-white w-full h-full px-4 py-6 rounded-md shadow-card-tagline">
            <div className="flex gap-6 items-center ">
              <img src="./assets/icon-medicine.png" alt="" width="64px" />
              <div>
                <p className="font-bold text-lg">100 % Original</p>
                <p>
                  All the products we sell are guaranteed authentic & of the
                  best quality for you
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white w-full h-full px-4 py-6 rounded-md shadow-card-tagline">
            <div className="flex gap-6 items-center">
              <img src="./assets/icon-save-money.png" alt="" width="64px" />
              <div>
                <p className="font-bold text-lg">Save more money</p>
                <p>We guarantee to refund the difference in price difference</p>
              </div>
            </div>
          </div>
          <div className="bg-white w-full h-full px-4 py-6 rounded-md shadow-card-tagline">
            <div className="flex gap-6 items-center">
              <img src="./assets/icon-free-delivery.png" alt="" width="64px" />
              <div>
                <p className="font-bold text-lg">Free delivery</p>
                <p>
                  No need to stand in line, we deliver to your address free of
                  charge!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full h-full text-sm  bg-slate-100 justify-between px-24 py-11 flex-wrap">
        <div className="flex flex-col gap-10 items-center mx-auto">
          <p className="font-bold text-2xl text-center">Metode Pembayaran</p>
          <div className="flex flex-wrap gap-11 justify-center items-center">
            <img src="./assets/logo-mandiri.png" alt="" className="logo-bank" />
            <img src="./assets/logo-bca.png" alt="" className="logo-bank" />
            <img src="./assets/logo-permata.png" alt="" className="logo-bank" />
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
