<?php

namespace MaXoooZ;

use pocketmine\plugin\PluginBase;

class Manager extends PluginBase
{
    public array $discords = [];

    public function onEnable(): void
    {
        $this->getServer()->getCommandMap()->register("link", new LinkCommand($this));
        $this->getScheduler()->scheduleRepeatingTask(new SendReq($this), 3);
    }
}