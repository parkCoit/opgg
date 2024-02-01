from rest_framework import serializers
from .models import Kakao


class KakaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Kakao
        fields = '__all__'

    def create(self, validated_data):
        return Kakao.objects.create(**validated_data)

    def update(self, instance, valicated_data):
        return Kakao.objects.filter(pk=instance.id).update(**valicated_data)

    def delete(self, instance, valicated_data):
        pass
