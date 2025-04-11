
import { useEffect } from "react"
import CertificateCard from "../../generalParts/certificate/certificateCard"
import {useSelector} from "react-redux"
import { getUserCertificate } from "../../features/api/getUserCertificate"
import { useState } from "react"
import { usepdfContext } from "../context/pdfRenderContext"




export default function Certificate(){
    const userInfo = useSelector((state)=> state.user.userInfo)
    console.log(userInfo , "userInfo")
    const [certificate , setCertificate] = useState([])
    const {renderPdf} = usepdfContext()
    console.log(renderPdf , "this functin is cakked here")
    
 
    useEffect(()=>{
        console.log("fetch Certificate ")
        

        const fetchCertificate = async()=>{
            console.log("fetch Certificate ")
            
            try {
            const certificate = await getUserCertificate(userInfo._id)
            console.log(certificate , "certificate")
            setCertificate(certificate)
                
            } catch (error) {
                console.log(error)
            
                
                
            }
           
        }
        fetchCertificate()

    },[userInfo])

    const renderPdfData= (pdfUrl)=>{
        try {
            renderPdf(pdfUrl)

            
        } catch (error) {
            
        }
    }

    return(
        <>
       <div className="flex flex-col md:flex "> 
  <div className="w-full h-full  flex justify-center items-center">
    <p className="text-center font-semibold text-4xl font-sansita">Your Certifications</p>
  </div>

  <div className="flex w-full justify-center gap-4 mt-4  md:flex-row flex-col object-cover"> 
    {certificate && certificate.map((cert, index) => (
      <CertificateCard 
        key={index} 
        pdfUrl={cert.certificateUrl} 
        courseName={cert.courseId.name || "undefined"} 
        renderPdfData={(pdfUrl)=> renderPdf(pdfUrl)}

      />
    ))}
  </div>
</div>

        
        </>
    )
}