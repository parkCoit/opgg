from rest_framework import serializers
from .models import History


class HistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = History
        fields = '__all__'

    def to_sql(self, validated_data):
        return validated_data

    def create(self, validated_data):
        return History.objects.create(**validated_data)

    def update(self, instance, valicated_data):
        return History.objects.filter(pk=instance.id).update(**valicated_data)

    def delete(self, instance, valicated_data):
        pass
