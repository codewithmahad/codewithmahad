import html
import json
import urllib.request

def get_github_stats(username):
    stats = {"repos": "0", "stars": "0", "followers": "0", "following": "0"}
    try:
        # Fetch user profile
        url = f"https://api.github.com/users/{username}"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            user_data = json.loads(response.read())
            stats["repos"] = str(user_data.get("public_repos", 0))
            stats["followers"] = str(user_data.get("followers", 0))
            stats["following"] = str(user_data.get("following", 0))
        
        # Fetch repos for stars
        url_repos = f"https://api.github.com/users/{username}/repos?per_page=100"
        req_repos = urllib.request.Request(url_repos, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req_repos) as response:
            repos_data = json.loads(response.read())
            total_stars = sum(repo.get("stargazers_count", 0) for repo in repos_data)
            stats["stars"] = str(total_stars)
            
    except Exception as e:
        print("Error fetching GitHub stats:", e)
        # Fallback values if API limit is reached
        stats = {"repos": "N/A", "stars": "N/A", "followers": "N/A", "following": "N/A"}
    
    return stats

# Fetch actual stats for Mahad
gh_stats = get_github_stats("codewithmahad")

raw_ascii = """.............................................................................................................
.............................................................................................................
............................................                 ................................................
.......................................                             .........................................
....................................                                    .....................................
.................................                                         ...................................
................................                                           ..................................
...............................                                              ................................
..............................                                                ...............................
.............................                                                  ..............................
............................                               ..                ................................
...........................              .::--==++******##%%%%%#+=:            ..............................
...........................            =+-=====+++*#*#####%%%@@@@@@@%+         ..............................
...........................            -=+===--+++*****###%%%%@@@@@@@%+        ..............................
...........................            .=++=---=+**######%%%%%%%%%@@@@#        ..............................
...........................            -=+==+++*##%%%%%%@@%%@@@@@@@@@@*       ...............................
............................         =++=.      .=*#%%%%@@@@@@@@@@@@%%+       ...............................
............................        #***             .--**+**+=:..:-=%*      ................................
............................       -###+-=-:::.         ...          =#.    .................................
........................... .:     *%#*=.             :=*%:    .--.--=#+   ..................................
........................... ::.    ###+:    *  #@.    -%@@:      - . =%*   ..................................
...........................-+: :: +%##*#*+=-.    .. -=*%@@@+:   =@+:-=@*  -..................................
...........................+-     %%####%%###*+===++***#%@@%#*--:-+%@@@#.% ..................................
..........................:=:   - ####**####%####*==***#@@@@%@@%%%@@@@@@*@:..................................
..........................:.=. .: +*#*+++**#####*+:-*+#%%@@@##@@@@@@@@@%.+*..................................
...........................:. -- ..**+=++++++***+=:@*=--+*###@#%@@@@@@%# =*..................................
............................:*-    --====++++++=+*-      .   #@##%%%%%#*#*...................................
..............................--:  :=:::=====-==--=.    . .-%@@%#*###*=:=*...................................
..................................::-:-. ===-.   :..=*%@=*%#-+---***=.:*#....................................
................................... :.:.::==:                 .  :*+. .......................................
.................................... : ...:::.:---=-==*%%@@##%%*==+-.-.......................................
....................................   ....:.::----:     .-++*##+=:::........................................
....................................      .:-.:----::.  ..:=+***+=:: ........................................
....................................-        . ----+=--::-***#++--. .........................................
...................................=+:          .. . .:.-=:::=:..  ..........................................
.................................  @@:.                          +-..........................................
................................  @@@@+.                       :=*=..........................................
..............................    @@@@@@%                    .-=+*@@ ........................................
............................      *@@@@@@@@*              ..-=++@@@@.  ......................................
........................           @@@@@@@@@@@+        ::===+=@@@@@@@    ....................................
....................               -@@@@@@@@@@@@@@.:-====++:@@@@@@@@@         ...............................
................                    *@@@@@@@@@@@@@@@@+==: @@@@@@@@@@@             ...........................
............                         #@@@@@@@@@@@@@@=*##+ =@@@@@@@@@-                 .......................
........                             +@@@@@@@@@@@:     .::-=.+@@@@@@:                     ...................
.                                     @@@@@@@@@         .:== .-@@@@@*                           .............
                                      -@@@@@@=--.       .-=:-=::-@@@@                               .........
                                       +@@@@@@#*+-+      -+.@@#***@@@                                 .......
                                       .@@#@@@@@%#@*      :-@@@@@@@*#                                 .......
                                        @@@@@@@@@@@@+  -  -=@@@@@@@@%                                  ......
                                         @@@@@@@@@@@  .=  :=@@@@@@@@%.                                 ......
                                         @@@@@@@@@@    ::.-=:@@@@@@@%:                                  .....
                                          @@@@@@@@*  .   .-==-@@@@@@@:                                  .....
                                          +@@@@@@@:..    .-===@@@@@@%:                                   ....
                                           @@@@@@@ .     .:-===@@@@@%.                                   ....
                                           -@@@@@%       .:--==@@@@@%                                    ....
                                            @@@@@%      ..:---=*@@@@%                                     ...
                                             @@@@% .......::----@@@@#                                      ..
                                             @@@@@ .......:::---#@@@#                                      ..
                                              @@@@ ......::::---+@@@*                                      .."""

