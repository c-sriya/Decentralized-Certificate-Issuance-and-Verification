import { useState } from "react";
import { ethers } from "ethers";
import { contractAddress, contractABI } from "./contractConfig.js";
import "./App.css";

function App() {
  const [certId, setCertId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [course, setCourse] = useState("");
  const [verifyData, setVerifyData] = useState(null);

  async function getContract() {
    if (!window.ethereum) return alert("Please install MetaMask");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
  }

  const issueCertificate = async () => {
    try {
      const contract = await getContract();
      const tx = await contract.issueCertificate(certId, studentName, course);
      await tx.wait();
      alert("Certificate Issued!");
    } catch (error) {
      console.error(error);
      alert("Error issuing certificate");
    }
  };

  const verifyCertificate = async () => {
    try {
      const contract = await getContract();
      const data = await contract.verifyCertificate(certId);
      setVerifyData({
        studentName: data[0],
        course: data[1],
        issueDate: new Date(Number(data[2]) * 1000).toLocaleString()
      });
    } catch (error) {
      console.error(error);
      alert("Certificate not found");
    }
  };

  return (
    <div className="container">
      <h2>Certificate System</h2>
      <div className="card">
        <h3>Issue Certificate</h3>
        <input placeholder="Certificate ID" onChange={(e) => setCertId(e.target.value)} />
        <input placeholder="Student Name" onChange={(e) => setStudentName(e.target.value)} />
        <input placeholder="Course" onChange={(e) => setCourse(e.target.value)} />
        <button onClick={issueCertificate}>Issue</button>
      </div>

      <div className="card">
        <h3>Verify Certificate</h3>
        <input placeholder="Certificate ID" onChange={(e) => setCertId(e.target.value)} />
        <button onClick={verifyCertificate}>Verify</button>
        {verifyData && (
          <div className="result">
            <p><strong>Student Name:</strong> {verifyData.studentName}</p>
            <p><strong>Course:</strong> {verifyData.course}</p>
            <p><strong>Issue Date:</strong> {verifyData.issueDate}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
