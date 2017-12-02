import json

from .models import *

from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse

@require_http_methods(["GET"])
def restaurant_list(request):
    return Restaurant.objects.all().values()

@require_http_methods(["POST"])
def restaurant_add(request):
    body = json.loads(request.body)

    name = body["name"]
    addr = body["addr"]
    city = body["city"]
    postal_code = body["postal_code"]
    place_id = body["place_id"]
    queue_len = body["queue_len"]
    wait_time = body["wait_time"]

    Restaurant.objects.create(
        name=name,
        addr=addr,
        city=city,
        postal_code=postal_code,
        place_id=place_id,
        queue_len=queue_len,
        wait_time=wait_time,
    )

    return JsonResponse({
        "name": name,
        "addr": addr,
        "city": city,
        "postal_code": postal_code,
        "place_id": place_id,
        "queue_len": queue_len,
        "wait_time": wait_time,
    })

@require_http_methods(["POST"])
def restaurant_update(request):
    body = json.loads(request.body)

    place_id = body["place_id"]
    queue_len = body["queue_len"]
    wait_time = body["wait_time"]

    Restaurant.objects.filter(place_id=place_id).update(
        queue_len=queue_len,
        wait_time=wait_time,
    )
