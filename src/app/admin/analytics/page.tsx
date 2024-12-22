'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Users, Eye, Clock, ArrowUp, Home, Book, Component, FileText, CreditCard, ExternalLink } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

interface AnalyticsData {
  totalVisits: number
  uniqueVisitors: number
  hourlyVisits: { hour: string; visits: number }[]
  popularPages: { path: string; visits: number }[]
  recentVisits: {
    ip: string
    userAgent: string
    path: string
    pageTitle: string
    timestamp: number
  }[]
}

// Page icon mapping
const PAGE_ICONS: Record<string, any> = {
  '/': Home,
  '/components': Component,
  '/docs': Book,
  '/blog': FileText,
  '/pricing': CreditCard
}

function getPageIcon(path: string) {
  const Icon = PAGE_ICONS[path] || ExternalLink
  return Icon
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      // Initial fetch
      fetchAnalytics()
      
      // Set up polling every 30 seconds
      const interval = setInterval(fetchAnalytics, 30000)
      
      return () => clearInterval(interval)
    }
  }, [isAuthenticated])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/admin/analytics', {
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to fetch analytics')
      }
      
      const analyticsData = await response.json()
      setData(analyticsData)
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Visits"
            value={data?.totalVisits || 0}
            icon={Eye}
            trend={+12}
          />
          <StatsCard
            title="Unique Visitors"
            value={data?.uniqueVisitors || 0}
            icon={Users}
            trend={+8}
          />
          <StatsCard
            title="Avg. Time on Site"
            value="3m 45s"
            icon={Clock}
            trend={-2}
          />
        </div>

        {/* Hourly Visits Chart */}
        <div className="p-6 rounded-xl bg-white/5 border border-white/10 mb-8">
          <h2 className="text-xl font-semibold mb-6">Hourly Traffic</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.hourlyVisits || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="hour" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="visits" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Popular Pages & Recent Visits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h2 className="text-xl font-semibold mb-4">Popular Pages</h2>
            <div className="space-y-4">
              {data?.popularPages?.map((page, i) => {
                const Icon = getPageIcon(page.path)
                return (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white/5 text-blue-400 group-hover:bg-white/10 transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-sm font-medium">{page.path === '/' ? 'Home' : page.path.slice(1)}</span>
                        <div className="text-xs text-white/50">{page.visits} visits</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-white/50">
                      <span className="text-sm">{page.visits}</span>
                      <ArrowUp className="w-4 h-4" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h2 className="text-xl font-semibold mb-4">Recent Visits</h2>
            <div className="space-y-4">
              {data?.recentVisits?.map((visit, i) => {
                const Icon = getPageIcon(visit.path)
                return (
                  <div
                    key={i}
                    className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-white/5 text-blue-400 group-hover:bg-white/10 transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium truncate">
                            {visit.pageTitle || (visit.path === '/' ? 'Home' : visit.path.slice(1))}
                          </span>
                          <span className="text-xs text-white/50 whitespace-nowrap ml-2">
                            {new Date(visit.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="flex gap-2 text-xs text-white/50">
                          <span className="truncate">{visit.ip}</span>
                          <span>•</span>
                          <span className="truncate">{visit.userAgent}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatsCard({
  title,
  value,
  icon: Icon,
  trend
}: {
  title: string
  value: number | string
  icon: any
  trend: number
}) {
  return (
    <div className="p-6 rounded-xl bg-white/5 border border-white/10">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm text-white/70 mb-1">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
        <div className="p-2 rounded-lg bg-white/5">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="flex items-center gap-1 text-sm">
        <div className={`flex items-center ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
          <ArrowUp
            className={`w-4 h-4 ${trend < 0 ? 'rotate-180' : ''}`}
          />
          <span>{Math.abs(trend)}%</span>
        </div>
        <span className="text-white/50">vs last week</span>
      </div>
    </div>
  )
}
