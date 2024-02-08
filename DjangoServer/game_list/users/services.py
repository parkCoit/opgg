import pandas as pd
from riotwatcher import LolWatcher
from api_key import riot_api_key
import requests


class UserServices(object):
    def __init__(self):
        global api_key, watcher, my_region, request_headers
        api_key = riot_api_key
        watcher = LolWatcher(api_key)
        my_region = "kr"

        request_headers = {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://developer.riotgames.com",
            "X-Riot-Token": api_key
        }

    def test(self, nickname, tag):
        summoner_response = requests.get(f"https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{nickname}/{tag}?api_key={api_key}", request_headers)
        summoner_response = summoner_response.json()
        print(summoner_response)
        a = watcher.summoner.by_puuid(my_region, summoner_response['puuid'])
        print(a)
        return summoner_response

    def summoner(self, nickname):
        user = watcher.summoner.by_name(my_region, nickname)
        puuid = user['puuid']
        to_db = pd.DataFrame({
            'nickname': [nickname],
            'puuid': [puuid]
        })

        json = to_db.to_json(orient='records', force_ascii=False)
        print(json)

        return {'nickname': nickname, 'puuid': puuid}

    def summonerData(self, riot_id, gameName, tag):
        summonerData = watcher.summoner.by_puuid(my_region, riot_id)
        # summonerData = watcher.summoner.by_name(my_region, gameName)
        tierData = watcher.league.by_summoner(my_region, summonerData['id'])
        tierData = [tierData[i] for i in range(len(tierData)) if tierData[i]['queueType'] == 'RANKED_SOLO_5x5'][0]
        nickname = summonerData['name']
        puuid = summonerData['puuid']
        tagLine = tag
        id = summonerData['id']
        profileIconId = summonerData['profileIconId']
        summonerLevel = summonerData['summonerLevel']
        tier = tierData['tier']
        leaguePoints = tierData['leaguePoints']
        queueType = 'SOLORANK' if tierData['queueType'] == 'RANKED_SOLO_5x5' else tierData['queueType']
        rank = tierData['rank']
        wins = tierData['wins']
        losses = tierData['losses']
        data = {'nickname': nickname, 'puuid': puuid, 'tagLine': tagLine, 'id': id, 'profileIconId': profileIconId,
                'summonerLevel': summonerLevel, 'tier': tier, 'leaguePoints': leaguePoints, 'queueType': queueType,
                'rank': rank, 'wins': wins, 'losses': losses}
        print(data)
        return data

    def match_id(self, puuid):
        return watcher.match.matchlist_by_puuid(my_region, puuid, type='ranked')

    def play_list(self, gameName):
        summonerData = watcher.summoner.by_name(my_region, gameName)
        puuid = summonerData['puuid']
        match_id = watcher.match.matchlist_by_puuid(my_region, puuid, type='ranked')
        match_id_ls, champion_name_ls, result_ls, kills_ls, deaths_ls, assists_ls, kda_ls, position_ls, ummoner_name_ls, summoner_name_ls \
            = list(), list(), list(), list(), list(), list(), list(), list(), list(), list()

        for i in range(len(match_id)):
            matches = watcher.match.by_id(my_region, match_id[i])
            metadata = matches['metadata']['participants']
            user_num = [i for i in range(0, 10) if metadata[i] == puuid]
            user_info = matches['info']["participants"][user_num[0]]
            champion_name = user_info['championName']
            result = '패배' if str(user_info['win']) == 'False' else '승리'
            kills = user_info['kills']
            deaths = user_info['deaths']
            assists = user_info['assists']
            kda = 'perfect' if deaths == 0 else round((kills + assists) / deaths, 2)
            position = 'Support' if user_info['teamPosition'] == 'UTILITY' else user_info['teamPosition']
            summoner_name = user_info['summonerName']
            match_id_ls.append(match_id[i])
            champion_name_ls.append(champion_name)
            result_ls.append(result)
            kills_ls.append(kills)
            deaths_ls.append(deaths)
            assists_ls.append(assists)
            kda_ls.append(kda)
            position_ls.append(position)
            summoner_name_ls.append(summoner_name)

            print(f'매치 기록 : {match_id[i]}\n'
                  f'챔피언 이름 :{champion_name} \n'
                  f'승리 패배 : {result}\n'
                  f'킬 : {kills}\n'
                  f'데스 : {deaths}\n'
                  f'어시스트 : {assists}\n'
                  f'kda : {kda},\n'
                  f'라인 : {position}\n'
                  f'닉네임 : {summoner_name}\n')
        db_df = pd.DataFrame({'champion': champion_name_ls, 'win': result_ls, 'kills': kills_ls,
                              'deaths': deaths_ls, 'assists': assists_ls, 'kda': kda_ls, 'position': position_ls,
                              'summoner_name': summoner_name_ls}, index=match_id_ls)
        print(db_df)
        json = db_df.to_json(orient='records', force_ascii=False)
        print(json)

        return db_df

    def match_list(self):
        pass

    def all_death_time(self, matchid):
        time_line = watcher.match.timeline_by_match(my_region, matchid)
        death_list = list()
        for i in range(len(time_line['info']['frames'])):
            for j in range(len(time_line['info']['frames'][i]['events'])):
                if time_line['info']['frames'][i]['events'][j]['type'] == 'CHAMPION_KILL':
                    timestamp = time_line['info']['frames'][i]['events'][j]['timestamp']
                    death_list.append(timestamp)
        print(death_list)

    def user_death_time(self, matchid, puuid):
        time_line = watcher.match.timeline_by_match(my_region, matchid)
        death_list = list()
        puuid_list = time_line['metadata']['participants']
        in_game_id = [i for i in range(len(puuid_list)) if puuid_list[i] == puuid]

        for i in range(len(time_line['info']['frames'])):
            for j in range(len(time_line['info']['frames'][i]['events'])):
                if time_line['info']['frames'][i]['events'][j]['type'] == 'CHAMPION_KILL':
                    if time_line['info']['frames'][i]['events'][j]['victimId'] == in_game_id[0]:
                        timestamp = time_line['info']['frames'][i]['events'][j]['timestamp']
                        death_list.append(timestamp)
        print(death_list)


if __name__ == '__main__':
    name = UserServices().summoner('빵 삥')
    UserServices().test('coit', '9503')
    puuid = name['puuid']
    # match_id = UserServices().match_id(name['puuid'])
    # UserServices().play_list(puuid)
    # UserServices().all_death_time(match_id[0])
    # UserServices().user_death_time(match_id[0], puuid)
