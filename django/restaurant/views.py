import json

from .models import *

from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse

@require_http_methods(["GET"])
def restaurant_list(request):
    return JsonResponse({
        "restaurants": list(Restaurant.objects.all().values()),
    })

@require_http_methods(["POST"])
def restaurant_add(request):
    body = json.loads(request.body)

    name = body["name"]
    addr = body["addr"]
    place_id = body["place_id"]
    queue_len = body["queue_len"]
    wait_time = body["wait_time"]

    Restaurant.objects.create(
        name=name,
        addr=addr,
        place_id=place_id,
        queue_len=queue_len,
        wait_time=wait_time,
    )

    return JsonResponse({
        "name": name,
        "addr": addr,
        "place_id": place_id,
        "queue_len": queue_len,
        "wait_time": wait_time,
    })

@require_http_methods(["POST"])
def restaurant_upload(request):
    body = json.loads(request.body)

    place_id = body["place_id"]
    queue_len = body["queue_len"]
    wait_time = body["wait_time"]
    name = body["name"]
    addr = body["addr"]

    r = Restaurant.objects.filter(place_id=place_id)
    
    if r.count() > 0:
        r.update(
            queue_len=queue_len,
            wait_time=wait_time,
        )
    else:
        Restaurant.objects.create(
            name=name,
            addr=addr,
            place_id=place_id,
            queue_len=queue_len,
            wait_time=wait_time,
        )

    return JsonResponse({
        "status": 200,
    })

@require_http_methods(["GET"])
def restaurant_fetch(request):
    place_id = request.GET["place_id"]
    r = list(Restaurant.objects.filter(place_id=place_id).values())
    if len(r) == 0:
        return JsonResponse({
            "status": 404,
        })
    else:
        return JsonResponse({
            "status": 200,
            "restaurant": r[0],
        })
