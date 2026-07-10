//VSCode bullshit
//@ts-nocheck

/* -------------------------------------------------------------------------------
 *                                     LICENSE
 * -------------------------------------------------------------------------------
 * Copyright 2024 Best Dad (https://steamcommunity.com/id/trumplostlmfao/)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the “Software”), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do
 * so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * -------------------------------------------------------------------------------
 */

/*
 * The Console started 13/03/2024
 *
 * This is a replacement for the cheats found in version 3.0 of my old mod Shimmer Pop.
 * These are cheats. They're cheats. Actual cheats. You're cheating. But you paid for the game so who cares.
 *
 * Programmed by Best Dad https://steamcommunity.com/id/trumplostlmfao/
 * The Console Workshop 
 * GitHub https://github.com/Kuiper-Belt-Object-Pluto/
 */

var TheConsole = {
    name: "The Console",
    id: "TheConsole",
    version: "1.2",
    gameVersion: "2.052",
    config: null,
    changeNotes: `
<div class="title" style="margin-top:24px;"><div class="icon" style="display:inline-block;float:left;margin-top:-12px;width:48px;height:48px;position:relative;background-position:${(-32*48)}px ${(-27*48)}px;"></div>The Console</div>
<div class="subsection">
    <div class="listing">Mod created by <a onclick="App.openLink('https://steamcommunity.com/id/trumplostlmfao/')"  class="highlightHover smallBlackButton">Best Dad</a></div>
    <div class="listing">Mod found at <a onclick="App.openLink('https://steamcommunity.com/sharedfiles/filedetails/?id=3213832179')" class="highlightHover smallBlackButton">The Console Steam Workshop page</a></div>
</div>
    <div class="subsection update small">
        <div class="title">v1.2 Minor Release (Apr 15 2024)</div>
        <div class="listing">&bull; Added additional click listeners for the sugar lumps (check its label for more info)</div>
        <div class="listing">&bull; Added 'End Buffs' (terminates all your buffs)</div>
        <div class="listing">&bull; Achievement Unlocker now exposes shadow achievements</div>
        <div class="listing">&bull; Achievement Unlocker now actually turns off (woops lol)</div>
        <div class="listing">&bull; Spawned gold cookies now increment your 'Golden cookie clicks' stat (if clicked, obviously)</div>
    </div>
    <div class="subsection update small">
        <div class="title">v1.1 Minor Release (Apr 08 2024)</div>
        <div class="listing">&bull; Achievement Unlocker (really more like a toggle)</div>
        <div class="listing" style="margin-left:24px;inline-size:650px;line-height:1.4;">Toggle ON, then go into the Stats menu and click any achievement to toggle it on/off. Yes, this WILL award you the Steam achievement, too.</div>
        <div class="listing">&bull; A button for each of the Golden Cookie buffs</div>
        <div class="listing" style="margin-left:24px;inline-size:650px;line-height:1.4;">Some of them don't have, uh, descriptions. That's... well, I gave up. You're cheating anyway, do you care?</div>
    </div>
    <div class="subsection update">
        <div class="title">v1.0 Initial Release (Apr 06 2024)</div>
        <div class="listing">&bull; Spawn a gold cookie</div>
        <div class="listing">&bull; Infinite spawning gold cookies</div>
        <div class="listing">&bull; Infinite magic meter</div>
        <div class="listing">&bull; Endless buffs</div>
        <div class="listing">&bull; Debuff eraser</div>
        <div class="listing">&bull; Give yourself a sugar lump</div>
        <div class="listing">&bull; Free buildings</div>
    </div>
`,

    initConfig: function() {
        const config = {
            spawnGoldCookie: {
                noToggle: true,
                name: "Spawn Gold Cookie",
                desc: "Spawn a Gold Cookie",
                run: function() {
                    let goldenCookie = new Game.shimmer('golden', {noWrath:true});
                    goldenCookie.spawnLead = 1;
                }
            },
            sugarLump: {
                noToggle: true,
                name: "Give Sugar Lump",
                desc: "Left Click for 1, Right Click for 10, Shift+Left Click for 100, Shift+Right Click for 1000",
                run: function(amt=1) {
                    Game.gainLumps(amt);
                }
            },
            goldCookies: {
                name: "Gold Cookies",
                desc: "Continually spawn golden cookies",
                run: function() {
                    let goldenCookie = new Game.shimmer('golden', {noWrath:true});
                    goldenCookie.spawnLead = 1;
                }
            },
            infiniteMagic: {
                name: "Infinite Magic",
                desc: "Continuously replenishes your magic meter to full",
                run: function() {
                    var building = Game.ObjectsById[7];
                    if(building != undefined) {
                        let minigame = building.minigame;
                        if(minigame != undefined) {
                            minigame.magic = minigame.magicM;
                        }
                    }
                }
            },
            endlessBuffs: {
                name: "Endless Buffs",
                desc: "Continuially sets each of your buff's timers to their maximum time",
                delay: 1000,
                run: function() {
                    var debuffs = ['Clot', 'Cursed finger', 'Haggler misery', 'Nasty goblins', 'Magic inept'];
                    for(var i in Game.buffs) {
                        var buff = Game.buffs[i];
                        if(debuffs.includes(buff.name) == false) {
                            buff.time = buff.maxTime;
                        }
                    }
                    Game.updateBuffs();
                }
            },
            endBuffs: {
                name: "End Buffs",
                desc: "End every buff currently active",
                noToggle: true,
                run: function() {
                    for(var i in Game.buffs) {
                        var buff = Game.buffs[i];
                        buff.time = 0;
                    }
                    Game.updateBuffs();
                }
            },

            sugarBlessing: {
                name: "Sugar Blessing",
                desc: "Double your cookies and give 24 hours of +10% CpS",
                noToggle: true,
                run: function() {
                    Game.gainBuff('sugar blessing',24*60*60,1);
                    Game.Earn(Math.min(Game.cookiesPs*60*60*24,Game.cookies));
                    Game.Notify(loc("Sugar blessing activated!"),loc("Your cookies have been doubled.<br>+10% golden cookies for the next 24 hours."),[29,16]);
                }
            },
            frenzy: {
                name: "Frenzy",
                desc: "",
                noToggle: true,
                run: function() {
                    var effectDurMod=1;if(Game.Has("Get lucky")&&(effectDurMod*=2),Game.Has("Lasting fortune")&&(effectDurMod*=1.1),Game.Has("Lucky digit")&&(effectDurMod*=1.01),Game.Has("Lucky number")&&(effectDurMod*=1.01),Game.Has("Green yeast digestives")&&(effectDurMod*=1.01),Game.Has("Lucky payout")&&(effectDurMod*=1.01),effectDurMod*=1+.05*Game.auraMult("Epoch Manipulator"),effectDurMod*=Game.eff("goldenCookieEffDur"),Game.hasGod){var e=Game.hasGod("decadence");1==e?effectDurMod*=1.07:2==e?effectDurMod*=1.05:3==e&&(effectDurMod*=1.02)}
                    Game.gainBuff('frenzy',Math.ceil(77*effectDurMod),7);
                }
            },
            dragonHarvest: {
                name: "Dragon Harvest",
                desc: "",
                noToggle: true,
                run: function() {
                    var effectDurMod=1;if(Game.Has("Get lucky")&&(effectDurMod*=2),Game.Has("Lasting fortune")&&(effectDurMod*=1.1),Game.Has("Lucky digit")&&(effectDurMod*=1.01),Game.Has("Lucky number")&&(effectDurMod*=1.01),Game.Has("Green yeast digestives")&&(effectDurMod*=1.01),Game.Has("Lucky payout")&&(effectDurMod*=1.01),effectDurMod*=1+.05*Game.auraMult("Epoch Manipulator"),effectDurMod*=Game.eff("goldenCookieEffDur"),Game.hasGod){var e=Game.hasGod("decadence");1==e?effectDurMod*=1.07:2==e?effectDurMod*=1.05:3==e&&(effectDurMod*=1.02)}
                    Game.gainBuff('dragon harvest',Math.ceil(60*effectDurMod),15);
                }
            },
            everythingMustGo: {
                name: "Everything Must Go",
                desc: "",
                noToggle: true,
                run: function() {
                    var effectDurMod=1;if(Game.Has("Get lucky")&&(effectDurMod*=2),Game.Has("Lasting fortune")&&(effectDurMod*=1.1),Game.Has("Lucky digit")&&(effectDurMod*=1.01),Game.Has("Lucky number")&&(effectDurMod*=1.01),Game.Has("Green yeast digestives")&&(effectDurMod*=1.01),Game.Has("Lucky payout")&&(effectDurMod*=1.01),effectDurMod*=1+.05*Game.auraMult("Epoch Manipulator"),effectDurMod*=Game.eff("goldenCookieEffDur"),Game.hasGod){var e=Game.hasGod("decadence");1==e?effectDurMod*=1.07:2==e?effectDurMod*=1.05:3==e&&(effectDurMod*=1.02)}
                    Game.gainBuff('everything must go',Math.ceil(8*effectDurMod),5);
                }
            },
            multiplyCookies: {
                name: "Multiply Cookies",
                desc: "Add 15% to cookies owned, or 15 minutes of cookie production - whichever is lowest",
                noToggle: true,
                run: function() {
					var mult=1;mult*=1+.1*Game.auraMult("Ancestral Metamorphosis"),Game.Has("Green yeast digestives")&&(mult*=1.01),Game.Has("Dragon fang")&&(mult*=1.03),mult*=Game.eff("goldenCookieGain");
                    let moni = mult * Math.min(Game.cookies * 0.15, Game.cookiesPs  *60 * 15) + 13;
                    Game.Earn(moni);
                }
            },
            bloodFrenzy: {
                name: "Blood Frenzy",
                desc: "",
                noToggle: true,
                run: function() {
                    var effectDurMod=1;if(Game.Has("Get lucky")&&(effectDurMod*=2),Game.Has("Lasting fortune")&&(effectDurMod*=1.1),Game.Has("Lucky digit")&&(effectDurMod*=1.01),Game.Has("Lucky number")&&(effectDurMod*=1.01),Game.Has("Green yeast digestives")&&(effectDurMod*=1.01),Game.Has("Lucky payout")&&(effectDurMod*=1.01),effectDurMod*=1+.05*Game.auraMult("Epoch Manipulator"),effectDurMod*=Game.eff("goldenCookieEffDur"),Game.hasGod){var e=Game.hasGod("decadence");1==e?effectDurMod*=1.07:2==e?effectDurMod*=1.05:3==e&&(effectDurMod*=1.02)}
                    Game.gainBuff('blood frenzy',Math.ceil(6*effectDurMod),666);
                }
            },
            clickFrenzy: {
                name: "Click Frenzy",
                desc: "",
                noToggle: true,
                run: function() {
                    var effectDurMod=1;if(Game.Has("Get lucky")&&(effectDurMod*=2),Game.Has("Lasting fortune")&&(effectDurMod*=1.1),Game.Has("Lucky digit")&&(effectDurMod*=1.01),Game.Has("Lucky number")&&(effectDurMod*=1.01),Game.Has("Green yeast digestives")&&(effectDurMod*=1.01),Game.Has("Lucky payout")&&(effectDurMod*=1.01),effectDurMod*=1+.05*Game.auraMult("Epoch Manipulator"),effectDurMod*=Game.eff("goldenCookieEffDur"),Game.hasGod){var e=Game.hasGod("decadence");1==e?effectDurMod*=1.07:2==e?effectDurMod*=1.05:3==e&&(effectDurMod*=1.02)}
                    Game.gainBuff('click frenzy',Math.ceil(13*effectDurMod),777);
                }
            },
            dragonflight: {
                name: "Dragonflight",
                desc: "",
                noToggle: true,
                run: function() {
                    var effectDurMod=1;if(Game.Has("Get lucky")&&(effectDurMod*=2),Game.Has("Lasting fortune")&&(effectDurMod*=1.1),Game.Has("Lucky digit")&&(effectDurMod*=1.01),Game.Has("Lucky number")&&(effectDurMod*=1.01),Game.Has("Green yeast digestives")&&(effectDurMod*=1.01),Game.Has("Lucky payout")&&(effectDurMod*=1.01),effectDurMod*=1+.05*Game.auraMult("Epoch Manipulator"),effectDurMod*=Game.eff("goldenCookieEffDur"),Game.hasGod){var e=Game.hasGod("decadence");1==e?effectDurMod*=1.07:2==e?effectDurMod*=1.05:3==e&&(effectDurMod*=1.02)}
                    Game.gainBuff('dragonflight',Math.ceil(10*effectDurMod),1111);
                }
            },
            cookieStorm: {
                name: "Cookie Storm",
                desc: "",
                noToggle: true,
                run: function() {
                    var effectDurMod=1;if(Game.Has("Get lucky")&&(effectDurMod*=2),Game.Has("Lasting fortune")&&(effectDurMod*=1.1),Game.Has("Lucky digit")&&(effectDurMod*=1.01),Game.Has("Lucky number")&&(effectDurMod*=1.01),Game.Has("Green yeast digestives")&&(effectDurMod*=1.01),Game.Has("Lucky payout")&&(effectDurMod*=1.01),effectDurMod*=1+.05*Game.auraMult("Epoch Manipulator"),effectDurMod*=Game.eff("goldenCookieEffDur"),Game.hasGod){var e=Game.hasGod("decadence");1==e?effectDurMod*=1.07:2==e?effectDurMod*=1.05:3==e&&(effectDurMod*=1.02)}
                    Game.gainBuff('cookie storm',Math.ceil(7*effectDurMod),7);
                }
            },
            cookieStormDrop: {
                name: "Cookie Storm Drop",
                desc: "Either 1-7 cookies or 1-7 minutes of cookie production, whichever is highest",
                noToggle: true,
                run: function() {
                    var mult=1;mult*=1+.1*Game.auraMult("Ancestral Metamorphosis"),Game.Has("Green yeast digestives")&&(mult*=1.01),Game.Has("Dragon fang")&&(mult*=1.03),mult*=Game.eff("goldenCookieGain");
                    var moni=Math.max(mult*(Game.cookiesPs*60*Math.floor(Math.random()*7+1)),Math.floor(Math.random()*7+1));
                    Game.Earn(moni);
                }
            },

            removeDebuffs: {
                name: "Remove Debuffs",
                desc: "Removes any debuff you acquire",
                run: function() {
                    var debuffs = ['Clot', 'Cursed finger', 'Haggler misery', 'Nasty goblins', 'Magic inept'];
                    for(var i in Game.buffs) {
                        var buff = Game.buffs[i];
                        if(debuffs.includes(buff.name) == true) {
                            buff.time = 0;
                        }
                    }
                    Game.updateBuffs();
                }
            },
            freeBuildings: {
                name: "Free Buildings",
                desc: "Make all buildings free (requires code injection, may cause incompatibilities with other mods)",
                runOnce: true,
                prePrices: null,
                cookieClickerDrawFunc: null,
                run: function() {
                    this.cookieClickerDrawFunc = Game.Draw;
                    const drawFunc = this.cookieClickerDrawFunc;
                    Game.Draw = function() {
                        drawFunc();
                        Game.ObjectsById.forEach((building) => {building.l.className = 'product unlocked enabled';});
                    }
                    Game.ObjectsById.forEach((building) => {
                        building.getPrice = function(n) {
                            return 0;
                        }
                        TheConsole.config.freeBuildings.prePrices = [building.basePrice, building.price, building.bulkPrice];
                        building.basePrice = 0;
                        building.price = 0;
                        building.bulkPrice = 0;
                        building.rebuild = function() {
                            var me=building;
                            var price=me.bulkPrice;
                            var icon=[0,me.icon];
                            var iconOff=[1,me.icon];
                            if (me.iconFunc) icon=me.iconFunc();
                            var desc=me.desc;
                            var name=me.dname;
                            var displayName=me.displayName;
                            if (Game.season=='fools') {
                                if (!Game.foolObjects[me.name]) {
                                    icon=[2,0];
                                    iconOff=[3,0];
                                    name=Game.foolObjects['Unknown'].name;
                                    desc=Game.foolObjects['Unknown'].desc;
                                } else {
                                    icon=[2,me.icon];
                                    iconOff=[3,me.icon];
                                    name=Game.foolObjects[me.name].name;
                                    desc=Game.foolObjects[me.name].desc;
                                }
                                displayName=name;
                            }
                            else if (!EN) displayName=name;
                            icon=[icon[0]*64,icon[1]*64];
                            iconOff=[iconOff[0]*64,iconOff[1]*64];
                            l('productIcon'+me.id).style.backgroundPosition='-'+icon[0]+'px -'+icon[1]+'px';
                            l('productIconOff'+me.id).style.backgroundPosition='-'+iconOff[0]+'px -'+iconOff[1]+'px';
                            l('productName'+me.id).innerHTML=displayName;
                            if (name.length>12/Langs[locId].w && (Game.season=='fools' || !EN)) l('productName'+me.id).classList.add('longProductName'); else l('productName'+me.id).classList.remove('longProductName');
                            l('productOwned'+me.id).textContent=me.amount?me.amount:'';
                            l('productPrice'+me.id).textContent='Free';
                            l('productPriceMult'+me.id).textContent=(Game.buyBulk>1)?('x'+Game.buyBulk+' '):'';
                            l('productLevel'+me.id).textContent='lvl '+Beautify(me.level);
                            if(Game.isMinigameReady(me) && Game.ascensionMode!=1) {
                                l('productMinigameButton'+me.id).style.display='block';
                                if (!me.onMinigame) l('productMinigameButton'+me.id).textContent=loc("View %1",me.minigameName);
                                else l('productMinigameButton'+me.id).textContent=loc("Close %1",me.minigameName);
                            }
                            else l('productMinigameButton'+me.id).style.display='none';
                            if (Game.isMinigameReady(me) && Game.ascensionMode!=1 && me.minigame.dragonBoostTooltip && Game.hasAura('Supreme Intellect')) {
                                l('productDragonBoost'+me.id).style.display='block';
                            } else l('productDragonBoost'+me.id).style.display='none';
                        }
                    });
                },
                cancel: function() {
                    if(TheConsole.config.freeBuildings.prePrices == null) {
                        return;
                    }
                    const drawFunc = this.cookieClickerDrawFunc;
                    Game.Draw = function() {
                        drawFunc();
                    }
                    this.cookieClickerDrawFunc = null;
                    Game.ObjectsById.forEach((building) => {
                        building.getPrice = function(n) {
                            var price=this.basePrice*Math.pow(Game.priceIncrease,Math.max(0,this.amount-this.free));
                            price=Game.modifyBuildingPrice(this,price);
                            return Math.ceil(price);
                        }
                        building.basePrice = TheConsole.config.freeBuildings.prePrices[0];
                        building.price = TheConsole.config.freeBuildings.prePrices[1];
                        building.bulkPrice = TheConsole.config.freeBuildings.prePrices[2];
                        building.rebuild = function() {
                            var me=building;
                            var price=me.bulkPrice;
                            var icon=[0,me.icon];
                            var iconOff=[1,me.icon];
                            if (me.iconFunc) icon=me.iconFunc();
                            var desc=me.desc;
                            var name=me.dname;
                            var displayName=me.displayName;
                            if (Game.season=='fools') {
                                if (!Game.foolObjects[me.name]) {
                                    icon=[2,0];
                                    iconOff=[3,0];
                                    name=Game.foolObjects['Unknown'].name;
                                    desc=Game.foolObjects['Unknown'].desc;
                                } else {
                                    icon=[2,me.icon];
                                    iconOff=[3,me.icon];
                                    name=Game.foolObjects[me.name].name;
                                    desc=Game.foolObjects[me.name].desc;
                                }
                                displayName=name;
                            }
                            else if (!EN) displayName=name;
                            icon=[icon[0]*64,icon[1]*64];
                            iconOff=[iconOff[0]*64,iconOff[1]*64];
                            l('productIcon'+me.id).style.backgroundPosition='-'+icon[0]+'px -'+icon[1]+'px';
                            l('productIconOff'+me.id).style.backgroundPosition='-'+iconOff[0]+'px -'+iconOff[1]+'px';
                            l('productName'+me.id).innerHTML=displayName;
                            if (name.length>12/Langs[locId].w && (Game.season=='fools' || !EN)) l('productName'+me.id).classList.add('longProductName'); else l('productName'+me.id).classList.remove('longProductName');
                            l('productOwned'+me.id).textContent=me.amount?me.amount:'';
                            l('productPrice'+me.id).textContent=Beautify(Math.round(price));
                            l('productPriceMult'+me.id).textContent=(Game.buyBulk>1)?('x'+Game.buyBulk+' '):'';
                            l('productLevel'+me.id).textContent='lvl '+Beautify(me.level);
                            if(Game.isMinigameReady(me) && Game.ascensionMode!=1) {
                                l('productMinigameButton'+me.id).style.display='block';
                                if (!me.onMinigame) l('productMinigameButton'+me.id).textContent=loc("View %1",me.minigameName);
                                else l('productMinigameButton'+me.id).textContent=loc("Close %1",me.minigameName);
                            }
                            else l('productMinigameButton'+me.id).style.display='none';
                            if (Game.isMinigameReady(me) && Game.ascensionMode!=1 && me.minigame.dragonBoostTooltip && Game.hasAura('Supreme Intellect')) {
                                l('productDragonBoost'+me.id).style.display='block';
                            } else l('productDragonBoost'+me.id).style.display='none';
                        }
                    });
                }
            },
            achievementUnlocker: {
                runOnce: true,
                name: "Achievement Unlocker",
                desc: "Click any achievement in the Stats page to unlock it (requires code injection) (no I will not add a mass unlock button, even though I could!)",
                shadows: [],
                oldUpdateMenu: null,
                run: function() {
                    for(let a in Game.Achievements) {
                        var it = Game.Achievements[a];
                        if(it.pool == 'shadow') {
                            this.shadows.push(a);
                            it.pool = 'normal';
                        }
                    }
                    if(!this.oldUpdateMenu) {
                        this.oldUpdateMenu = Game.UpdateMenu;
                    }
                    Game.UpdateMenu = function() {
                        Game.mods['TheConsole'].config.achievementUnlocker.oldUpdateMenu();
                        if(Game.onMenu == 'stats') {
                            const achievementDiv = l('statsAchievs');
                            const achievements = achievementDiv.getElementsByClassName("crateBox")[0];
                            for(const child of achievements.children) {
                                const achievementID = child.getAttribute("data-id");
                                child.addEventListener("click", function() {
                                    Game.mods['TheConsole'].toggleAchievement(achievementID);
                                });
                            }
                        }
                    }
                },
                cancel: function() {
                    if(this.shadows != undefined && this.shadows.length) {
                        for(let a in this.shadows) {
                            var it = Game.Achievements[this.shadows[a]];
                            it.pool = 'shadow';
                        }
                        this.shadows = [];
                    }
                    if(this.oldUpdateMenu) {
                        Game.UpdateMenu = function() {
                            Game.mods['TheConsole'].config.achievementUnlocker.oldUpdateMenu();
                        }
                    }
                }
            },
        }
        for(let cheat in config) {
            if(config[cheat].noToggle != undefined) continue;
            if(config[cheat].state == undefined) config[cheat].state = false;
            if(config[cheat].runOnce != undefined) continue;
            if(config[cheat].delay == undefined) config[cheat].delay = 100;
            if(config[cheat].interval == undefined) config[cheat].interval = null;
        }
        return config;
    },

    init: function() {
        Game.registerHook('reset', function(p) {
            if(p) TheConsole.resetConfig('Hard Save Wipe');
        });
        //setTimeout(function(){Game.ShowMenu('prefs')}, 500);
        TheConsole.config = TheConsole.initConfig();
        const cookieClicker_UpdateMenu = Game.UpdateMenu;
        Game.UpdateMenu = function() {
            cookieClicker_UpdateMenu();
            if(Game.onMenu == 'prefs') Game.mods['TheConsole'].menu.addPrefs();
            if(Game.onMenu == 'log') Game.mods['TheConsole'].menu.addChangeNotes();
        }
        Game.Notify(`${TheConsole.name} loaded successfully!`, `Please fav & thumbs up the mod!<br><span style="float:right">Created by Best Dad</span>`, [32,27], 10);
    },

    save: function() {
        let saveConfig = {};
        for(let cheat in TheConsole.config) {
            if(TheConsole.config[cheat].noLoop != undefined) continue;
            saveConfig[cheat] = TheConsole.config[cheat].state;
        }
        return JSON.stringify(saveConfig);
    },

    load: function(str) {
        let loadConfig = JSON.parse(str);
        for(let cheat in loadConfig) {
            TheConsole.config[cheat].state = loadConfig[cheat];
            if(TheConsole.config[cheat].state) {
                TheConsole.toggleCheat(cheat);
            }
        }
    },

    resetConfigConfirm: function() {
        Game.Prompt(`${tinyIcon([32,27])} The Console<div class="line"></div>Do you really want to fully reset your config?`,[[loc("Yes"),'Game.mods["TheConsole"].resetConfig();Game.ClosePrompt();','float:left'],[loc("No"),0,'float:right']]);
    },

    resetConfig: function(reason='Manual reset') {
        for(let cheat in TheConsole.config) {
            if(TheConsole.config[cheat].state != undefined) {
                let interval = TheConsole.config[cheat].interval;
                if(interval != undefined) {
                    clearInterval(interval);
                }
                if(TheConsole.config[cheat].cancel != undefined) {
                    TheConsole.config[cheat].cancel();
                }
            }
        }
        TheConsole.config = TheConsole.initConfig();
        TheConsole.save();
        Game.UpdateMenu();
        Game.Notify(`${TheConsole.name}`, `Your config has been reset.<span style="float:right;">(Reason: ${reason})</span>`, [32,27], 10);
    },

    toggleAchievement: function(i) {
        if(!this.config.achievementUnlocker.shadows.length) return;
        let achievement = Game.AchievementsById[i];
        if(!achievement.won) {
            Game.Win(achievement.name);
        } else {
            Game.RemoveAchiev(achievement.name);
        }
        if (Game.onMenu=='stats') Game.UpdateMenu();
    },

    toggleCheat: function(cheat) {
        if(TheConsole.config[cheat].state) {
            if(TheConsole.config[cheat].noToggle || TheConsole.config[cheat].runOnce) {
                TheConsole.config[cheat].run();
            } else {
                let delay = TheConsole.config[cheat].delay;
                if(!delay || delay == undefined) delay = 100;
                TheConsole.config[cheat].state = true;
                TheConsole.config[cheat].interval = setInterval(function() {
                    TheConsole.config[cheat].run();
                }, delay);
            }
        } else {
            let interval = TheConsole.config[cheat].interval;
            if(interval) {
                clearInterval(interval);
                TheConsole.config[cheat].interval = null;
            }
            if(TheConsole.config[cheat].cancel != undefined) {
                TheConsole.config[cheat].cancel();
            }
            TheConsole.config[cheat].state = false;
        }
    },

    menu: {
        addChangeNotes: function() {
            let changeNotes = document.createElement('div');
            changeNotes.innerHTML = `<div class="block" style="padding:0px;margin:8px 4px;"><div class="subsection" style="padding:0px;">${Game.mods['TheConsole'].changeNotes}</div></div></div>`;
            let menu = l('menu');
            if(menu) {
                let menuNode = menu.getElementsByClassName('section')[0].parentElement;
                menuNode.childNodes[0].after(changeNotes);
            }
        },
        addPrefs: function() {
            let prefs = `
            <div class="title">
                <div class="icon" style="display:inline-block;float:left;margin-top:-14px;width:48px;height:48px;position:relative;background-position:${(-32*48)}px ${(-27*48)}px;"></div>
                The Console <label style="font-size:11px;color:rgba(255,255,255,0.5);padding-left:24px;">version ${TheConsole.version}</label>
            </div>
            <div class="listing">
                <div style="margin-bottom:12px;">
                    <label style="border:none;font-size:18px;font-weight:bold;">${tinyIcon([27,6])} Cheats</label>
                </div>
                <div style="padding-left:24px;">`;
            for(let cheat in TheConsole.config) {
                if(TheConsole.config[cheat].noToggle != undefined) {
                    prefs += `<a id="TheConsole_${cheat}" class="smallFancyButton option" ${Game.clickStr}="TheConsole.config['${cheat}'].run();PlaySound('snd/tick.mp3');">${TheConsole.config[cheat].name}</a><label>${TheConsole.config[cheat].desc}</label><br>`;
                } else {
                    if(cheat == 'removeDebuffs') prefs += '</div>';
                    prefs += TheConsole.menu.button(cheat) + `<label>${TheConsole.config[cheat].desc}</label><br>`;
                    if(cheat == 'endlessBuffs') prefs += '<div class="listing"><div style="margin:8px 0px 8px 0px;"><label>Click any of these buttons to give yourself the specified buff with time & effect the same as if you clicked a golden cookie for it</label></div>';
                }
            }
            prefs += `</div>
                <div style="margin:12px 0px 12px 0px;">
                    <label style="border:none;font-size:18px;font-weight:bold;">${tinyIcon([22,12])} Config</label>
                </div>
                <div style="padding-left:24px;">
                    <a id="TheConsole_OpenWorkshop" class="smallFancyButton prefButton option" ${Game.clickStr}="App.openLink('https://steamcommunity.com/id/trumplostlmfao/myworkshopfiles/')">Best Dad's Workshop</a><label>Open up Best Dad's Steam Workshop page in your browser</label><br>
                    <a id="TheConsole_ResetConfig" class="smallFancyButton prefButton option" ${Game.clickStr}="TheConsole.resetConfigConfirm();">Reset Config</a><label>Reset The Config's Config</label><br>
                </div>
            </div>
            `;
            let TheConsoleMenu = document.createElement('div');
            TheConsoleMenu.innerHTML = `<div class="block" style="padding:0px;margin:8px 4px;"><div class="subsection" style="padding:0px;">${prefs}</div></div></div>`;
            let menu = l('menu');
            if(menu) {
                let padding = menu.childNodes;
                padding = padding[padding.length - 1];
                if(padding) menu.insertBefore(TheConsoleMenu, padding);
                else menu.appendChild(TheConsoleMenu);
            }
            document.getElementById('TheConsole_sugarLump').addEventListener("contextmenu", (e) => {TheConsole.config.sugarLump.run(e.shiftKey ? 1000 : 10);});
            document.getElementById('TheConsole_sugarLump').addEventListener("click", (e) => {if(e.shiftKey){TheConsole.config.sugarLump.run(100);}});
        },
        buttonClick: function(cheat) {
            let toggle = !TheConsole.config[cheat].state;
            let name = TheConsole.config[cheat].name;
            TheConsole.config[cheat].state = toggle;
            const ele = document.getElementById(`TheConsole_${cheat}`);
            ele.textContent = `${name} ${toggle ? 'ON' : 'OFF'}`;
            ele.className = `smallFancyButton prefButton option ${toggle ? '' : ' off'}`;
            TheConsole.toggleCheat(cheat);
        },
        button: function(cheat) {
            let name = TheConsole.config[cheat].name;
            let toggled = TheConsole.config[cheat].state;
            return `<a id="TheConsole_${cheat}" class="smallFancyButton prefButton option${toggled ? '' : ' off'}" ${Game.clickStr}="TheConsole.menu.buttonClick('${cheat}');PlaySound('snd/tick.mp3');">${name}${toggled ? ' ON' : ' OFF'}</a>`;
        },
    },
};

Game.registerMod(TheConsole.id, TheConsole);
