import json
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from game_list.history.repositories import HistoryRepository


# Create your views here.

@api_view(['POST', 'PUT', 'DELETE'])
def history(request):
    print(request.data)
    nickname = request.data['gameName']
    if request.method == 'POST':
        if HistoryRepository().find_history_exists(nickname) is not False:
            return HistoryRepository().find_history(nickname)
        else:
            return HistoryRepository().add_history(nickname)
    elif request.method == 'PUT':
        return HistoryRepository().update_history(nickname)
    elif request.method == 'DELETE':
        return HistoryRepository().delete_history(nickname)


@api_view(['GET'])
def history_get(request):
    return HistoryRepository().get_all()
