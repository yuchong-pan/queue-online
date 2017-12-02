from django.conf.urls import url
from .views import *

urlpatterns = [
    url(r"^restaurant/list/$", restaurant_list),
    url(r"^restaurant/add/$", restaurant_add),
    url(r"^restaurant/update/$", restaurant_update),
]
