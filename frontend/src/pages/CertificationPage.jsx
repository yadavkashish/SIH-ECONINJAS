import { useProgress } from "../context/ProgressContent";
import jsPDF from "jspdf";

export default function CertificationPage() {
  const { progress } = useProgress();

  const generateCertificate = () => {
    const doc = new jsPDF("landscape", "pt", "a4"); // Landscape for certificate

    // Border
    doc.setDrawColor(0);
    doc.setLineWidth(4);
    doc.rect(20, 20, 800 - 40, 565, "S");

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(32);
    doc.text("Certificate of Completion", 400, 120, { align: "center" });

    // Subtitle
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.text("This certifies that", 400, 180, { align: "center" });

    // User Name (Replace with actual user from context/auth)
    const userName = "Srishti Verma"; // <-- change dynamically
    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.text(userName, 400, 240, { align: "center" });

    // Course details
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.text(
      "has successfully completed the Waste Management Training Program",
      400,
      300,
      { align: "center" }
    );

    // Date
    const today = new Date().toLocaleDateString();
    doc.setFontSize(14);
    doc.text(`Date: ${today}`, 100, 500);

    // Signature placeholder
    doc.text("____________________", 650, 500);
    doc.text("Authorized Signatory", 690, 520);

    // Save PDF
    doc.save("certificate.pdf");
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-2xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-6">🎓 Certification</h1>

      <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
        <div
          className="bg-green-500 h-4 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="mb-6">Progress: {progress}%</p>

      <button
        onClick={generateCertificate}
        disabled={progress < 100}
        className={`px-6 py-3 rounded-lg font-semibold ${
          progress < 100
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {progress < 100 ? "Complete All Modules to Unlock" : "Generate Certificate"}
      </button>
    </div>
  );
}
