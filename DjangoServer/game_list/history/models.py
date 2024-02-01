from django.db import models

from game_list.users.models import User


# Create your models here.

class History(models.Model):
    match_id= models.CharField(primary_key=True, max_length=30, unique=True)
    champions = models.TextField(max_length=30)
    kills = models.TextField(max_length=30)
    deaths = models.TextField(max_length=100)
    assists = models.TextField(max_length=30)
    results = models.TextField(max_length=30)
    kda = models.TextField(max_length=30)
    position = models.TextField(max_length=30)

    nickname = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        db_table = 'history'

    def __str__(self):
        return (f'{self.pk} {self.champions} {self.kills} {self.deaths} {self.assists} {self.results}'
                f'{self.position} {self.nickname}')
