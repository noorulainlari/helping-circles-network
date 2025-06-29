export default function CirclesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Circles</h1>
          <p className="text-gray-600">Find and join communities that match your interests</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Tech Innovators</h3>
            <p className="text-gray-600 mb-4">A community for technology enthusiasts and innovators</p>
            <div className="flex justify-between items-center">
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Technology</span>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
                Join Circle
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Sustainable Living</h3>
            <p className="text-gray-600 mb-4">Learn and share tips for eco-friendly living</p>
            <div className="flex justify-between items-center">
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Environment</span>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
                Join Circle
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Creative Writers</h3>
            <p className="text-gray-600 mb-4">Support and feedback for aspiring writers</p>
            <div className="flex justify-between items-center">
              <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">Arts & Culture</span>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
                Join Circle
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Fitness Accountability</h3>
            <p className="text-gray-600 mb-4">Stay motivated on your fitness journey</p>
            <div className="flex justify-between items-center">
              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Health & Wellness</span>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
                Join Circle
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Entrepreneur Network</h3>
            <p className="text-gray-600 mb-4">Connect with fellow entrepreneurs and business owners</p>
            <div className="flex justify-between items-center">
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Business</span>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
                Join Circle
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Language Exchange</h3>
            <p className="text-gray-600 mb-4">Practice languages with native speakers</p>
            <div className="flex justify-between items-center">
              <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">Education</span>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
                Join Circle
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
