import React, { useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import { IFetchSucess } from "../types";
import IDS from "../components/IDS";
import { useNavigate } from "react-router-dom";
import loader from "../assets/images/loader.gif";

const IdPage = () => {
  const navigate = useNavigate();
  const [usersData, setUsersData] = useState<IFetchSucess[] | null>(null);
  const [error, setError] = useState<unknown>("");
  const [loading, setLoading] = useState<boolean>(false);
  const componentRef = useRef<HTMLElement | null>(null);
  const [storeComponents, setStoreComponents] = useState<any>([]);
  const [A4, setA4] = useState(0);

  //
  const fetchingData = async () => {
    const response = await fetch(import.meta.env.VITE_MAIN_URL);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const fetchedData = async () => {
      const fetchedUsers = await fetchingData();
      console.log(fetchedUsers);
      try {
        
        const arr = fetchedUsers.results;
        const newArr: any = [];
        console.log(Math.ceil(arr.length / 3));
        for (let i = 0; i < Math.ceil(arr.length / 3); i++) {
          newArr.push([]);
        }
        let count = 0,
          index = 0;

        for (let i = 0; i < newArr.length; i++) {
          for (let j = i; j < arr.length; j++) {
            newArr[i].push(arr[index]);
            count += 1;
            index += 1;
           
            if (count === 3) {
              count = 0;
              break;
            }
          }
        }
        console.log(newArr);
        setUsersData(newArr);
        setStoreComponents(document.getElementsByClassName("IDCARD"));
        setA4(newArr.length);
        
        setError("");
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    };  
    fetchedData();
  }, [componentRef.current, A4]);
  const pageStyle = `
    @page {
      size: A4 portrait;
      ;
    }
  `;

  if (loading)
    return (
      <div className="h-screen bg-green-400 flex flex-wrap">
        <div className="md:text-4xl text-2xl flex justify-center items-center font-bold m-auto">
          <img className="w-[30%]" src={loader} alt="loader" />
        </div>
      </div>
    );

  if (!loading && error)
    return (
      <div className="h-screen  flex flex-wrap">
        <h1 className="m-auto md:text-4xl text-2xl font-bold uppercase">
          {error as string}
        </h1>
      </div>
    );
  return (
    <div className="h-screen  items-center flex flex-wrap">
      <button
        onClick={() => navigate("/certificates")}
        className="ml-5 transition-all duration-[.5s] mt-5 bg-black text-white hover:bg-green-500 sm:p-5 p-3 text-[.8rem] sm:text-[1rem] rounded lg:fixed mb-5 top-0"
      >
        View Certificates
      </button>
      <div className=" w-full flex items-center justify-center flex-col">
        <React.Fragment>
          {usersData?.map((item: any, index) => {
            return (
              <React.Fragment key={index}>
                <>
                  <h1 className="font-bold my-5 text-2xl">{index + 1}</h1>
                  <div
                    className={`max-w-[595px] py-5 print:py-0 print:shadow-none w-full shadow-2xl print:border-none print:mx-auto border mb-[4rem]  flex-col items-center flex IDCARD`}
                  >
                    <IDS userData={item} ref={componentRef} />
                    <style>{pageStyle}</style>
                    {item[0] && (
                      <ReactToPrint
                        documentTitle={`NAPPS ID ${index + 1}`}
                        trigger={() => (
                          <button className="print:hidden bg-black scale-[.7] text-white font-bold max-w-[200px] w-full p-5 rounded-lg mt-5">
                            Print this out!
                          </button>
                        )}
                        content={() => {
                          return storeComponents[index];
                        }}
                      />
                    )}
                  </div>
                </>
              </React.Fragment>
            );
          })}
        </React.Fragment>
      </div>
    </div>
  );
};

export default IdPage;
