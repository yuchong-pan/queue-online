from django.contrib import admin
from .models import *

class RestaurantAdmin(admin.ModelAdmin):
    list_display = ("name", "addr", "queue_len", "wait_time", "create_time", "update_time")
    search_fields = ["name", "addr"]

admin.site.register(Restaurant, RestaurantAdmin)
