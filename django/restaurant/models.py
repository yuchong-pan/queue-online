from __future__ import unicode_literals

from django.db import models

class Restaurant(models.Model):
    name = models.CharField(max_length=100)

    addr = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=100)
    place_id = models.CharField(max_length=100)

    queue_len = models.IntegerField()
    wait_time = models.IntegerField()

    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)
