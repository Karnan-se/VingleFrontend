import { useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { usepdfContext } from "../../Components/context/pdfRenderContext";

const CertificatePreview = ({ pdfUrl, courseName }) => {
  const { renderPdf } = usepdfContext();

  return (
    <Card className="w-full flex flex-col cursor-pointer" onClick={() => renderPdf(pdfUrl)}>
      <CardHeader>
        <h4 className="text-xl font-semibold">{courseName}</h4>
      </CardHeader>
      <CardBody>
        <div className="flex justify-center h-[200px] relative">
         
          <div
            className="absolute inset-0"
            onClick={() => renderPdf(pdfUrl)}
          ></div>
          
          <iframe src={pdfUrl} className="w-full h-full" />
        </div>
      </CardBody>
    </Card>
  );
};

export default CertificatePreview;
