<?php

namespace MaXoooZ;

use pocketmine\command\Command;
use pocketmine\command\CommandSender;
use pocketmine\Player;

class LinkCommand extends Command
{
    private Manager $plugin;

    public function __construct(Manager $plugin)
    {
        parent::__construct("link");
        $this->plugin = $plugin;
    }

    public function execute(CommandSender $sender, string $commandLabel, array $args): void
    {
        if (empty($args[0])) {
            $sender->sendMessage("§cYou did not indicate your discord ID.");
            return;
        }

        if ($sender instanceof Player) {
            $this->plugin->discords[$sender->getName()] = $args[0];
            $sender->sendMessage("§cYour discord account id has been successfully linked.");
        }
    }
}