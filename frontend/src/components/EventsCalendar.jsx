import { useState, useMemo } from 'react'
import './EventsCalendar.css'

const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const TYPE_COLORS = {
  speaker: '#1A5E8A',
  tabling: '#2D7A3A',
  screening: '#7B2D8B',
  rally: '#C0392B',
  workshop: '#B5701A',
}

function startOfMonth(d) {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

function dayKey(d) {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
}

function generateGrid(monthStart) {
  const first = monthStart
  const firstDow = first.getDay()
  const days = []
  // Lead-in from previous month
  for (let i = firstDow; i > 0; i--) {
    days.push(new Date(first.getFullYear(), first.getMonth(), 1 - i))
  }
  // Current month
  const lastDay = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate()
  for (let d = 1; d <= lastDay; d++) {
    days.push(new Date(first.getFullYear(), first.getMonth(), d))
  }
  // Trailing days to fill out 6 weeks (42 cells)
  while (days.length < 42) {
    const last = days[days.length - 1]
    days.push(new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1))
  }
  return days
}

export default function EventsCalendar({ events, onSelectEvent }) {
  const [view, setView] = useState(startOfMonth(new Date()))

  const grid = useMemo(() => generateGrid(view), [view])

  const eventsByDate = useMemo(() => {
    const map = {}
    events.forEach(ev => {
      const d = new Date(ev.starts_at)
      const k = dayKey(d)
      if (!map[k]) map[k] = []
      map[k].push(ev)
    })
    // Sort events within each day by start time
    Object.values(map).forEach(arr => arr.sort((a, b) => new Date(a.starts_at) - new Date(b.starts_at)))
    return map
  }, [events])

  const prev   = () => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))
  const next   = () => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))
  const today  = () => setView(startOfMonth(new Date()))

  const todayKey = dayKey(new Date())

  return (
    <div className="calendar">
      <div className="calendar__header">
        <h2 className="calendar__title">{MONTH_NAMES[view.getMonth()]} {view.getFullYear()}</h2>
        <div className="calendar__nav">
          <button onClick={today} className="calendar__btn calendar__btn--today">Today</button>
          <button onClick={prev}  className="calendar__btn" aria-label="Previous month">←</button>
          <button onClick={next}  className="calendar__btn" aria-label="Next month">→</button>
        </div>
      </div>

      <div className="calendar__dow">
        {DOW.map(d => <div key={d}>{d}</div>)}
      </div>

      <div className="calendar__grid">
        {grid.map((d, i) => {
          const inMonth = d.getMonth() === view.getMonth()
          const isToday = dayKey(d) === todayKey
          const dayEvents = eventsByDate[dayKey(d)] || []
          return (
            <div key={i} className={`day ${inMonth ? '' : 'day--outside'} ${isToday ? 'day--today' : ''}`}>
              <span className="day__num">{d.getDate()}</span>
              <div className="day__events">
                {dayEvents.map(ev => (
                  <button
                    key={ev.id}
                    className="event-pill"
                    style={{ background: TYPE_COLORS[ev.event_type] || '#555' }}
                    onClick={() => onSelectEvent(ev)}
                    title={ev.title}
                  >
                    {ev.title}
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
