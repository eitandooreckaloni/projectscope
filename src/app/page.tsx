'use client'

import { useState, useEffect } from 'react'

// Mock data for demonstration
const mockProjects = [
  { id: 1, name: 'AppFactory', color: '#3B82F6', percentage: 65 },
  { id: 2, name: 'ClientX', color: '#EF4444', percentage: 25 },
  { id: 3, name: 'Personal', color: '#10B981', percentage: 10 }
]

const mockActivities = [
  { time: '09:15', project: 'AppFactory', activity: 'Git commit to shelter-science repo', duration: '45m', confidence: 95 },
  { time: '10:00', project: 'AppFactory', activity: 'Slack discussion about deployment', duration: '20m', confidence: 88 },
  { time: '10:20', project: 'ClientX', activity: 'Email thread with project stakeholders', duration: '15m', confidence: 92 },
  { time: '10:35', project: 'AppFactory', activity: 'Calendar meeting: ProjectScope planning', duration: '1h 30m', confidence: 98 },
  { time: '12:05', project: 'Personal', activity: 'WhatsApp messages (personal)', duration: '10m', confidence: 85 },
  { time: '12:15', project: 'ClientX', activity: 'GitHub commits to client-dashboard repo', duration: '2h 15m', confidence: 97 }
]

const mockCosts = {
  total: 156.80,
  breakdown: [
    { project: 'AppFactory', amount: 98.20, items: ['Claude API: $75.20', 'OpenAI API: $15.00', 'Vercel: $8.00'] },
    { project: 'ClientX', amount: 41.60, items: ['Claude API: $35.20', 'Database: $6.40'] },
    { project: 'Personal', amount: 17.00, items: ['Personal subscriptions: $17.00'] }
  ]
}

export default function Home() {
  const [currentTime, setCurrentTime] = useState('')
  const [totalHours, setTotalHours] = useState(0)

  useEffect(() => {
    const now = new Date()
    setCurrentTime(now.toLocaleString())
    
    // Calculate total hours from mock activities
    let total = 0
    mockActivities.forEach(activity => {
      const duration = activity.duration
      if (duration.includes('h')) {
        const hours = parseInt(duration.split('h')[0])
        total += hours
        if (duration.includes('m')) {
          const minutes = parseInt(duration.split('h')[1].replace('m', '').trim())
          total += minutes / 60
        }
      } else if (duration.includes('m')) {
        const minutes = parseInt(duration.replace('m', ''))
        total += minutes / 60
      }
    })
    setTotalHours(Math.round(total * 10) / 10)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/80 backdrop-blur">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-blue-400">ProjectScope</h1>
              <p className="text-slate-400">Automatic Time & Cost Tracking</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-400">Live Demo</p>
              <p className="text-xs text-slate-500">{currentTime}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Today's Summary */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-slate-200">Today's Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
              <h3 className="text-lg font-medium text-slate-200 mb-2">Total Time</h3>
              <p className="text-3xl font-bold text-blue-400">{totalHours}h</p>
              <p className="text-sm text-slate-400">Across {mockProjects.length} projects</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
              <h3 className="text-lg font-medium text-slate-200 mb-2">Total Costs</h3>
              <p className="text-3xl font-bold text-green-400">${mockCosts.total}</p>
              <p className="text-sm text-slate-400">API + Tools</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
              <h3 className="text-lg font-medium text-slate-200 mb-2">AI Confidence</h3>
              <p className="text-3xl font-bold text-purple-400">92%</p>
              <p className="text-sm text-slate-400">Average accuracy</p>
            </div>
          </div>
        </div>

        {/* Project Time Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
            <h3 className="text-lg font-medium text-slate-200 mb-4">Project Time Distribution</h3>
            <div className="space-y-4">
              {mockProjects.map(project => (
                <div key={project.id}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-200">{project.name}</span>
                    <span className="text-slate-400">{project.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${project.percentage}%`,
                        backgroundColor: project.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
            <h3 className="text-lg font-medium text-slate-200 mb-4">Cost Breakdown</h3>
            <div className="space-y-4">
              {mockCosts.breakdown.map(item => (
                <div key={item.project} className="border-b border-slate-700 pb-3 last:border-b-0">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-200 font-medium">{item.project}</span>
                    <span className="text-green-400 font-semibold">${item.amount}</span>
                  </div>
                  <div className="text-xs text-slate-400 space-y-1">
                    {item.items.map((cost, idx) => (
                      <div key={idx}>• {cost}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-medium text-slate-200 mb-4">Today's Activity Timeline</h3>
          <div className="space-y-3">
            {mockActivities.map((activity, idx) => (
              <div key={idx} className="flex items-center space-x-4 p-3 bg-slate-700/30 rounded-lg">
                <div className="text-sm text-slate-400 w-16">{activity.time}</div>
                <div 
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: mockProjects.find(p => p.name === activity.project)?.color }}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-200 font-medium">{activity.project}</span>
                    <div className="flex items-center space-x-3">
                      <span className="text-slate-400 text-sm">{activity.duration}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-green-900/50 text-green-400">
                        {activity.confidence}% confidence
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-400 mt-1">{activity.activity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Demo */}
        <div className="mt-8 bg-slate-800/50 rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-medium text-slate-200 mb-4">🧠 How It Works (Demo)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-blue-400 mb-2">🔄 Automatic Classification</h4>
              <ul className="text-sm text-slate-300 space-y-2">
                <li>• Git commits → Project time mapping</li>
                <li>• Email contacts → Client project detection</li>
                <li>• Calendar attendees → Meeting project assignment</li>
                <li>• Slack channels → Team communication tracking</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-green-400 mb-2">💰 Smart Cost Allocation</h4>
              <ul className="text-sm text-slate-300 space-y-2">
                <li>• API costs during active project work</li>
                <li>• Tool subscriptions by usage patterns</li>
                <li>• Time-based cost distribution</li>
                <li>• Real-time budget tracking</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-8 border border-blue-500/30">
            <h3 className="text-xl font-bold text-slate-200 mb-2">Zero Manual Input Required</h3>
            <p className="text-slate-400 mb-4">
              Connect your Git, Calendar, Email, WhatsApp, and Slack.<br/>
              Get instant insights into where your time and money actually go.
            </p>
            <p className="text-sm text-slate-500">
              This is a live demo. The full system will learn your patterns automatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}