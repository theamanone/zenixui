'use client'

import { useTheme } from '@/components/theme-provider'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for personal projects',
    features: [
      'Access to all components',
      'Basic documentation',
      'Community support',
      'GitHub access',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$29',
    description: 'Best for professional developers',
    features: [
      'Everything in Free',
      'Premium components',
      'Priority support',
      'Private Discord',
      'Remove attribution',
      'Team collaboration',
    ],
    cta: 'Start Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations',
    features: [
      'Everything in Pro',
      'Custom components',
      'Dedicated support',
      'SLA',
      'Custom branding',
      'Volume licensing',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
]

export default function PricingPage() {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen pt-16 ${
      theme === 'dark' ? 'bg-[#0c0a3e]' : 'bg-gray-50'
    }`}>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className={`text-4xl font-bold mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Simple, transparent pricing
          </h1>
          <p className={`text-lg ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Choose the perfect plan for your needs. Always know what you'll pay.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-2xl border ${
                plan.popular
                  ? theme === 'dark'
                    ? 'border-[#6366f1] bg-[#2d2b70]'
                    : 'border-[#6366f1] bg-white'
                  : theme === 'dark'
                  ? 'border-[#2d2b70] bg-[#2d2b70]/50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="px-4 py-1 text-xs font-medium rounded-full bg-[#6366f1] text-white">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <h3 className={`text-xl font-bold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-4 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <span className={`text-4xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {plan.price}
                  </span>
                  {plan.price !== 'Custom' && (
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      /month
                    </span>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className={`w-5 h-5 ${
                        plan.popular ? 'text-[#6366f1]' : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                      <span className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${
                    plan.popular
                      ? 'bg-[#6366f1] text-white hover:bg-[#6366f1]/90'
                      : theme === 'dark'
                      ? 'bg-white/10 text-white hover:bg-white/20'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
