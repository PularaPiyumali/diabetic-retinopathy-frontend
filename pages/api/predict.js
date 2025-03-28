import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  return new Promise((resolve, reject) => {
    const form = formidable({
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Error", err);
        res.status(500).json({ error: "Error parsing form" });
        return resolve();
      }

      try {
        const imageFile = files.image;
        if (!imageFile) {
          res.status(400).json({ error: "No image file uploaded" });
          return resolve();
        }

        //Create form data to send to Python backend
        const formDataToSend = new FormData();

        //Read the file content and create a Blob
        const fileContent = fs.readFileSync(imageFile[0].filepath);
        const fileName = imageFile[0].originalFilename || "image.jpg";

        //Create a Blob object
        const blob = new Blob([fileContent], {
          type: imageFile[0].mimetype || "image/jpeg",
        });

        //Append the blob to form data with the original filename
        formDataToSend.append("file", blob, fileName);

        console.log("Sending request to Python backend...");
        const pythonResponse = await fetch(
          `${process.env.PYTHON_BACKEND_API}/predict`,
          {
            method: "POST",
            body: formDataToSend,
          }
        );

        if (!pythonResponse.ok) {
          throw new Error(
            `Python backend responded with status: ${pythonResponse.status}`
          );
        }

        const result = await pythonResponse.json();
        res.status(200).json(result);
        resolve();
      } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({
          error: "Failed to process image",
          details:
            process.env.NODE_ENV === "development" ? error.message : undefined,
        });
        resolve();
      } finally {
        //Clean up temporary files
        if (files.image?.[0]?.filepath) {
          try {
            fs.unlinkSync(files.image[0].filepath);
          } catch (error) {
            console.error("Error deleting temporary file:", error);
          }
        }
      }
    });
  });
}
