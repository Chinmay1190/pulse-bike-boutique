
export default function TestimonialSection() {
  const testimonials = [
    {
      quote: "The service was outstanding, and the motorcycle I purchased exceeded all my expectations. Truly a premium shopping experience.",
      author: "Rajesh Kumar",
      title: "Professional Rider",
      avatar: "/placeholder.svg",
    },
    {
      quote: "I've been a motorcycle enthusiast for years, and this is by far the best online superbike store in India. Great selection and excellent customer service.",
      author: "Priya Singh",
      title: "Motovlogger",
      avatar: "/placeholder.svg",
    },
    {
      quote: "The checkout process was seamless, and my new bike was delivered right on time. Couldn't ask for a better experience.",
      author: "Vikram Mehta",
      title: "Racing Enthusiast",
      avatar: "/placeholder.svg",
    },
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Hear from bike enthusiasts who've experienced our service and products.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-card p-8 rounded-lg border shadow-sm animate-zoom-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-6">
                <svg
                  className="h-8 w-8 text-primary opacity-50"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
              </div>
              
              <p className="mb-6">{testimonial.quote}</p>
              
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="h-10 w-10 rounded-full object-cover mr-3"
                />
                <div>
                  <h4 className="font-medium">{testimonial.author}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
