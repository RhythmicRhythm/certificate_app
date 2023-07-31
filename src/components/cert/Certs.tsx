import React, { forwardRef, LegacyRef } from "react";
import Cert from "./Cert";

const Certs = forwardRef(
  (
    { userData }: { userData: any },
    ref: LegacyRef<HTMLElement> | undefined
  ) => {
    return (
      <figure className="mt-5 print:mt-0" ref={ref}>
        <React.Fragment>
          <Cert userData={userData} />
        </React.Fragment>
      </figure>
    );
  }
);

export default Certs;
