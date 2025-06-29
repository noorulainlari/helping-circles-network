export default function CirclesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Circles</h1>
          <p className="text-gray-600 mb-8">Find and join communities that match your interests</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Tech Innovators</h3>
              <p className="text-gray-600 mb-4">A community for technology enthusiasts and innovators</p>
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Technology</span>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Sustainable Living</h3>
              <p className="text-gray-600 mb-4">Learn and share tips for eco-friendly living</p>
              <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                Environment
              </span>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Creative Writers</h3>
              <p className="text-gray-600 mb-4">Support and feedback for aspiring writers</p>
              <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                Arts & Culture
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
