# Backend technology artwork

The main row uses original brand marks with outlined Manrope names, plus a custom REST/API graphic. All generated lockups use the same 88-pixel canvas, 14-pixel labels, and a transparent background. Their icon sizes are adjusted for visual weight.

## Sources

| Source file | Source | Use |
| :--- | :--- | :--- |
| `java.svg` | [Devicon Java](https://github.com/devicons/devicon/blob/master/icons/java/java-original.svg) | Java mark |
| `spring.svg` | [Devicon Spring](https://github.com/devicons/devicon/blob/master/icons/spring/spring-original.svg) | Spring Boot mark |
| `postgresql.svg` | [Devicon PostgreSQL](https://github.com/devicons/devicon/blob/master/icons/postgresql/postgresql-original.svg) | PostgreSQL mark |
| `junit-light.svg` | [JUnit Team — light icon](https://junit.org/assets/img/junit-diamond.svg) | JUnit on light backgrounds |
| `junit-dark.svg` | [JUnit Team — dark icon](https://junit.org/assets/img/junit-diamond-inverted-white.svg) | JUnit on dark backgrounds |
| `spring-security.svg` | [Spring Security project mark](https://spring.io/img/projects/spring-security.svg) | Spring Security mark |

The Java, Spring, and PostgreSQL marks are unchanged Devicon copies. Devicon’s distribution license is retained in [DEVICON-LICENSE.txt](DEVICON-LICENSE.txt). The JUnit and Spring Security SVGs were downloaded unchanged from their official sites on 2026-11-03.

The JUnit icon is © The JUnit Team, under [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/), as recorded in the [official logo guidelines](https://junit.org/logo/). The unmodified icon is embedded inside the profile lockup. Spring marks retain their respective ownership; see [Spring’s trademark guidelines](https://spring.io/trademarks). Technology marks identify the linked tools and do not imply endorsement.

The REST graphic is original SVG geometry: two open braces and opposing request/response arrows. It represents a capability and is not presented as an official product logo.

## Build and extension

[backend-stack.mjs](../../../scripts/profile/backend-stack.mjs) defines the six visible items, original source files, optical sizes, and learning flags. The normal [build](../../../scripts/profile/build.mjs) generates each `*-lockup-{light,dark}.svg`. Names and learning captions are converted to font paths, so no remote fonts are needed.

JUnit and Spring Security are marked Learning, matching the owner’s current experience. Once they are demonstrated in project work, set the relevant `learning` flag to false, rebuild, and update the learning line in the main README. The shared canvas keeps the row aligned when captions change.

Add supporting tools to the appropriate category in the main README’s toolkit table. Add a category for a new area when needed. Keep this source documentation in step with actual files.

Font notices remain in [source/](../source/). Third-party assets retain their existing terms and are excluded from the profile’s original-artwork ownership claim.
