import { useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { usepdfContext } from "../../Components/context/pdfRenderContext";

const CertificatePreview = ({ pdfUrl, courseName }) => {
  const { renderPdf } = usepdfContext();

  return (
    <Card className=" flex  cursor-pointer w-full" onClick={() => renderPdf(pdfUrl)}>
      <CardHeader>
        <h4 className="text-xl font-semibold">{courseName}</h4>
      </CardHeader>
      <CardBody>
        <div className="flex justify-center h-[320px] relative ">
         
          <div
            className="absolute inset-0"
            onClick={() => renderPdf(pdfUrl)}
          ></div>
          
          <iframe  src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`} className="w-full h-full object-cover "/>
        </div>
      </CardBody>
    </Card>
  );
};

export default CertificatePreview;
