from bs4 import BeautifulSoup
import requests
from os.path import basename

# url = "https://www.formula1.com/en/racing/2022.html"

# response = requests.get(url)

# web_page = response.text

# soup = BeautifulSoup(web_page, "html.parser")

# ------------ USE THIS TO DOWNLOAD ALL TRACK IMAGES -----------

# tracks = soup.find_all(name="picture", class_="track")
# list_track_images = [track.img["data-src"] for track in tracks]

# for i, link in enumerate(list_track_images):
#     with open(f"tracks/{i}_{basename(link)}", "wb") as f:
#         f.write(requests.get(link).content)

# --------------------------------------------------------------

# --------- USE THIS TO SCRAP ALL POSSIBLE DATES -----------

# start = soup.find_all(name="span", class_="start-date")
# end = soup.find_all(name="span", class_="end-date")
# months = soup.find_all(name="span", class_="month-wrapper")

# list_months = [tag.get_text() for tag in months]
# list_start = [tag.get_text() for tag in start]
# list_end = [tag.get_text() for tag in end]

# for i in range(len(list_start)):
#     print(list_months[i], list_start[i], list_end[i])

# print(list_start)
# print(list_end)
# print(len(list_start) == len(list_end))

# --------------------------------------------------------------
