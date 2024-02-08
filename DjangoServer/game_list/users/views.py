# Create your views here.
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from game_list.users.serializers import UserSerializer
from game_list.users.repositories import UserRepository
from game_list.users.services import UserServices
from rest_framework.response import Response


# Create your views here.


@api_view(['GET', 'DELETE'])
def users(request):
    print(f"data ::: {request.GET}"
          f"request data ::: {request.GET}")
    tag = request.GET['tagLine']
    nickname = request.GET['gameName']
    puuid = request.GET['puuid']
    if request.method == "GET":
        if UserRepository().find_user_exists(nickname) is not False:
            return Response(UserRepository().find_user(nickname)[0])
        else:
            summonerData = UserServices().summonerData(riot_id=puuid, gameName=nickname, tag=tag)
            serializer = UserSerializer(data=summonerData)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        repo = UserRepository()
        delete_user = repo.delete_find_user(nickname)
        delete_user.delete()
        return JsonResponse({'result': 'success'})


@api_view(['GET'])
def get_users(request):
    print(request.data)
    data = UserRepository().get_all()
    return data

