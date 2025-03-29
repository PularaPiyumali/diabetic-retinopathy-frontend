import Image from "next/image"
import { Star } from "lucide-react"

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Dr. Jane Smith",
      role: "Ophthalmologist",
      content:
        "This platform has revolutionized how we detect and monitor DR. It's incredibly accurate and user-friendly.",
      rating: 5,
    },
    {
      name: "John Doe",
      role: "Patient",
      content: "Thanks to this service, my DR was caught early. The regular monitoring gives me peace of mind.",
      rating: 5,
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">What People Are Saying</h2>
        <div className="flex flex-wrap justify-center">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="w-full md:w-1/2 p-4">
              <div className="bg-gray-50 rounded-lg shadow p-6">
                <div className="flex items-center mb-4">
                  <Image
                    src="/placeholder.svg"
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{testimonial.content}</p>
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection

