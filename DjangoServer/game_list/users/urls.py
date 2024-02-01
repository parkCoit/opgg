from django.urls import path

from game_list.users.views import users, get_users

urlpatterns = [
    path('', users),
    path('get', get_users),
]