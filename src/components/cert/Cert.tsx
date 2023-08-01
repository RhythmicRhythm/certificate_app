import QRCode from "qrcode";
import React from "react";
import cert from "../../assets/images/cert.png";
import certp from "../../assets/images/Napps_pay_2.jpeg";
import president from "../../assets/images/Napps_National_President.png";
import secetary from "../../assets/images/Napps_National_Secetary.png";
import { usersInfo } from "../../types";
import { log } from "console";

const Cert = ({ userData }: { userData: usersInfo | null }) => {
  const [qr, setQr] = React.useState<string>("");

  React.useEffect(() => {
    (async () => {
      const data = await QRCode.toDataURL(`Payment Id:${userData?.id}`);
      console.log(userData);
      
      console.log(data);
      

      setQr(data);
    })();
  }, []);

  return (
    <div className=" relative w-full h-full  flex print:w-full ">
      <img className="mx-auto w-[100%] h-[792px]" src={certp} alt="cert" />
      
        {userData && (
        <div className=" absolute print:z-20 left-[390.5px] print:left-[390px] h-[40px] w-[60%] mt-[270px]">
          <p className="font-[600] text-4xl print:3xl text-[#343233]">
            {userData?.name.first.toUpperCase()} {userData?.name.last.toUpperCase()}
          </p>
        </div>
      )}
            <div className="absolute print:z-20 left-[300.5px] print:left-[420.5px] h-[40px] w-[60%] mt-[350.5px]">
      <p className="font-[600] italic text-xl print:xl text-[#343233]">
           20 Thousand Naira
          </p>
      </div>
      <div className="absolute print:z-20 left-[590.5px] print:left-[750.5px] h-[40px] w-[60%] mt-[510.5px]">
      <p className="font-[600] text-xl print:xl text-[#343233]">
            2nd August 2023
          </p>
      </div>
      <img
        src={qr}
        className="w-[12%] print:width-[16%] absolute bottom-[110px] print:bottom-[90px] right-[140px] print:right-[180px]"
        alt=""
      />
            <img
        src={president}
        className="w-[16%] absolute bottom-[160px] print:bottom-[120px] left-[190px] print:left-[190px]"
        alt=""
      />
      <img
        src={secetary}
        className="w-[9%] absolute bottom-[180px] print:bottom-[180px] right-[390px] print:right-[390px]"
        alt=""
      />
    </div>
  );
};

export default Cert;
