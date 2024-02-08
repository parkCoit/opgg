import jwt
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from kakao.services import KakaoServices
from kakao.serializers import KakaoSerializer
from kakao.repositories import KakaoRepository


@api_view(['POST'])
def kakao_login(request):
    try:
        print(f"a = {request.data}")
        code = request.data["code"]
        get_token = KakaoServices().get_token(code)
        if get_token == 'invalid_grant':
            return Response({'코드 값으로 토큰을 가져올 수 없음'})
        else:
            kakao_user = KakaoServices().get_kakao_user(get_token)
            if KakaoRepository().find_kakao_exists(kakao_user['id']) is not False:
                # KakaoRepository().find_kakao(kakao_user['id'])[0]
                print('여기까지 도착')
                print(KakaoRepository().get_jwt(kakao_user['id']))
                return Response(KakaoRepository().get_jwt(kakao_user['id']), status=200)
            else:
                serializer = KakaoSerializer(data=kakao_user)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception:
        return Response(status=status.HTTP_400_BAD_REQUEST)
