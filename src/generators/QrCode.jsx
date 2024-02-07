import React, { useState } from 'react'

const QrCode = () => {
    const [img,setImg]=useState("");
    const [loading,setLoading]=useState(false);
    const [qrData,setQrdata]=useState("");
    const [qrSize,setQrSize]=useState("");

    async function generateQR(){
        setLoading(true);
        try{
            const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
            setImg(url)
        }catch(err){
            console.log("Error in generating QR code",err)
        }finally{
            setLoading(false);
        }
    }

    function downloadQR(){
        fetch(img)
        .then((response)=>response.blob())
        .then((blob)=>{
            const link=document.createElement("a");
            link.href=URL.createObjectURL(blob);
            link.download="qrCode.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
        .catch((error)=>{
            console.log("error in generating QR code :",error);
        });
    }

  return (
    <>
    <div className="app-container">
        <h1>QR CODE GENERATOR</h1>
        {loading && <p>Please wait...</p>}
        {img && <img src={img} className='qrImage'/>}
        <div>
            <label htmlFor="dataInput" className='input-label'>Data for QR code:</label>
            <input type="text" value={qrData} id='dataInput' placeholder='Enter data for QR code' onChange={(event)=>setQrdata(event.target.value)}/>

            <label htmlFor="sizeInput" className='input-label'>Image size (e.g.,150):</label>
            <input type="text" value={qrSize} id='sizeInput' placeholder='Enter image size' onChange={(event)=>setQrSize(event.target.value)}/>

            <div className="buttonMobileView">
            <button className='generate-button' disabled={loading} onClick={generateQR}>Generate QR code</button>
            <button className='download-button' onClick={downloadQR}>Download QR code</button>
            </div>
        </div>
        <p className='footer'>Designed by <a href="https://iamsuriyan.github.io/suriyan-portfolio/" target='_blank'>Suriyan</a></p>
    </div>
    </>
  )
}

export default QrCode
