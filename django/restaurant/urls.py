from django.conf.urls import url
from .views import *

urlpatterns = [
    url(r"^list/$", restaurant_list),
    url(r"^add/$", restaurant_add),
    url(r"^upload/$", restaurant_upload),
    url(r"^fetch/$", restaurant_fetch),
]
