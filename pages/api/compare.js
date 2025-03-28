import formidable from "formidable";
import fs from "fs";
import axios from "axios";
import FormData from "form-data";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Use a more flexible form parser
  const form = formidable({
    keepExtensions: true,
    multiples: true, // Required for arrays of files
  });

  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Error parsing form:", err);
        res.status(500).json({ error: "Error parsing form data" });
        return resolve();
      }

      // Debugging: Log the files received
      console.log("Files received:", Object.keys(files));

      try {
        // Check if files were provided
        const baselineImageFile = files.baselineImage;
        const followUpImageFile = files.followUpImage;

        if (!baselineImageFile || !followUpImageFile) {
          res
            .status(400)
            .json({ error: "Both baseline and follow-up images are required" });
          return resolve();
        }

        // Log file information for debugging
        console.log(
          "Baseline file:",
          baselineImageFile[0].originalFilename,
          baselineImageFile[0].mimetype
        );
        console.log(
          "Follow-up file:",
          followUpImageFile[0].originalFilename,
          followUpImageFile[0].mimetype
        );

        // Create form data using form-data package instead of formdata-node
        const formData = new FormData();

        // Add files to form data with exact parameter names matching FastAPI
        formData.append(
          "baseline_file",
          fs.createReadStream(baselineImageFile[0].filepath),
          {
            filename: baselineImageFile[0].originalFilename || "baseline.jpg",
            contentType: baselineImageFile[0].mimetype || "image/jpeg",
          }
        );

        formData.append(
          "followup_file",
          fs.createReadStream(followUpImageFile[0].filepath),
          {
            filename: followUpImageFile[0].originalFilename || "followup.jpg",
            contentType: followUpImageFile[0].mimetype || "image/jpeg",
          }
        );

        console.log("Sending request to Python backend...");

        // Try connecting to Python backend with explicit IP
        const pythonUrl = `${process.env.PYTHON_BACKEND_API}/compare`;
        console.log("Using Python backend URL:", pythonUrl);

        // Use axios instead of node-fetch
        const pythonResponse = await axios.post(pythonUrl, formData, {
          headers: {
            ...formData.getHeaders(),
          },
          timeout: 30000,
        });

        console.log("Received successful response from Python backend");

        res.status(200).json(pythonResponse.data);
        resolve();
      } catch (error) {
        console.error("Error processing request:", error);

        // Provide more detailed error message
        let errorMessage = "Failed to process images";
        let details = undefined;

        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Python backend error response:", error.response.data);
          errorMessage = "Backend responded with error";
          details =
            process.env.NODE_ENV === "development"
              ? `Status: ${error.response.status}, Data: ${JSON.stringify(
                  error.response.data
                )}`
              : undefined;
        } else if (error.request) {
          // The request was made but no response was received
          errorMessage = "No response from backend server";
          details =
            process.env.NODE_ENV === "development"
              ? "Connection failed or timed out"
              : undefined;
        } else {
          // Something happened in setting up the request that triggered an Error
          details =
            process.env.NODE_ENV === "development" ? error.message : undefined;
        }

        res.status(500).json({ error: errorMessage, details });
        resolve();
      } finally {
        // Clean up temporary files
        if (files.baselineImage?.[0]?.filepath) {
          try {
            fs.unlinkSync(files.baselineImage[0].filepath);
          } catch (error) {
            console.error("Error deleting temporary file:", error);
          }
        }

        if (files.followUpImage?.[0]?.filepath) {
          try {
            fs.unlinkSync(files.followUpImage[0].filepath);
          } catch (error) {
            console.error("Error deleting temporary file:", error);
          }
        }
      }
    });
  });
}
