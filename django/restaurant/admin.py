from django.contrib import admin
from .models import *

class RestaurantAdmin(admin.ModelAdmin):
    list_display = ("name", "addr", "city", "postal_code", "queue_len", "wait_time", "create_time", "update_time")
    search_fields = ["name", "addr", "city", "postal_code"]

admin.site.register(Restaurant, RestaurantAdmin)
