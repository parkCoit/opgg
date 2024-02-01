from django.http import JsonResponse
from rest_framework.response import Response

from game_list.users.models import User
from game_list.users.serializers import UserSerializer


class UserRepository(object):

    def __init__(self):
        pass

    def get_all(self):
        return Response(UserSerializer(User.objects.all(), many=True).data)
    
    def delete_find_user(self, nickname):
        return User.objects.get(nickname=nickname)
    
    def find_user_exists(self, nickname):
        return User.objects.all().filter(nickname=nickname).exists()
    
    def find_user(self, nickname):
        return User.objects.all().filter(nickname=nickname).values()
