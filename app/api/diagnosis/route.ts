import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const diagnosisData = await req.json();

    // Connect to MongoDB
    const { db } = await connectToDatabase();

    // Add timestamp
    const diagnosisWithTimestamp = {
      ...diagnosisData,
      createdAt: new Date(),
    };

    // Insert diagnosis data
    const result = await db
      .collection("diagnoses")
      .insertOne(diagnosisWithTimestamp);

    return NextResponse.json({
      success: true,
      diagnosisId: result.insertedId,
      message: "Diagnosis data saved successfully",
    });
  } catch (error) {
    console.error("Error saving diagnosis data:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to save diagnosis data",
      },
      { status: 500 }
    );
  }
}
