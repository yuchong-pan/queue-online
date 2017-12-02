from django.conf.urls import url
from .views import *

urlpatterns = [
    url(r"^list/$", restaurant_list),
    url(r"^add/$", restaurant_add),
    url(r"^update/$", restaurant_update),
]
