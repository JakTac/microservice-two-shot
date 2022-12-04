from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import Shoe, BinVO


class BinVODetailEncoder(ModelEncoder):
    model = BinVO
    properties = [
        'closet_name',
        'import_href',
    ]

class ShoesListEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "manufacturer",
        "model",
        "id",
        "picture_url",
    ]

class ShoeDetailEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "manufacturer",
        "model",
        "color",
        "picture_url",
        "bin",
        "id",
    ]
    encoders = {
        "bin": BinVODetailEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_shoes(request, bin_vo_id=None):
    if request.method == "GET":
        if bin_vo_id is not None:
            shoes = Shoe.objects.filter(bin=bin_vo_id)
        else:
            shoes = Shoe.objects.all()
        return JsonResponse(
            {'shoes': shoes},
            encoder=ShoesListEncoder,
        )
    else:
        content = json.loads(request.body)
        print(content)
        try:
            bin_id = content['bin']
            bin = BinVO.objects.get(id=bin_id)
            content['bin'] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {'message': 'Invalid bin id'},
                status=400,
            )
        shoe = Shoe.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,
        )

@require_http_methods(["GET", "DELETE"])
def api_show_shoe(request, pk):
    if request.method == "GET":
        shoe = Shoe.objects.get(id=pk)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,
        )
    else:
        count, _ = Shoe.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})