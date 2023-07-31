import React from "react";
import logo from "../assets/images/NAPSS logo.svg";
import certp from "../assets/images/Napps_pay_1.jpeg";
import { userData, usersInfo } from "../types";
import QRCode from "qrcode";

const ID = ({ userData }: { userData: usersInfo | null }) => {
  const [qr, setQr] = React.useState<string>("");



  

  React.useEffect(() => {
    (async () => {
      const data = await QRCode.toDataURL(
        `${import.meta.env.VITE_BASE_URL}/${userData?.id}`
      ); setQr(data);
    })();
  }, []);
  

  return (
    <div className=" relative rounded-lg h-[320px] pt-5">
      <div className="flex justify-between h-full">
        <div className="max-w-[100%] relative">
        <img className="w-[100%] h-[100%]" src={certp} alt="cert" />
        </div>
        <div className=" absolute print:z-80 left-[130.5px] print:left-[130.5px] h-[30px] w-[90%] mt-[105px]">
          <p className="font-[600] text-base print:3xl text-[#343233]">
            {userData?.name.first.toUpperCase()} {userData?.name.last.toUpperCase()}
          </p>
        </div>

        <div className=" absolute print:z-80 left-[180.5px] print:left-[180px] h-[30px] w-[90%] mt-[210px]">
          <p className="font-[600] text-[0.45rem] print:3xl text-[#343233]">
             1st August 2023
          </p>
        </div>
        <img
        src={qr}
        className="w-[10%] absolute bottom-[85px] print:bottom-[85px] right-[40px] print:right-[40px]"
        alt=""
      />

  
      </div>
    </div>
  );
};

export default ID;
