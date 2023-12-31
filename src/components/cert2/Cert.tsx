import QRCode from "qrcode";
import React from "react";
import cert from "../../assets/images/cert.png";
import president from "../../assets/images/Napps_National_President.png";
import secetary from "../../assets/images/Napps_National_Secetary.png";
import certp from "../../assets/images/Napps_pay_1.jpg";
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
      <img className="mx-auto w-[100%] h-[875px]" src={certp} alt="cert" />

      {userData && (
        <div className=" absolute print:z-20 left-[460px] print:left-[500px] h-[40px] w-[60%] mt-[320px]">
          <p className="font-[600] text-3xl print:3xl text-[#343233]">
            {userData?.title.toUpperCase()} {userData?.firstname.toUpperCase()}{" "}
            {userData?.lastname.toUpperCase()}
          </p>
        </div>
      )}

      <div className="absolute print:z-20 left-[570.5px] print:left-[570.5px] h-[40px] w-[60%] mt-[570.5px]">
        <p className="font-[600] text-base print:xl text-[#343233]">
        {userData && userData.paid_at
            ? format(new Date(userData.paid_at), "MMMM d, yyyy")
            : ""}
        </p>
      </div>
      <img
        src={qr}
        className="w-[10%] absolute bottom-[220px] print:bottom-[220px] right-[90px] print:right-[90px]"
        alt=""
      />
    </div>
  );
};

export default Cert;
