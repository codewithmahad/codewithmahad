import os
import sys
import requests
import re


def fetch_github_stats(username, token):
    headers = {"Authorization": f"Bearer {token}"}
    query = """
    {
      user(login: "%s") {
        repositories(first: 100, ownerAffiliations: OWNER) {
          totalCount
          nodes {
            stargazerCount
          }
        }
        followers {
          totalCount
        }
        contributionsCollection {
          totalCommitContributions
          restrictedContributionsCount
        }
      }
    }
    """ % username

    response = requests.post(
        "https://api.github.com/graphql",
        json={"query": query},
        headers=headers
    )
    if response.status_code != 200:
        raise Exception(f"Query failed: {response.status_code} {response.text}")

    data = response.json()
    if "errors" in data:
        raise Exception(f"GraphQL errors: {data['errors']}")

    user_data = data["data"]["user"]
    total_repos = user_data["repositories"]["totalCount"]
    total_stars = sum(
        repo["stargazerCount"]
        for repo in user_data["repositories"]["nodes"]
    )
    total_followers = user_data["followers"]["totalCount"]
    total_commits = (
        user_data["contributionsCollection"]["totalCommitContributions"]
        + user_data["contributionsCollection"]["restrictedContributionsCount"]
    )

    return {
        "repo": total_repos,
        "star": total_stars,
        "follower": total_followers,
        "commit": total_commits,
    }


def update_svg(template_path, output_path, stats):
    with open(template_path, "r", encoding="utf-8") as f:
        svg = f.read()

    # Simple replacement — JSON format, no dot-padding needed
    for key in ["repo", "star", "follower", "commit"]:
        val_formatted = "{:,}".format(stats[key])
        pattern = rf'(id="{key}_data">)[^<]*(</tspan>)'
        svg = re.sub(pattern, rf"\g<1>{val_formatted}\g<2>", svg)

    with open(output_path, "w", encoding="utf-8") as f:
        f.write(svg)


if __name__ == "__main__":
    token = os.environ.get("ACCESS_TOKEN")
    if not token:
        print("Error: ACCESS_TOKEN environment variable not set.")
        sys.exit(1)

    username = "codewithmahad"

    try:
        print(f"Fetching stats for @{username}...")
        stats = fetch_github_stats(username, token)
        print(f"Stats: {stats}")

        template_path = "templates/template.svg"
        output_path = "assets/dark.svg"

        update_svg(template_path, output_path, stats)
        print(f"Successfully generated {output_path}")
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)
