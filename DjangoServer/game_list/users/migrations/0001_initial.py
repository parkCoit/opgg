# Generated by Django 5.0.1 on 2024-01-06 22:58

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('nickname', models.CharField(max_length=30, primary_key=True, serialize=False, unique=True)),
                ('puuid', models.TextField(max_length=100)),
                ('tagLine', models.TextField(max_length=30)),
                ('id', models.TextField(max_length=100)),
                ('profileIconId', models.TextField(max_length=30)),
                ('summonerLevel', models.TextField(max_length=30)),
                ('tier', models.TextField(max_length=30)),
                ('leaguePoints', models.TextField(max_length=30)),
                ('queueType', models.TextField(max_length=30)),
                ('rank', models.TextField(max_length=30)),
                ('wins', models.TextField(max_length=30)),
                ('losses', models.TextField(max_length=30)),
            ],
            options={
                'db_table': 'users',
            },
        ),
    ]
