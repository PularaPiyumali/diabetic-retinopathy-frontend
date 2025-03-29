import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const patientData = await req.json();

    //Connect to MongoDB
    const { db } = await connectToDatabase();

    //Add timestamp
    const patientWithTimestamp = {
      ...patientData,
      createdAt: new Date(),
    };

    //Insert patient data
    const result = await db
      .collection("patients")
      .insertOne(patientWithTimestamp);

    return NextResponse.json({
      success: true,
      patientId: result.insertedId,
      message: "Patient data saved successfully",
    });
  } catch (error) {
    console.error("Error saving patient data:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to save patient data",
      },
      { status: 500 }
    );
  }
}
