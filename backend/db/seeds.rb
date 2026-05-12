# db/seeds.rb
puts "Seeding database..."

# Admin user
Member.find_or_create_by(email: "admin@mama-california.org") do |m|
  m.first_name = "Admin"
  m.last_name  = "User"
  m.password   = "changeme123!"
  m.is_admin   = true
  m.city       = "Los Angeles"
end

# Sample chapters
[
  { name: "MAMA Santa Monica", city: "Santa Monica", district: "41st Assembly", county: "Los Angeles", contact_name: "Chapter Leader", contact_email: "santamonica@mama-california.org" },
  { name: "MAMA West Hollywood", city: "West Hollywood", district: "50th Assembly", county: "Los Angeles" },
  { name: "MAMA San Francisco", city: "San Francisco", district: "17th Assembly", county: "San Francisco" },
  { name: "MAMA Bay Area", city: "Oakland", district: "18th Assembly", county: "Alameda" },
  { name: "MAMA San Diego", city: "San Diego", district: "78th Assembly", county: "San Diego" },
].each { |attrs| Chapter.find_or_create_by(name: attrs[:name]).update(attrs) }

# Sample events
[
  {
    title: "Santa Monica Farmers Market Tabling",
    description: "Join us at the Wednesday Santa Monica Farmers Market! We'll be sharing information about screen addiction and how parents can get involved with MAMA California.",
    event_type: "tabling",
    starts_at: 2.weeks.from_now.change(hour: 9),
    ends_at: 2.weeks.from_now.change(hour: 13),
    location_name: "Santa Monica Farmers Market",
    address: "Arizona Ave & 2nd St",
    city: "Santa Monica",
    state: "CA",
    published: true
  },
  {
    title: "Speaker Series: Kids, Screens & Mental Health",
    description: "Join us for an evening with Dr. Jean Twenge and other leading experts on the mental health crisis facing our children. Learn what the research says and what you can do.",
    event_type: "speaker",
    starts_at: 3.weeks.from_now.change(hour: 18, min: 30),
    ends_at: 3.weeks.from_now.change(hour: 20, min: 30),
    location_name: "Santa Monica Public Library",
    address: "601 Santa Monica Blvd",
    city: "Santa Monica",
    state: "CA",
    rsvp_url: "https://mobilize.us",
    published: true
  },
  {
    title: "Can't Look Away Screening",
    description: "A powerful documentary screening followed by community discussion. Bring a friend! Light refreshments will be served.",
    event_type: "screening",
    starts_at: 5.weeks.from_now.change(hour: 19),
    ends_at: 5.weeks.from_now.change(hour: 21, min: 30),
    location_name: "Laemmle Monica Film Center",
    address: "1332 2nd St",
    city: "Santa Monica",
    state: "CA",
    published: true
  },
].each { |attrs| Event.find_or_create_by(title: attrs[:title]).update(attrs) }

# Sample news items
[
  {
    title: "Meta Seeks to Block Data on Social Media Use and Mental Health in Child Safety Trial",
    summary: "In a major ongoing trial, Meta has attempted to exclude evidence linking its platforms to mental health harms in minors.",
    source_name: "Ars Technica",
    source_url: "https://arstechnica.com/tech-policy/2026/01/meta-wants-to-block-data-about-social-media-use-mental-health-in-child-safety-trial/",
    category: "litigation",
    published_date: Date.new(2026, 1, 15),
    featured: true,
    published: true
  },
  {
    title: "US Appeals Court Skeptical of Meta's Bid to Cut Off Social Media Cases",
    summary: "A federal appeals court signaled doubt about social media companies' efforts to dismiss thousands of lawsuits alleging harm to minors.",
    source_name: "Reuters",
    source_url: "https://www.reuters.com/legal/litigation/us-appeals-court-appears-skeptical-meta-social-media-companies-bid-cut-off-2026-01-06/",
    category: "litigation",
    published_date: Date.new(2026, 1, 6),
    published: true
  },
  {
    title: "High Stakes as Country's First Social Media Addiction Trial Nears",
    summary: "Snap settles as the landmark social media addiction trial approaches, signaling a potential shift in industry accountability.",
    source_name: "AEI",
    source_url: "https://ctse.aei.org/high-stakes-as-countrys-first-social-media-addiction-trial-nears-and-snap-settles/",
    category: "litigation",
    published_date: Date.new(2026, 1, 10),
    featured: true,
    published: true
  },
  {
    title: "Nearly a Third of Kids Can't Use Books When Starting School",
    summary: "New research shows many young children try to swipe physical books like touchscreens, reflecting the depth of screen immersion from infancy.",
    source_name: "Sky News",
    source_url: "https://news.sky.com/story/nearly-a-third-of-kids-cant-use-books-when-starting-school-and-try-to-swipe-them-like-phones-13497398",
    category: "press",
    published_date: Date.new(2026, 1, 20),
    published: true
  },
].each { |attrs| NewsItem.find_or_create_by(title: attrs[:title]).update(attrs) }

# Sample resources
[
  {
    title: "Demystifying Social Media Addiction Litigation",
    description: "A comprehensive overview of the legal landscape around social media addiction claims and what it means for families.",
    resource_type: "article",
    url: "https://www.aei.org/technology-and-innovation/demystifying-social-media-addiction-litigation/",
    source: "AEI",
    topic: "litigation",
    featured: true,
    published: true
  },
  {
    title: "Why Wait Until 13 to Give Your Child a Phone",
    description: "Evidence-based guidance for parents on the right age to introduce smartphones and the risks of doing so too early.",
    resource_type: "guide",
    topic: "parenting",
    featured: true,
    published: true
  },
  {
    title: "Parent-Child Phone Contract Template",
    description: "A customizable contract you can use with your child when introducing a smartphone, setting clear expectations around use.",
    resource_type: "guide",
    topic: "parenting",
    published: true
  },
  {
    title: "AI Emotional Reliance in Gen Z",
    description: "Research on conversational AI models fostering emotional dependence, with 1 in 3 Gen Z users reporting intimate relationships with AI.",
    resource_type: "study",
    url: "https://arxiv.org/abs/2512.15117",
    topic: "ai_safety",
    published: true
  },
  {
    title: "The Anxious Generation — Jonathan Haidt",
    description: "The definitive book on how smartphones and social media have rewired childhood and triggered a mental health crisis.",
    resource_type: "book",
    author: "Jonathan Haidt",
    url: "https://www.anxiousgeneration.com/book",
    topic: "mental_health",
    featured: true,
    published: true
  },
].each { |attrs| Resource.find_or_create_by(title: attrs[:title]).update(attrs) }

# Sample speakers
[
  { name: "Meredith Broussard", title: "Professor", organization: "NYU", topic: "AI & Kids", status: "suggested" },
  { name: "Emily Cherkin", title: "Parenting Coach", organization: "The Screentime Consultant", topic: "Kids and Media Addiction", status: "contacted" },
  { name: "Lenore Skenazy", title: "President", organization: "Let Grow", topic: "Real World Experiences", status: "suggested" },
  { name: "Jonathan Haidt", title: "Professor", organization: "NYU Stern / FIRE", topic: "Youth Mental Health & Social Media", status: "suggested" },
].each { |attrs| Speaker.find_or_create_by(name: attrs[:name]).update(attrs) }

puts "Done! Seed data created."
