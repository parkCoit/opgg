import requests
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['POST'])
def kakao_login(request):
    try:
        print('여기에요')
        code = request.data["code"]
        print(code)
        access_token = requests.post(
            "https://kauth.kakao.com/oauth/token",
            headers={"Content-Type": "application/x-www-form-urlencoded"},
            data={
                "grant_type": "authorization_code",
                "client_id": "83737e699fa7fe760ecf8b866a016030",
                "redirect_uri": "http://localhost:3000/auth",
                "code": code
            },
        )
        print(access_token.json())
        access_token = access_token.json()['access_token']
        print(f" access_token ====== {access_token}")

        user_data = requests.get(
            "https://kapi.kakao.com/v2/user/me",
            headers={
                "Authorization": f"Bearer {access_token}",
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
        )
        user_data = user_data.json()
        print(f'user data =====  {user_data}')
        kakao_account = user_data['kakao_account']
        profile = kakao_account['profile']
        print(profile)
        email = kakao_account['email']
        nickname = profile['nickname']
        print(nickname)
        print(email)
        return Response({'result' : 'success'}, status.HTTP_200_OK)
    except Exception:
        return Response(status=status.HTTP_400_BAD_REQUEST)

