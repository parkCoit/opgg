import jwt
from django.http import JsonResponse
from rest_framework.response import Response

from admin.settings import SOCIAL_OUTH_CONFIG
from kakao.models import Kakao
from kakao.serializers import KakaoSerializer


class KakaoRepository(object):

    def __init__(self):
        pass

    def get_all(self):
        return Response(KakaoSerializer(Kakao.objects.all(), many=True).data)

    def delete_find_kakao(self, nickname):
        return Kakao.objects.get(nickname=nickname)

    def find_kakao_exists(self, id):
        return Kakao.objects.all().filter(id=id).exists()

    def find_kakao(self, id):
        return Kakao.objects.all().filter(id=id).values()
    def get_jwt(self, id):
        user_info = self.find_kakao(id)
        user_info =user_info[0]
        print(user_info)
        encoded_jwt = jwt.encode({'id': user_info['id'], 'nickname' : user_info['nickname']}, SOCIAL_OUTH_CONFIG['KAKAO_SECRET_KEY'], algorithm=SOCIAL_OUTH_CONFIG['ALGORITHM'])
        print(f"type ::{type(encoded_jwt)},"
              f"encoded_jwt : {encoded_jwt}")
        payload = jwt.decode(encoded_jwt, SOCIAL_OUTH_CONFIG['KAKAO_SECRET_KEY'], algorithms=SOCIAL_OUTH_CONFIG['ALGORITHM'])
        print(payload)
        return encoded_jwt
