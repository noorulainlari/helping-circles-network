export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Helping Circles</h1>
            <nav className="space-x-6">
              <a href="/about" className="text-gray-600 hover:text-gray-900">
                About
              </a>
              <a href="/circles" className="text-gray-600 hover:text-gray-900">
                Circles
              </a>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Get Started</button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Connect, Support, and <span className="text-blue-600">Grow Together</span>
          </h2>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join meaningful helping circles where people support each other's goals, share resources, and build lasting
            connections.
          </p>

          <div className="flex justify-center space-x-4 mb-16">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-700">
              Start Your Circle
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-md text-lg font-medium hover:bg-gray-50">
              Browse Circles
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">10,000+ Members</h3>
              <p className="text-gray-600">Active community members</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">500+ Circles</h3>
              <p className="text-gray-600">Active helping circles</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">50+ Countries</h3>
              <p className="text-gray-600">Global community reach</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <h3 className="text-xl font-bold mb-4">Helping Circles</h3>
              <p className="text-gray-400 mb-4">Building meaningful connections and supportive communities.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="/circles">Browse Circles</a>
                </li>
                <li>
                  <a href="/create">Create Circle</a>
                </li>
                <li>
                  <a href="/events">Events</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="/about">About</a>
                </li>
                <li>
                  <a href="/contact">Contact</a>
                </li>
                <li>
                  <a href="/privacy">Privacy</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Helping Circles Network. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
