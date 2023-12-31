import QRCode from "qrcode";
import React from "react";
import cert from "../../assets/images/cert.png";
import certp from "../../assets/images/Napps_pay_2.jpg";
import president from "../../assets/images/Napps_National_President.png";
import secetary from "../../assets/images/Napps_National_Secetary.png";
import { usersInfo } from "../../types";
import { log } from "console";
import { format } from "date-fns"; 

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
      <img className="mx-auto w-[100%] h-[992px]" src={certp} alt="cert" />

      {userData && (
        <div className=" absolute print:z-20 left-[390.5px] print:left-[390px] h-[40px] w-[60%] mt-[340px]">
          <p className="font-[600] text-4xl print:3xl text-[#343233]">
          {userData?.title.toUpperCase()} {userData?.firstname.toUpperCase()}{" "}
            {userData?.lastname.toUpperCase()}
          </p>
        </div>
      )}
      <div className="absolute print:z-20 left-[390.5px] print:left-[430.5px] h-[40px] w-[60%] mt-[440.5px]">
        <p className="font-[600] italic text-xl print:xl text-[#343233]">
          20 Thousand Naira
        </p>
      </div>
      <div className="absolute print:z-20 left-[770.5px] print:left-[750.5px] h-[40px] w-[60%] mt-[650px]">
        <p className="font-[600] text-xl print:xl text-[#343233]">
        {userData && userData.paid_at
            ? format(new Date(userData.paid_at), "MMMM d, yyyy")
            : ""}
        </p>
      </div>
      <img
        src={qr}
        className="w-[12%] print:width-[16%] absolute bottom-[120px] print:bottom-[120px] right-[180px] print:right-[180px]"
        alt=""
      />
    </div>
  );
};

export default Cert;
