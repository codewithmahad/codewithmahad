import json
import html

# Read the raw ASCII (the one with dots replaced by spaces)
with open('scratch_ascii.txt', 'r', encoding='utf-8') as f:
    lines = f.read().splitlines()

ascii_svg = []
ascii_svg.append('<text x="20" y="50" font-size="11px" font-family="ConsolasFallback,Consolas,monospace">')
for i, line in enumerate(lines):
    line = line.replace('.', ' ')
    line = html.escape(line)
    if i == 0:
        ascii_svg.append(f'<tspan x="20" dy="0" fill="#28c840">{line}</tspan>')
    else:
        ascii_svg.append(f'<tspan x="20" dy="13" fill="#28c840">{line}</tspan>')
ascii_svg.append('</text>')

ascii_str = '\n'.join(ascii_svg)

json_data = """
<tspan x="620" y="58"  class="cm">// neofetch --profile mahad --format json</tspan>
<tspan x="620" y="74"  class="pu">{</tspan>

<tspan x="620" y="92"  class="pu">  </tspan><tspan class="ky">"developer"</tspan><tspan class="pu">: {</tspan>
<tspan x="620" y="110" class="pu">    </tspan><tspan class="ky">"name"</tspan><tspan class="pu">:        </tspan><tspan class="st">"Shaikh Mahad Ud Din"</tspan><tspan class="pu">,</tspan>
<tspan x="620" y="128" class="pu">    </tspan><tspan class="ky">"alias"</tspan><tspan class="pu">:       </tspan><tspan class="st">"codewithmahad"</tspan><tspan class="pu">,</tspan>
<tspan x="620" y="146" class="pu">    </tspan><tspan class="ky">"role"</tspan><tspan class="pu">:        </tspan><tspan class="st">"Backend Engineer &amp; System Architect"</tspan>
<tspan x="620" y="164" class="pu">  },</tspan>

<tspan x="620" y="182" class="pu">  </tspan><tspan class="ky">"changelog"</tspan><tspan class="pu">: [</tspan>
<tspan x="620" y="200" class="pu">    </tspan><tspan class="st">"v3.x → Java Backend (Spring Boot, Microservices, JWT, SQL)"</tspan><tspan class="pu">,</tspan>
<tspan x="620" y="218" class="pu">    </tspan><tspan class="st">"v2.x → Android Native (Kotlin, Jetpack Compose)"</tspan><tspan class="pu">,</tspan>
<tspan x="620" y="236" class="pu">    </tspan><tspan class="st">"v1.x → C++ Core Fundamentals &amp; Advanced OOP"</tspan>
<tspan x="620" y="254" class="pu">  ],</tspan>

<tspan x="620" y="272" class="pu">  </tspan><tspan class="ky">"currently_building"</tspan><tspan class="pu">: </tspan><tspan class="st">"fitness-tracker REST API v2 (Redis Caching + Docker)"</tspan><tspan class="pu">,</tspan>

<tspan x="620" y="290" class="pu">  </tspan><tspan class="ky">"community_impact"</tspan><tspan class="pu">: {</tspan>
<tspan x="620" y="308" class="pu">    </tspan><tspan class="ky">"founder"</tspan><tspan class="pu">:            </tspan><tspan class="st">"The UBIT Hub"</tspan><tspan class="pu">,</tspan>
<tspan x="620" y="326" class="pu">    </tspan><tspan class="ky">"active_members"</tspan><tspan class="pu">:     </tspan><tspan class="nm">900+</tspan><tspan class="pu">,</tspan>
<tspan x="620" y="344" class="pu">    </tspan><tspan class="ky">"linkedin_network"</tspan><tspan class="pu">:   </tspan><tspan class="nm">11054</tspan><tspan class="pu">,</tspan>
<tspan x="620" y="362" class="pu">    </tspan><tspan class="ky">"open_source_commits"</tspan><tspan class="pu">: </tspan><tspan class="nm" id="commit_data">0</tspan>
<tspan x="620" y="380" class="pu">  },</tspan>

<tspan x="620" y="398" class="pu">  </tspan><tspan class="ky">"stack"</tspan><tspan class="pu">: {</tspan>
<tspan x="620" y="416" class="pu">    </tspan><tspan class="ky">"backend"</tspan><tspan class="pu">:   [ </tspan><tspan class="st">"Java"</tspan><tspan class="pu">, </tspan><tspan class="st">"Spring Boot"</tspan><tspan class="pu">, </tspan><tspan class="st">"Spring Data JPA"</tspan><tspan class="pu">, </tspan><tspan class="st">"Hibernate"</tspan><tspan class="pu"> ],</tspan>
<tspan x="620" y="434" class="pu">    </tspan><tspan class="ky">"databases"</tspan><tspan class="pu">: [ </tspan><tspan class="st">"MySQL"</tspan><tspan class="pu">, </tspan><tspan class="st">"PostgreSQL"</tspan><tspan class="pu"> ],</tspan>
<tspan x="620" y="452" class="pu">    </tspan><tspan class="ky">"devops"</tspan><tspan class="pu">:    [ </tspan><tspan class="st">"Docker"</tspan><tspan class="pu">, </tspan><tspan class="st">"Git"</tspan><tspan class="pu">, </tspan><tspan class="st">"Flyway"</tspan><tspan class="pu">, </tspan><tspan class="st">"Postman"</tspan><tspan class="pu"> ],</tspan>
<tspan x="620" y="470" class="pu">    </tspan><tspan class="ky">"core_cs"</tspan><tspan class="pu">:   [ </tspan><tspan class="st">"C++"</tspan><tspan class="pu">, </tspan><tspan class="st">"OOP"</tspan><tspan class="pu">, </tspan><tspan class="st">"Data Structures &amp; Algorithms"</tspan><tspan class="pu"> ]</tspan>
<tspan x="620" y="488" class="pu">  },</tspan>

<tspan x="620" y="506" class="pu">  </tspan><tspan class="ky">"education"</tspan><tspan class="pu">: {</tspan>
<tspan x="620" y="524" class="pu">    </tspan><tspan class="ky">"university"</tspan><tspan class="pu">: </tspan><tspan class="st">"UBIT — University of Karachi (BSSE)"</tspan><tspan class="pu">,</tspan>
<tspan x="620" y="542" class="pu">    </tspan><tspan class="ky">"cgpa"</tspan><tspan class="pu">:       </tspan><tspan class="nm">3.91</tspan><tspan class="pu">,</tspan>
<tspan x="620" y="560" class="pu">    </tspan><tspan class="ky">"scholarship"</tspan><tspan class="pu">: </tspan><tspan class="bo">true</tspan>
<tspan x="620" y="578" class="pu">  },</tspan>

<tspan x="620" y="596" class="pu">  </tspan><tspan class="ky">"git_log"</tspan><tspan class="pu">: [</tspan>
<tspan x="620" y="614" class="pu">    </tspan><tspan class="bo">"* 9f3a1c2"</tspan><tspan class="pu"> </tspan><tspan class="st">"feat: spring-security jwt filter chain"</tspan><tspan class="pu">,</tspan>
<tspan x="620" y="632" class="pu">    </tspan><tspan class="bo">"* 4b8e7d1"</tspan><tspan class="pu"> </tspan><tspan class="st">"feat: flyway migration + mapstruct dtos"</tspan><tspan class="pu">,</tspan>
<tspan x="620" y="650" class="pu">    </tspan><tspan class="bo">"* 2c1a9f3"</tspan><tspan class="pu"> </tspan><tspan class="st">"learn: spring data jpa relationships mastery"</tspan>
<tspan x="620" y="668" class="pu">  ],</tspan>

<tspan x="620" y="686" class="pu">  </tspan><tspan class="ky">"open_to"</tspan><tspan class="pu">: </tspan><tspan class="bo">"Backend Software Engineering Opportunities"</tspan><tspan class="pu">,</tspan>

<tspan x="620" y="704" class="pu">  </tspan><tspan class="ky">"contact"</tspan><tspan class="pu">: {</tspan>
<tspan x="620" y="722" class="pu">    </tspan><tspan class="ky">"email"</tspan><tspan class="pu">:     </tspan><tspan class="lk">"codewithmahad@gmail.com"</tspan><tspan class="pu">,</tspan>
<tspan x="620" y="740" class="pu">    </tspan><tspan class="ky">"portfolio"</tspan><tspan class="pu">: </tspan><tspan class="lk">"shaikhmahad.vercel.app"</tspan><tspan class="pu">,</tspan>
<tspan x="620" y="758" class="pu">    </tspan><tspan class="ky">"leetcode"</tspan><tspan class="pu">:  </tspan><tspan class="lk">"leetcode.com/u/codewithmahadd"</tspan>
<tspan x="620" y="776" class="pu">  }</tspan>
<tspan x="620" y="794" class="pu">}</tspan>

<tspan x="620" y="824" class="cm">// Server Health: OPTIMAL  ·  System Load: LOW  ·  Ready for connection.</tspan>
"""