lines = raw_ascii.splitlines()

ascii_svg = []
ascii_svg.append('<text x="20" y="55" font-size="8px" font-family="ConsolasFallback,Consolas,monospace" fill="#c9d1d9">')
for i, line in enumerate(lines):
    line = line.replace('.', ' ')
    line = html.escape(line)
    if i == 0:
        ascii_svg.append(f'<tspan x="20" dy="0">{line}</tspan>')
    else:
        ascii_svg.append(f'<tspan x="20" dy="8.5">{line}</tspan>')
ascii_svg.append('</text>')
ascii_str = '\n'.join(ascii_svg)

def neo_line(y, key, dot_count, value, is_category=False):
    key_color = "#ffa657" 
    dot_color = "#8b949e" 
    val_color = "#c9d1d9" 
    
    if is_category:
        return f'<tspan x="530" y="{y}" fill="{dot_color}">- </tspan><tspan fill="{val_color}">{key}</tspan><tspan fill="{dot_color}"> {"-" * dot_count}</tspan>'
    else:
        dots = "." * dot_count
        return f'<tspan x="530" y="{y}" fill="{key_color}">  {key}:</tspan><tspan fill="{dot_color}"> {dots} </tspan><tspan fill="{val_color}">{html.escape(value)}</tspan>'

def multi_stat_line(y, key1, dot1, val1, key2, dot2, val2):
    key_color = "#ffa657"
    dot_color = "#8b949e"
    val_color = "#c9d1d9"
    dots1 = "." * dot1
    dots2 = "." * dot2
    return (f'<tspan x="530" y="{y}" fill="{key_color}">  {key1}:</tspan>'
            f'<tspan fill="{dot_color}"> {dots1} </tspan><tspan fill="{val_color}">{val1}</tspan>'
            f'<tspan fill="{dot_color}"> | </tspan>'
            f'<tspan fill="{key_color}">{key2}:</tspan>'
            f'<tspan fill="{dot_color}"> {dots2} </tspan><tspan fill="{val_color}">{val2}</tspan>')


