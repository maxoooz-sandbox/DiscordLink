<?php

namespace MaXoooZ;

use pocketmine\scheduler\Task;

class SendReq extends Task
{
    private $api = "localhost";
    private Manager $plugin;

    public function __construct(Manager $plugin)
    {
        $this->plugin = $plugin;
    }

    public function onRun(int $currentTick): bool
    {
		$curl = curl_init();

		$list = $this->getPlayers();
		$encode = http_build_query($list);

		curl_setopt($curl, CURLOPT_URL, $this->api . "/api/list?" . $encode);
        curl_setopt($curl, CURLOPT_POST, true);
		curl_setopt($curl, CURLOPT_HEADER, 0);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true); 

		curl_exec($curl);
        return true;
    }

    private function getPlayers(): array
    {
        $players = $this->plugin->getServer()->getOnlinePlayers();
        $array = [];

        foreach ($players as $player) {
            if (empty($this->plugin->discords[$player->getName()])) continue;

            $xyz = $player->x . ":" . $player->y . ":" . $player->z;
            $discord = $this->plugin->discords[$player->getName()];

            $array[$discord] = $xyz;
        }
        return $array;
    }
}