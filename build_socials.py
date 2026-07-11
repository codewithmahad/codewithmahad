import os
import urllib.request

if not os.path.exists("assets/socials"):
    os.makedirs("assets/socials")

socials = [
    {"name": "LinkedIn", "slug": "linkedin", "color": "#0A66C2", "url": "https://www.linkedin.com/in/codewithmahad"},
    {"name": "Portfolio", "slug": "vercel", "color": "#9D34DA", "url": "https://shaikhmahad.vercel.app"},
    {"name": "GitHub", "slug": "github", "color": "#ffffff", "url": "https://github.com/codewithmahad"},
    {"name": "LeetCode", "slug": "leetcode", "color": "#FFA116", "url": "https://leetcode.com/u/mahad2006/"},
    {"name": "HackerRank", "slug": "hackerrank", "color": "#00EA64", "url": "https://www.hackerrank.com/codewithmahad"},
    {"name": "Codolio", "slug": "codolio", "color": "#525E96", "url": "https://codolio.com/profile/codewithmahad"},
    {"name": "GeeksforGeeks", "slug": "geeksforgeeks", "color": "#298D46", "url": "https://www.geeksforgeeks.org/user/codewithmahad/"},
    {"name": "Gmail", "slug": "gmail", "color": "#EA4335", "url": "mailto:codewithmahad@gmail.com"}
]

fallback_path = '<path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>'
linkedin_path = '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>'

for s in socials:
    slug = s["slug"]
    if slug == "codolio":
        path_data = fallback_path
    elif slug == "linkedin":
        path_data = linkedin_path
    else:
        # Use unpkg simple-icons raw SVG
        req = urllib.request.Request(f"https://unpkg.com/simple-icons@latest/icons/{slug}.svg", headers={'User-Agent': 'Mozilla/5.0'})
        try:
            with urllib.request.urlopen(req) as response:
                svg_data = response.read().decode('utf-8')
                # Extract the <path ... /> string
                start = svg_data.find('<path')
                end = svg_data.find('/>', start) + 2
                if end - start < 5: 
                    end = svg_data.find('></path>', start) + 8
                
                if start != -1 and end != -1:
                    path_data = svg_data[start:end]
                else:
                    inner_start = svg_data.find('>') + 1
                    inner_end = svg_data.rfind('</svg>')
                    path_data = svg_data[inner_start:inner_end]
        except Exception as e:
            print(f"Failed to fetch {slug}: {e}")
            path_data = fallback_path

    svg_template = f"""<svg width="210" height="70" viewBox="0 0 210 70" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="{s['color']}" flood-opacity="0.3"/>
    </filter>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#252525"/>
      <stop offset="100%" stop-color="#151515"/>
    </linearGradient>
    <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="{s['color']}" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="{s['color']}" stop-opacity="0.3"/>
    </linearGradient>
  </defs>
  <rect x="10" y="10" width="190" height="50" rx="14" fill="url(#grad)" filter="url(#shadow)"/>
  <rect x="10.5" y="10.5" width="189" height="49" rx="13.5" fill="none" stroke="url(#glow)" stroke-width="1.5"/>
  
  <svg x="25" y="23" width="24" height="24" viewBox="0 0 24 24" fill="white">
    {path_data}
  </svg>
  
  <text x="62" y="36" font-family="'Inter', 'Segoe UI', sans-serif" font-weight="600" font-size="14.5" fill="#ffffff" dominant-baseline="middle" letter-spacing="0.5">{s['name']}</text>
</svg>"""

    with open(f"assets/socials/{s['name'].lower()}.svg", "w", encoding="utf-8") as f:
        f.write(svg_template)
    print(f"Generated {s['name']}.svg")
