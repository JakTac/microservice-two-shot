from django.urls import path

from .views import (list_shoes, show_shoe)


urlpatterns = [
    path('shoes/', list_shoes, name='list_shoes'),
    path('shoe/<int:id>/', show_shoe, name='show_shoe'),
]
