"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "What is Diabetic Retinopathy?",
      answer:
        "Diabetic Retinopathy is a diabetes complication that affects the eyes. It's caused by damage to the blood vessels of the light-sensitive tissue at the back of the eye (retina).",
    },
    {
      question: "How accurate is the AI-powered DR detection?",
      answer:
        "Our AI model has been trained on a large dataset of retinal images and has shown high accuracy in clinical trials. However, it's important to note that it's designed to assist, not replace, professional medical diagnosis.",
    },
    {
      question: "How often should I use the DR monitoring service?",
      answer:
        "The frequency of monitoring depends on your individual case. Generally, we recommend annual check-ups for those with no or mild DR, and more frequent monitoring for those with more advanced stages. Always follow your doctor's recommendations.",
    },
    {
      question: "Is my medical data secure?",
      answer:
        "Yes, we take data security very seriously. All your medical data is encrypted and stored securely in compliance with HIPAA regulations. We never share your personal information without your explicit consent.",
    },
    {
      question: "Can I use this service instead of visiting my doctor?",
      answer:
        "No, this service is not a substitute for regular check-ups with your eye care professional. It's designed to be a complementary tool to help with early detection and monitoring between visits.",
    },
  ]

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <button
              className="flex justify-between items-center w-full p-4 text-left"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span className="font-semibold">{faq.question}</span>
              {openIndex === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {openIndex === index && (
              <div className="p-4 bg-gray-50">
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQPage

