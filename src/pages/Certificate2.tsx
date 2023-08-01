import React, { useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import Certs from "../components/cert2/Certs";
import { IFetchSucess } from "../types";
import { useNavigate } from "react-router-dom";
import loader from "../assets/images/loader.gif";

const Certificate = () => {
  const ref = useRef<HTMLElement | null>(null);
  const [usersData, setUsersData] = useState<IFetchSucess[] | null>(null);
  const [error, setError] = useState<unknown>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [storeCert, setStoreCert] = useState<any>([]);
  const [printed, setPrinted] = useState(0);
  const navigate = useNavigate();

 

  const fetchData = async () => {
    const response = await fetch(import.meta.env.VITE_MAIN_URL);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const fetchedData = async () => {
      const fetchedUsers = await fetchData();
      console.log(fetchedUsers);
      try {
        setUsersData(fetchedUsers.results);
        setStoreCert(document.getElementsByClassName("IDCARD"));

        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    };
    fetchedData();
  }, [ref.current]);

  const pageStyle = `
  @page {
    size: A4 landscape  ;
    
  }
}

  `;

  if (loading)
    return (
      <div className="h-screen flex bg-green-400 flex-wrap">
        <div className="md:text-4xl text-2xl flex justify-center items-center font-bold m-auto">
          <img className="w-[30%]" src={loader} alt="loader" />
        </div>
      </div>
    );

  if (!loading && error)
    return (
      <div className="h-screen flex flex-wrap">
        <h1 className="m-auto md:text-4xl text-blue-400 text-2xl font-bold uppercase">
          {error as string}
        </h1>
      </div>
    );

  return (
    <React.Fragment>
      <button
        onClick={() => navigate("/certificates")}
        className="ml-5 transition-all duration-[.5s] mt-5 bg-black text-white hover:bg-green-500 sm:p-5 p-3 text-[.8rem] sm:text-[1rem] rounded lg:fixed left-0 mb-5 top-0 hidden lg:block "
      >
        Certificate 2
      </button>
      {/* for mobile display */}
      <div className="h-screen bg-white flex justify-center items-center text-[1rem] md:text-[2rem] text-center lg:hidden fixed z-20 uppercase font-medium px-[20px]">
        printing only available for laptop and desktop screens
      </div>

      <React.Fragment>
        {usersData?.map((item: any, index: number) => (
          <>
            <p className="text-purple-800 text-5xl font-extrabold text-center print:hidden">
              {index + 1}
            </p>
            <div
              key={index}
              className="print:w-full flex justify-center items-center  IDCARD "
              id="IDCARD"
            >
              <div className="print:w-full">
                <Certs userData={item} ref={ref} />
                <style>{pageStyle}</style>
                {item && (
                  <ReactToPrint
                    trigger={() => (
                      <div className="print:hidden">
                        <button
                          type="submit"
                          className="w-[40%] mx-auto bg-black py-5 text-white rounded-md my-[50px] hidden lg:block print:hidden"
                        >
                          Print Certificate
                        </button>
                      </div>
                    )}
                    content={() => {
                      return storeCert[index];
                    }}
                    documentTitle={item.id}
                  />
                )}
              </div>
            </div>
          </>
        ))}
      </React.Fragment>
    </React.Fragment>
  );
};

export default Certificate;
