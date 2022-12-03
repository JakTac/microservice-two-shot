import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "shoes_project.settings")
django.setup()

from shoes_rest.models import BinVO
# Import models from hats_rest, here.
# from shoes_rest.models import Something

def get_bins():
    print('getting bins')
    response = requests.get("http://wardrobe-api:8000/api/bins/")
    content = json.loads(response.content)
    for bin in content['bins']:
        BinVO.objects.update_or_create(
            import_href=bin["href"],
            defaults={'closet_name': bin['closet_name']},
        )
        print(BinVO.objects.all().values())

def poll():
    while True:
        print('Shoes poller polling for data')
        try:
            get_bins()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(20)


if __name__ == "__main__":
    poll()
