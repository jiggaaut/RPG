using System;
using GTANetworkAPI;

namespace JiggaautRPG
{
    public class Main : Script
    {
        [ServerEvent(Event.ResourceStart)]
        public void OnResourceStart()
        {
            NAPI.Util.ConsoleOutput("kekw");
        }

        [Command("msg")]
        public void MeCommand(Player player, string msg)
        {
            NAPI.ClientEvent.TriggerClientEvent(player, "shopInventory", msg);
        }
    }
}
