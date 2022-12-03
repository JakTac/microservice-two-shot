from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import Shoe, BinVO


class BinVOEncoder(ModelEncoder):
    model = BinVO
    properties = [
        'closet_name',
        'bin_number',
        'bin_size',
    ]

class ShoesListEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "manufacturer",
        "model",
        "picture_url",
    ]

class ShoesDetailEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "manufacturer",
        "model",
        "color",
        "picture_url",
        "bin",
    ]
    encoders = {
        "bin": BinVOEncoder(),
    }


@require_http_methods(["GET", "POST"])
def list_shoes(request, bin_vo_id=None):
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

        shoe = Shoe.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=ShoesDetailEncoder,
            safe=False,
        )

@require_http_methods(["GET", "DELETE"])
def show_shoe(request, id):
    if request.method == "GET":
        shoe = Shoe.objects.get(id=id)
        return JsonResponse(
            {'shoe': shoe},
            encoder=ShoesDetailEncoder,
        )
    else:
        try:
            shoe = Shoe.objects.get(id=id)
            shoe.delete()
            return JsonResponse(
                shoe,
                encoder=ShoesDetailEncoder,
                safe=False,
            )
        except Shoe.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})