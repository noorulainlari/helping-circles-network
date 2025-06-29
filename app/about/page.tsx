export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">About Helping Circles</h1>

          <div className="prose prose-lg mx-auto">
            <p className="text-xl text-gray-600 mb-8 text-center">
              We believe in the power of community and mutual support to create positive change in the world.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                <p className="text-gray-600">
                  To connect people who want to help each other grow, learn, and make a positive impact in their
                  communities and beyond.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
                <p className="text-gray-600">
                  A world where everyone has access to supportive communities that help them achieve their goals and
                  contribute to the greater good.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
