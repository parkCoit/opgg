from django.db import models

# Create your models here.


class User(models.Model):
    nickname = models.CharField(primary_key=True, max_length=30, unique=True)
    puuid = models.TextField(max_length=100)
    tagLine = models.TextField(max_length=30)
    id = models.TextField(max_length=100)
    profileIconId = models.TextField(max_length=30)
    summonerLevel = models.TextField(max_length=30)
    tier = models.TextField(max_length=30)
    leaguePoints = models.TextField(max_length=30)
    queueType = models.TextField(max_length=30)
    rank = models.TextField(max_length=30)
    wins = models.TextField(max_length=30)
    losses = models.TextField(max_length=30)

    class Meta:
        db_table = 'users'

    def __str__(self):
        return (f'{self.pk} {self.nickname} {self.tagLine} {self.id} {self.profileIconId} {self.summonerLevel}'
                f'{self.tier} {self.leaguePoints} {self.queueType} {self.rank} {self.wins} {self.losses}')
