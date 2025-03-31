import { AlertTriangle, Info } from "lucide-react";

const DiagnosisDisclaimer = () => {
  return (
    <div className="mt-4 border-t border-gray-200 pt-3">
      <div className="flex items-center text-gray-600">
        <Info className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" />
        <p className="text-xs">
          <span className="font-medium">Disclaimer:</span> This analysis is
          intended as a diagnostic aid only. The final diagnosis and treatment
          decisions should always be made by a qualified healthcare
          professional.
        </p>
      </div>
    </div>
  );
};

export default DiagnosisDisclaimer;
