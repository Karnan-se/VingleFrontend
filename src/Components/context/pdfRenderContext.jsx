import { createContext, useContext } from "react";
import { useState } from "react";
import { PDFViewer } from "./pdfViewer";


 const pdfContext = createContext(null);

export default function PdfWrapper({children}){
   
    const [isOpenPdf , setOPenPdf] = useState(false)
    const [pdfData , setPdfData] = useState()

    const renderPdf = (pdf)=>{
        console.log("render pdf and " , pdf)
        setPdfData(pdf)
        setOPenPdf(true)
    }

    const closePDF = () =>{
        setOPenPdf(false)
    }
// if(!isOpenPdf && !pdfData) {
//     return null
// }

    return (
        <>
        <pdfContext.Provider value={ { renderPdf } }>
            {children}
           
            {isOpenPdf &&  pdfData && <PDFViewer pdfData={pdfData} closePDF={closePDF} isOpenPdf={isOpenPdf}/>}

        </pdfContext.Provider>
        
        </>
    )

}

export const  usepdfContext = () =>useContext(pdfContext)
