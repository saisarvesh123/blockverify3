import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LanguageContext } from "../LanguageContext";
import { registerHash } from "../blockchain";
import "./Dashboard.css";

import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer
} from "recharts";

export default function Dashboard() {

const navigate = useNavigate();
const location = useLocation();
const { language } = useContext(LanguageContext);

const text = {

en:{
title:"Blockchain Document Dashboard",
verify:"First Time Verify",
store:"Store on Blockchain",
verifyMsg:"Verify first before storing on blockchain",
wallet:"Connected Wallet",
recent:"Recent Documents",
total:"Total Documents",
verified:"Verified Records",
hash:"Hash Bits Stored",
tx:"Blockchain Transactions",
graph:"Verification Analytics",
id:"ID",
file:"File Name",
type:"Type",
hash2:"Generated Hash",
time:"Upload Time",
status:"Status"
},

hi:{
title:"ब्लॉकचेन दस्तावेज़ डैशबोर्ड",
verify:"पहली बार सत्यापित करें",
store:"ब्लॉकचेन में स्टोर करें",
verifyMsg:"ब्लॉकचेन में स्टोर करने से पहले सत्यापित करें",
wallet:"कनेक्टेड वॉलेट",
recent:"हाल के दस्तावेज़",
total:"कुल दस्तावेज़",
verified:"सत्यापित रिकॉर्ड",
hash:"हैश बिट्स",
tx:"ब्लॉकचेन लेनदेन",
graph:"सत्यापन विश्लेषण",
id:"आईडी",
file:"फाइल नाम",
type:"प्रकार",
hash2:"जेनरेटेड हैश",
time:"अपलोड समय",
status:"स्थिति"
},




es:{
title:"Panel de Documentos Blockchain",
verify:"Primera Verificación",
store:"Guardar en Blockchain",
verifyMsg:"Verifique antes de guardar",
wallet:"Billetera Conectada",
recent:"Documentos Recientes",
total:"Total Documentos",
verified:"Registros Verificados",
hash:"Bits Hash",
tx:"Transacciones Blockchain",
id:"ID",
file:"Archivo",
type:"Tipo",
hash2:"Hash Generado",
time:"Tiempo",
status:"Estado"
},

fr:{
title:"Tableau Blockchain",
verify:"Première Vérification",
store:"Stocker sur Blockchain",
verifyMsg:"Vérifiez avant de stocker",
wallet:"Portefeuille Connecté",
recent:"Documents Récents",
total:"Total Documents",
verified:"Enregistrements Vérifiés",
hash:"Bits Hash",
tx:"Transactions Blockchain",
id:"ID",
file:"Nom Fichier",
type:"Type",
hash2:"Hash Généré",
time:"Temps",
status:"Statut"
},

de:{
title:"Blockchain Dokument Dashboard",
verify:"Erste Überprüfung",
store:"Auf Blockchain speichern",
verifyMsg:"Vor dem Speichern überprüfen",
wallet:"Verbundenes Wallet",
recent:"Letzte Dokumente",
total:"Gesamte Dokumente",
verified:"Verifizierte Datensätze",
hash:"Hash Bits",
tx:"Blockchain Transaktionen",
id:"ID",
file:"Dateiname",
type:"Typ",
hash2:"Generierter Hash",
time:"Zeit",
status:"Status"
}

};

const t = text[language] || text.en;

const [documents,setDocuments] = useState(()=>{
const saved = localStorage.getItem("documents");
return saved ? JSON.parse(saved) : [];
});

const [verifiedFile,setVerifiedFile] = useState(
location.state?.file || null
);

const [wallet,setWallet] = useState("");

useEffect(()=>{

if(window.ethereum){

window.ethereum.request({method:"eth_accounts"})
.then(accounts=>{
if(accounts.length>0){
setWallet(accounts[0]);
}
});

}

},[]);

const handleStore = async ()=>{

if(!verifiedFile){
alert("Please verify document first");
return;
}

const newDoc = {

id: documents.length + 1,
name: verifiedFile.name,
type: verifiedFile.type,
hash: verifiedFile.hash,
time: new Date().toLocaleString(),
status:"Verified"

};

const updated = [newDoc,...documents];

setDocuments(updated);
localStorage.setItem("documents",JSON.stringify(updated));

setVerifiedFile(null);

try{
await registerHash(newDoc.hash);
}catch(err){
console.log(err);
}

};

/* GRAPH DATA */

const graphData = [

{
name:"Documents",
count:documents.length
}

];

return(

<>

{/* VIDEO BACKGROUND */}

<video
autoPlay
muted
loop
playsInline
style={{
position:"fixed",
width:"100%",
height:"100%",
objectFit:"cover",
zIndex:-2
}}
>

<source src="/videos.mp4" type="video/mp4"/>

</video>

{/* DARK OVERLAY */}

<div
style={{
position:"fixed",
inset:0,
background:"rgba(0,0,0,0.6)",
zIndex:-1
}}
></div>

<div className="dashboard">

<h1 className="dash-title">
{t.title}
</h1>

<div className="wallet">
{t.wallet}: {wallet || "MetaMask"}
</div>

{/* STATS */}

<div className="stats">

<div className="card">
<h2>{documents.length}</h2>
<p>{t.total}</p>
</div>

<div className="card">
<h2>{documents.length}</h2>
<p>{t.verified}</p>
</div>

<div className="card">
<h2>256</h2>
<p>{t.hash}</p>
</div>

<div className="card">
<h2>{documents.length}</h2>
<p>{t.tx}</p>
</div>

</div>

{/* VERIFY */}

<div className="verify-box">

<button
className="verify-btn"
onClick={()=>navigate("/verify-document")}
>
{t.verify}
</button>

<p className="verify-text">
{t.verifyMsg}
</p>

<button
className="store-btn"
onClick={handleStore}
disabled={!verifiedFile}
>
{t.store}
</button>

</div>

{/* GRAPH SECTION */}

<div style={{marginTop:"50px"}}>

<h2 style={{color:"white"}}>
{t.graph}
</h2>

<ResponsiveContainer width="100%" height={320}>

<BarChart
data={graphData}
margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
>

<defs>

<linearGradient id="colorDocs" x1="0" y1="0" x2="0" y2="1">

<stop offset="5%" stopColor="#4d56ff" stopOpacity={0.9}/>
<stop offset="95%" stopColor="#a34dff" stopOpacity={0.2}/>

</linearGradient>

</defs>

<XAxis
dataKey="name"
stroke="#ffffff"
tick={{ fill: "#ffffff", fontSize: 14 }}
/>

<YAxis
stroke="#ffffff"
tick={{ fill: "#ffffff", fontSize: 14 }}
/>

<Tooltip
contentStyle={{
background:"#111",
border:"none",
borderRadius:"8px",
color:"#fff"
}}
/>

<Bar
dataKey="count"
fill="url(#colorDocs)"
radius={[8,8,0,0]}
animationDuration={1500}
/>

</BarChart>

</ResponsiveContainer>
</div>

{/* TABLE */}

{documents.length > 0 && (

<div className="table-box">

<h2>{t.recent}</h2>

<table>

<thead>

<tr>
<th>{t.id}</th>
<th>{t.file}</th>
<th>{t.type}</th>
<th>{t.hash2}</th>
<th>{t.time}</th>
<th>{t.status}</th>
</tr>

</thead>

<tbody>

{documents.map((doc)=>(

<tr key={doc.id}>

<td>{doc.id}</td>
<td>{doc.name}</td>
<td>{doc.type}</td>
<td className="hash">{doc.hash}</td>
<td>{doc.time}</td>
<td className="verified">{doc.status}</td>

</tr>

))}

</tbody>

</table>

</div>

)}

</div>

</>

)

}