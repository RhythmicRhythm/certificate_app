import React, { forwardRef, LegacyRef } from "react";
import { IFetchSucess, userData } from "../types";
import ID from "./ID";
const IDS = forwardRef(
  (
    { userData }: { userData: IFetchSucess[] },
    ref: LegacyRef<HTMLElement> | undefined
  ) => {
    return (
      <figure ref={ref} className="max-w-[400px] mt-5 print:mx-auto w-full">
        {userData?.map((user: any, index: number) => (
          <React.Fragment key={index}>
            {user && <ID userData={user} />}
          </React.Fragment>
        ))}
      </figure>
    );
  }
);

export default IDS;