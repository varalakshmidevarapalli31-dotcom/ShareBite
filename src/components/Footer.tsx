import { UtensilsCrossed, Github, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <UtensilsCrossed className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Share<span className="text-orange-500">Bite</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Order food, split bills with friends, and enjoy delicious meals
              delivered to your door.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Company</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-orange-400 cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-orange-400 cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-orange-400 cursor-pointer transition-colors">Blog</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Support</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-orange-400 cursor-pointer transition-colors">Help Center</li>
              <li className="hover:text-orange-400 cursor-pointer transition-colors">Safety</li>
              <li className="hover:text-orange-400 cursor-pointer transition-colors">Terms of Service</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Connect</h3>
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-500 cursor-pointer transition-colors">
                <Github className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © 2026 ShareBite. College demo project — no real payments, orders, or delivery.
          </p>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-orange-500" /> for demonstration
          </p>
        </div>
      </div>
    </footer>
  );
}
