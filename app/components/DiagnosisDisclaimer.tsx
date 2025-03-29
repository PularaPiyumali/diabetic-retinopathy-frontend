import { AlertTriangle } from "lucide-react";

const DiagnosisDisclaimer = () => {
  return (
    <div className="mt-6 bg-amber-50 border-l-4 border-amber-500 p-4 rounded-md">
      <div className="flex items-start">
        <AlertTriangle className="h-6 w-6 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-medium text-amber-800">Disclaimer</h3>
          <div className="mt-1 text-sm text-amber-700">
            <p>
              This analysis is intended as a diagnostic aid only. The final
              diagnosis and treatment decisions should always be made by a
              qualified healthcare professional based on a comprehensive
              clinical evaluation.
            </p>
            <p className="mt-2">
              AI-based detection systems are not a substitute for professional
              medical advice, diagnosis or treatment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisDisclaimer;
