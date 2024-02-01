from django.urls import path

from game_list.history.views import history, history_get

urlpatterns = [
    path('', history),
    path('get', history_get)
]