import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="container mx-auto px-6 py-8 pt-20">
      <h1 className="text-3xl font-bold mb-8">About PrismEye</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-6">
            At PrismEye, our mission is to revolutionize the detection and
            monitoring of Diabetic Retinopathy through innovative AI-powered
            solutions. We aim to make early diagnosis accessible to all,
            improving outcomes for patients worldwide.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
          <p className="text-gray-700 mb-6">
            We envision a world where no one loses their sight to Diabetic
            Retinopathy. By combining cutting-edge technology with medical
            expertise, we strive to be at the forefront of eye care innovation.
          </p>
        </div>
        <div>
          <Image
            src="/images/hero-2.jpg"
            alt="DR Care Team"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
      {/* <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Dr. Emily Johnson", role: "Chief Medical Officer" },
            { name: "Michael Chen", role: "AI Research Lead" },
            { name: "Sarah Thompson", role: "Product Manager" },
          ].map((member, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6">
              <Image
                src="/placeholder.svg"
                alt={member.name}
                width={100}
                height={100}
                className="rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-center">
                {member.name}
              </h3>
              <p className="text-gray-600 text-center">{member.role}</p>
            </div>
          ))}
        </div>
      </div> */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Our Partners</h2>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {[1, 2, 3, 4].map((partner) => (
            <Image
              key={partner}
              src={`/images/logo${partner}.jpg`} // Change to your actual logo paths
              alt={`Partner ${partner}`}
              width={150}
              height={75}
              className="grayscale hover:grayscale-0 transition-all duration-300"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
