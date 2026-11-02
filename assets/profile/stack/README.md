# Technology logos

These are existing technology marks, not generated illustrations. They identify
the technologies used in Mahad’s projects and do not imply endorsement or
affiliation. Their original colors and proportions are preserved.

| Asset | Source | Identifies |
| :--- | :--- | :--- |
| `java.svg` | [Devicon: Java](https://github.com/devicons/devicon/blob/master/icons/java/java-original.svg) | Java, a trademark of Oracle and/or its affiliates |
| `spring.svg` | [Devicon: Spring](https://github.com/devicons/devicon/blob/master/icons/spring/spring-original.svg) | The Spring ecosystem used through Spring Boot; Spring is a trademark of Broadcom Inc. and/or its subsidiaries |
| `postgresql.svg` | [Devicon: PostgreSQL](https://github.com/devicons/devicon/blob/master/icons/postgresql/postgresql-original.svg) | PostgreSQL and its elephant mark; see the project’s trademark policy below |
| `git.svg` | [Devicon: Git](https://github.com/devicons/devicon/blob/master/icons/git/git-original.svg) | Git version control |
| `linux.svg` | [Devicon: Linux](https://github.com/devicons/devicon/blob/master/icons/linux/linux-original.svg) | Linux and the Tux mascot |
| `bash.svg` | [Devicon: Bash](https://github.com/devicons/devicon/blob/master/icons/bash/bash-original.svg) | GNU Bash |
| `mysql.svg` | [Devicon: MySQL](https://github.com/devicons/devicon/blob/master/icons/mysql/mysql-original.svg) | MySQL |
| `maven.svg` | [Devicon: Maven](https://github.com/devicons/devicon/blob/master/icons/maven/maven-original.svg) | Apache Maven |
| `postman.svg` | [Devicon: Postman](https://github.com/devicons/devicon/blob/master/icons/postman/postman-original.svg) | Postman |
| `intellij.svg` | [Devicon: IntelliJ IDEA](https://github.com/devicons/devicon/blob/master/icons/intellij/intellij-original.svg) | IntelliJ IDEA |

Java, Spring, PostgreSQL, and Git were downloaded on 2026-09-08. The remaining marks were added on 2026-11-02; Linux reuses the unchanged Devicon asset from DeployLatch. Devicon’s distribution license is retained in
[`DEVICON-LICENSE.txt`](DEVICON-LICENSE.txt). That license does not transfer
ownership of the brands or grant trademark rights. These assets are excluded
from this repository’s claim of original artwork and its all-rights-reserved
notice.

Owner information: [Java](https://www.oracle.com/legal/trademarks.html),
[Spring](https://spring.io/trademarks/),
[PostgreSQL](https://www.postgresql.org/about/policies/trademarks/).

## Profile lockups

The visible backend row uses generated `java-lockup-{light,dark}.svg`, `spring-lockup-{light,dark}.svg`, and `postgresql-lockup-{light,dark}.svg` files. Each embeds the corresponding original SVG unchanged and adds outlined Manrope lettering. These transparent lockups have no card, border, badge, or external font dependency. Their geometry is maintained in [build.mjs](../../../scripts/profile/build.mjs). The original Java, Spring, and PostgreSQL SVGs remain necessary build inputs.