svg_content = f"""<?xml version='1.0' encoding='UTF-8'?>
<svg xmlns="http://www.w3.org/2000/svg" font-family="ConsolasFallback,Consolas,monospace" width="1350px" height="880px">
<style>
@font-face {{
  src: local('Consolas'), local('Consolas Bold');
  font-family: 'ConsolasFallback';
  font-display: swap;
  -webkit-size-adjust: 109%;
  size-adjust: 109%;
}}
.cm {{ fill: #8b949e; }}
.pu {{ fill: #c9d1d9; }}
.ky {{ fill: #ffa657; }}
.st {{ fill: #a5d6ff; }}
.nm {{ fill: #79c0ff; }}
.bo {{ fill: #3fb950; }}
.lk {{ fill: #58a6ff; }}
@keyframes blink {{
  0%, 49% {{ opacity: 1; }}
  50%, 100% {{ opacity: 0; }}
}}
.cursor {{ animation: blink 1.2s step-start infinite; }}
text, tspan {{ white-space: pre; }}
</style>

<!-- Canvas -->
<rect width="1350" height="880" fill="#0d1117" rx="15"/>

<!-- Title bar -->
<rect x="0" y="0" width="1350" height="38" fill="#161b22" rx="15"/>
<rect x="0" y="23" width="1350" height="15" fill="#161b22"/>
<circle cx="18" cy="19" r="5.5" fill="#ff5f57"/>
<circle cx="34" cy="19" r="5.5" fill="#febc2e"/>
<circle cx="50" cy="19" r="5.5" fill="#28c840"/>
<text x="675" y="24" fill="#8b949e" text-anchor="middle" font-size="12px" font-family="ConsolasFallback,Consolas,monospace">mahad@ubuntu: ~</text>
<line x1="0" y1="38" x2="1350" y2="38" stroke="#30363d" stroke-width="1"/>

<!-- ASCII Art (Left) -->
{ascii_str}

<!-- JSON body (Right) -->
<text x="620" fill="#c9d1d9" font-size="14px" font-family="ConsolasFallback,Consolas,monospace">
{json_data}
</text>

<!-- Blinking cursor prompt -->
<text x="620" y="854" font-size="14px" font-family="ConsolasFallback,Consolas,monospace">
  <tspan fill="#c9d1d9">mahad@ubuntu ~$ </tspan><tspan fill="#3fb950" class="cursor">█</tspan>
</text>

</svg>
"""

with open('templates/template.svg', 'w', encoding='utf-8') as f:
    f.write(svg_content)

print("Successfully built two-panel template.svg")
