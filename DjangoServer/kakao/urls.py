from django.urls import path

from game_list.users.views import users, get_users
from kakao.views import kakao_login

urlpatterns = [
    path('login', kakao_login)
]