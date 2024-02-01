from django.http import JsonResponse
from rest_framework.response import Response

from game_list.history.models import History
from game_list.history.serializers import HistorySerializer
from game_list.history.services import HistoryServices
from admin.databases import ENGINE


class HistoryRepository(object):

    def __init__(self):
        pass

    def get_all(self):
        return Response(HistorySerializer(History.objects.all(), many=True).data)

    def find_history(self, nickname):
        print(type(History.objects.all().filter(nickname=nickname).values()))
        return Response(HistorySerializer(History.objects.all().filter(nickname=nickname), many=True).data)

    def add_history(self, nickname):
        data = HistoryServices().play_list(nickname)
        data.to_sql(name='history', con=ENGINE, if_exists='append', index=False)
        return self.find_history(nickname)

    def delete_history(self, nickname):
        History.objects.all().filter(nickname=nickname).delete()
        return Response({'result': 'delete success'})

    def update_history(self, nickname):
        History.objects.all().filter(nickname=nickname).delete()
        return self.add_history(nickname)

    def find_history_exists(self, nickname):
        return History.objects.all().filter(nickname=nickname).exists()