lines_svg = [
    '<tspan x="530" y="65" fill="#a5d6ff">mahad</tspan><tspan fill="#8b949e">@</tspan><tspan fill="#a5d6ff">ubuntu </tspan><tspan fill="#8b949e">-------------------------------------</tspan>',
    neo_line(85, "OS", 24, "Windows 11, WSL2 Ubuntu"),
    neo_line(105, "Uptime", 20, "20 years, 5 months, 15 days"),
    neo_line(125, "Host", 22, "UBIT (Karachi University)"),
    neo_line(145, "Kernel", 20, "Backend Architecture & APIs"),
    neo_line(165, "IDE", 23, "IntelliJ IDEA, VSCode"),
    
    neo_line(205, "Languages.Programming", 6, "Java, Kotlin, C++"),
    neo_line(225, "Languages.Computer", 9, "JSON, XML, YAML, SQL"),
    neo_line(245, "Languages.Human", 12, "English, Urdu"),
    
    neo_line(285, "Hobbies.Software", 11, "Building Backend Systems"),
    neo_line(305, "Currently.Learning", 9, "Redis, Kafka, Microservices"),
    
    neo_line(345, "Contact", 39, "", is_category=True),
    neo_line(365, "Email", 22, "codewithmahad@gmail.com"),
    neo_line(385, "LinkedIn", 19, "/in/codewithmahad"),
    neo_line(405, "Portfolio", 18, "shaikhmahad.vercel.app"),
    
    neo_line(445, "GitHub Stats", 34, "", is_category=True),
    # Calculate padding dots based on length of values to keep pipes aligned if wanted, 
    # but fixed dots work fine for varying numbers too as long as they fit.
    multi_stat_line(465, "Repos", max(2, 9 - len(gh_stats["repos"])), gh_stats["repos"], "Stars", max(2, 20 - len(gh_stats["stars"])), gh_stats["stars"]),
    multi_stat_line(485, "Following", max(2, 5 - len(gh_stats["following"])), gh_stats["following"], "Followers", max(2, 16 - len(gh_stats["followers"])), gh_stats["followers"])
]

neofetch_data = "\n".join(lines_svg)

svg_content = f"""<?xml version='1.0' encoding='UTF-8'?>
<svg xmlns="http://www.w3.org/2000/svg" font-family="ConsolasFallback,Consolas,monospace" width="1000px" height="550px" viewBox="0 0 1000 550">
<style>
@font-face {{
  src: local('Consolas'), local('Consolas Bold');
  font-family: 'ConsolasFallback';
  font-display: swap;
  -webkit-size-adjust: 109%;
  size-adjust: 109%;
}}
.cursor {{ animation: blink 1.2s step-start infinite; }}
@keyframes blink {{ 0%, 49% {{ opacity: 1; }} 50%, 100% {{ opacity: 0; }} }}
text, tspan {{ white-space: pre; }}
</style>

<!-- Canvas -->
<rect width="1000" height="550" fill="#0d1117" rx="10" stroke="#30363d" stroke-width="1"/>

<!-- Title bar (Terminal buttons restored) -->
<rect x="0" y="0" width="1000" height="28" fill="#161b22" rx="10"/>
<rect x="0" y="18" width="1000" height="10" fill="#161b22"/>
<circle cx="16" cy="14" r="5" fill="#ff5f56"/>
<circle cx="34" cy="14" r="5" fill="#ffbd2e"/>
<circle cx="52" cy="14" r="5" fill="#27c93f"/>

<!-- ASCII Art (Left) -->
{ascii_str}

<!-- Neofetch body (Right) -->
<text x="530" fill="#c9d1d9" font-size="13px" font-family="ConsolasFallback,Consolas,monospace">
{neofetch_data}
</text>

<!-- Blinking cursor prompt -->
<text x="530" y="525" font-size="13px" font-family="ConsolasFallback,Consolas,monospace">
  <tspan fill="#c9d1d9">mahad@ubuntu ~$ </tspan><tspan fill="#3fb950" class="cursor">█</tspan>
</text>
</svg>
"""

with open('templates/template.svg', 'w', encoding='utf-8') as f:
    f.write(svg_content)

print(f"Successfully built Neofetch terminal with REAL GitHub Stats: Repos={gh_stats['repos']}, Stars={gh_stats['stars']}")
