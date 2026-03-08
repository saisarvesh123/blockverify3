import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SHA256 from "crypto-js/sha256";
import { LanguageContext } from "../LanguageContext";
import "./VerifyPage.css";

export default function VerifyPage(){

const navigate = useNavigate();
const { language } = useContext(LanguageContext);

const text = {

en:{
title:"Select Document Type",
verify:"Verify Document",
back:"Back",
selected:"Selected",
upload:"Choose Document"
}

};

const t = text[language] || text.en;

const [file,setFile] = useState(null);
const [selected,setSelected] = useState(null);
const [showFormat,setShowFormat] = useState(false);


/* DOCUMENTS + IMAGE */

const documents = [

{ name:"Aadhar Card", icon:"🪪", img:"image16.png" },
{ name:"PAN Card", icon:"💳", img:"image15.png" },
{ name:"Passport", icon:"📘", img:"image12.png" },
{ name:"Driving License", icon:"🚗", img:"image11.png" },
{ name:"Marksheet", icon:"📄", img:"image14.png" },
{ name:"Degree Certificate", icon:"🎓", img:"image10.png" },
{ name:"Birth Certificate", icon:"👶", img:"image13.png" },
{ name:"Income Certificate", icon:"💰", img:"image9.png" }

];


const handleVerify = ()=>{

if(!file){
alert("Upload document first");
return;
}

const reader = new FileReader();

reader.onload = (e)=>{

const hash = SHA256(e.target.result).toString();

navigate("/dashboard",{
state:{
file:{
name:file.name,
type:file.type,
hash:hash
}
}
});

alert("Document verified successfully ✔");

};

reader.readAsBinaryString(file);

};


return(

<div className="verifyPage">

<h1 className="verifyTitle">
{t.title}
</h1>


<div className="docGrid">

{documents.map((doc,i)=>(

<div
key={i}
className={`docButton ${selected===doc.name ? "active":""}`}
onClick={()=>{
setSelected(doc.name);
setShowFormat(false);
}}
>

<div className="docIcon">{doc.icon}</div>
<div className="docText">{doc.name}</div>

</div>

))}

</div>


{selected && (

<>

<h2 className="selectedDoc">
{t.selected}: {selected}
</h2>


{/* SEE FORMAT BUTTON */}

<button
className="formatBtn"
onClick={()=>setShowFormat(!showFormat)}
>
See Format
</button>


{/* FORMAT IMAGE */}

{showFormat && (

<div className="docPreview">

<p className="formatText">Eg Format</p>

<img
src={documents.find(doc=>doc.name===selected).img}
alt="document"
className="previewImg"
/>

</div>

)}


<div className="uploadBox">

<label className="fileUpload">

<input
type="file"
accept="image/*,application/pdf"
onChange={(e)=>setFile(e.target.files[0])}
/>

<span className="uploadBtn">📂 {t.upload}</span>

</label>


<button
className="verifyBtn"
onClick={handleVerify}
>
{t.verify}
</button>

</div>

</>

)}


<button
className="backBtn"
onClick={()=>navigate("/dashboard")}
>
{t.back}
</button>


</div>

)

}