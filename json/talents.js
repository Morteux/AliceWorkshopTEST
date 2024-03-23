const talents = {
    "Arlecchino": {
        "id": 0,
        "name": "Arlecchino",
        "combat1": {
            "name": "Normal Attack: Bidden Beheading",
            "descriptionRaw": "<color=#FFD780FF>Normal Attack</color>\nPerforms a maximum of 6 consecutive strikes.\n\n<color=#FFD780FF>Charged Attack</color>\nConsumes a fixed amount of Stamina, dashing toward a nearby opponent and cleaving once. Hold to gain increased mobility for up to 15s at the cost of stamina.\n\n<color=#FFD780FF>Plunging Attack</color>\nPlunges from mid-air to strike the ground below, damaging opponents along the path and dealing AoE DMG upon impact.\n\n<color=#FFD780FF>In Praise of Shadows and the Masque of the Red Death</color>\nWhen Arlecchino has a Bond of Life equal to or greater than 30% of her Max HP, and her Normal, Charged, and Plunging Attacks will be converted to deal <color=#FF9999FF>Pyro DMG</color>. This cannot be overridden. \n When in the In Praise of Shadows state, Arlecchino's Normal Attacks will be converted to Masque of the Red Death: When she hits an opponent, this attack will deal extra DMG that is scaled off her ATK multiplied by her current Bond of Life percentage. This will consume 5.5% of said current Bond of Life. A Bond of Life can be consumed this way every 0.03s.",
            "description": "Normal Attack\nPerforms up to 4 consecutive shots with a bow.\n\nCharged Attack\nPerforms a more precise Aimed Shot with increased DMG.\nWhile aiming, flowing water will accumulate on the arrowhead. A fully charged torrential arrow will deal Hydro DMG.\n\nBreakthrough\nYelan will enter a \"Breakthrough\" state after spending 5s out of combat, which will cause her next Charged Aimed Shot to have 80% decreased charge time, and once charged, she can fire a \"Breakthrough Barb\" that will deal AoE Hydro DMG based on Yelan's Max HP.\n\nPlunging Attack\nFires off a shower of arrows in mid-air before falling and striking the ground, dealing AoE DMG upon impact.",
            "attributes": {
                "labels": [
                    "Masque of the Red Death Scaling Ratio|{param1:F1P}",
                    "1-Hit DMG|{param2:F1P}",
                    "2-Hit DMG|{param3:F1P}",
                    "3-Hit DMG|{param4:F1P}",
                    "4-Hit DMG|{param5:F1P}+{param5:F1P}",
                    "5-Hit DMG|{param6:F1P}",
                    "6-Hit DMG|{param7:F1P}",
                    "Charged Attack DMG|{param8:F1P}",
                    "Charged Attack Stamina Cost|{param9:F1P}",
                    "Plunge DMG|{param10:F1P}",
                    "Low/High Plunge DMG|{param11:P}/{param11:P}"
                ],
                "parameters": {
                    "param1": [
                        1.204,
                        1.302,
                        1.40,
                        1.54,
                        1.638,
                        1.75,
                        1.904,
                        2.058,
                        2.212,
                        2.38,
                        2.548,
                        2.716,
                        2.884,
                        3.052,
                        3.22
                    ],
                    "param2": [
                        0.4712,
                        0.5096,
                        0.548,
                        0.6027,
                        0.6411,
                        0.6849,
                        0.7452,
                        0.8055,
                        0.8658,
                        0.9315,
                        0.9973,
                        1.063,
                        1.1288,
                        1.1945,
                        1.2603
                    ],
                    "param3": [
                        0.5169,
                        0.559,
                        0.6011,
                        0.6612,
                        0.7033,
                        0.7514,
                        0.8175,
                        0.8836,
                        0.9497,
                        1.0219,
                        1.094,
                        1.1661,
                        1.2382,
                        1.3104,
                        1.3825
                    ],
                    "param4": [
                        0.6487,
                        0.7015,
                        0.7543,
                        0.8297,
                        0.8825,
                        0.9428,
                        1.0258,
                        1.1088,
                        1.1918,
                        1.2823,
                        1.3728,
                        1.4633,
                        1.5538,
                        1.6443,
                        1.7348
                    ],
                    "param5": [
                        0.3563,
                        0.3853,
                        0.4143,
                        0.4558,
                        0.4848,
                        0.5179,
                        0.5635,
                        0.6091,
                        0.6547,
                        0.7044,
                        0.7541,
                        0.8038,
                        0.8536,
                        0.9033,
                        0.953
                    ],
                    "param6": [
                        0.708,	
                        0.7656,
                        0.8233,
                        0.9056,
                        0.9632,
                        1.0291,
                        1.1196,
                        1.2102,
                        1.3008,
                        1.3996,
                        1.4984,
                        1.5971,
                        1.6959,
                        1.7947,
                        1.8935
                    ],
                    "param7": [
                        0.8486,
                        0.9176,
                        0.9867,
                        1.0854,
                        1.1544,
                        1.2334,
                        1.3419,
                        1.4504,
                        1.559,
                        1.6774,
                        1.7958,
                        1.9142,
                        2.0326,
                        2.151,
                        2.2694
                    ],
                    "param8": [
                        1.2969,
                        1.4024,
                        1.508,
                        1.6588,
                        1.7644,
                        1.885,
                        2.0509,
                        2.2168,
                        2.3826,
                        2.5636,
                        2.7446,
                        2.9255,
                        3.1065,
                        3.2874,
                        3.4684
                    ],
                    "param9": [
                        0.25,
                        0.25,
                        0.25,
                        0.25,
                        0.25,
                        0.25,
                        0.25,
                        0.25,
                        0.25,
                        0.25,
                        0.25,
                        0.25,
                        0.25,
                        0.25,
                        0.25
                    ],
                    "param10": [
                        0.6393,
                        0.6914,
                        0.7434,
                        0.8177,
                        0.8698,
                        0.9293,
                        1.011,
                        1.0928,
                        1.1746,
                        1.2638,
                        1.353,
                        1.4422,
                        1.5314,
                        1.6206,
                        1.7098
                    ],
                    "param11": [
                        1.2784,
                        1.3824,
                        1.4865,
                        1.6351,
                        1.7392,
                        1.8581,
                        2.0216,
                        2.1851,
                        2.3486,
                        2.527,
                        2.7054,
                        2.8838,
                        3.0622,
                        3.2405,
                        3.4189
                    ]
                }
            }
        },
        "combat2": {
            "name": "All is Ash",
            "descriptionRaw": "Summons forth Balemoon Bloodfire, dealing <color=#FF9999FF>Pyro DMG</color> to multiple nearby opponents and performing a dash-cleave against one of them, dealing <color=#FF9999FF>AoE Pyro DMG</color>. Opponents hit by the aforementioned attack will have a <color=#FFD780FF>Blood-Debt Directive</color> applied to them. After the dash-cleave, Arlecchino's Bond of Life will be cleared, and Nourishing Cinders will trigger: Arlecchino recovers HP equivalent to 200% of the value of the Life Bond that was cleared. \n \n  <color=#FFD780FF>Blood-Debt Directive</color>  \n· Lasts 30s. Every 3s, it will deal 1 instance of <color=#FF9999FF>Pyro DMG</color> to the opponent. Max 3 instances.\n· When Arlecchino uses a Charged Attack, she will absorb and clear nearby Blood-Debt Directives that she applied. Each Directive absorbed grants her a Bond of Life worth 20% of her Max HP.\n· The maximum value of the Bond of Life she can be granted through this method within 20s after using her Elemental Skill is 80% of her Max HP.\n\n<i>As she sees it, not every grain of wheat that falls upon the earth will grow into an ear, while those who obstruct her, once burned to ashes, can certainly be used to nourish flowers.</i>",
            "description": "Fires off a Lifeline that allows her to move rapidly, entangling and marking opponents along its path.\nWhen this rapid movement ends, the Lifeline will explode, dealing Hydro DMG to the marked opponents based on Yelan's Max HP.\n\nTap\nMoves a certain distance forward swiftly.\n\nHold\nEngages in continuous, swift movement, during which Yelan's resistance to interruption is increased.\nDuring this time, Yelan can control this rapid movement and end it by using this Skill again.\n\nAdditionally, each opponent marked by the Lifeline when it explodes grants Yelan a 34% chance to reset her Breakthrough state.",
            "flavorText": "Not until she begins to tug on the strings do evildoers, crooks, and scheming villains alike know that there is no escape.",
            "attributes": {
                "labels": [
                    "Spike DMG|{param1:F1P}",
                    "Cleave DMG|{param2:F1}",
                    "Blod-Debt Directive DMG|{param3:F1}",
                    "CD|{param4:F1}s"
                ],
                "parameters": {
                    "param1": [
                        0.1484,
                        0.1595,
                        0.1707,
                        0.1855,
                        0.1966,
                        0.2078,
                        0.2226,
                        0.2374,
                        0.2523,
                        0.2671,
                        0.282,
                        0.2968,
                        0.3153,
                        0.3339,
                        0.3525
                    ],
                    "param2": [
                        1.3356,
                        1.4358,
                        1.5359,
                        1.6695,
                        1.7697,
                        1.8698,
                        2.0034,
                        2.137,
                        2.2705,
                        2.4041,
                        2.5376,
                        2.6712,
                        2.8382,
                        3.0051,
                        3.172
                    ],
                    "param3": [
                        0.212,
                        0.2279,
                        0.2438,
                        0.265,
                        0.2809,
                        0.2968,
                        0.318,
                        0.3392,
                        0.3604,
                        0.3816,
                        0.4028,
                        0.424,
                        0.4505,
                        0.477,
                        0.5035
                    ],
                    "param4": [
                        15,
                        15,
                        15,
                        15,
                        15,
                        15,
                        15,
                        15,
                        15,
                        15,
                        15,
                        15,
                        15,
                        15,
                        15
                    ]
                }
            }
        },
        "combat3": {
            "name": "Balemoon Rising",
            "descriptionRaw": "Great wings of Balemoon Bloodfire beat, granting Arlecchino a Bond of Life worth 15% of her Max HP and dealing <color=#FF9999FF>AoE Pyro DMG</color>.<i>\"t is commonly believed throughout Teyvat that moon phases other than the full moon are mere metaphors of ill-omen, used only by those who practice alchemy and astrology. \n She saw this crimson moon in her dreams many times. Were those portents of disaster? Indeed they were, but the destined catastrophes belonged to those who enraged her.\"</i>",
            "description": "Deals AoE Hydro DMG and creates an \"Exquisite Throw,\" which aids her in battle.\n\nExquisite Throw\nFollows the character around and will initiate a coordinated attack under the following circumstances, dealing Hydro DMG based on Yelan's Max HP:\n·Can occur once every second when your active character uses a Normal Attack.\n·Will occur each time Yelan's Lifeline explodes and hits opponents.",
            "flavorText": "\"A gambling addiction is going to do you no good. I mean, let me just do the math for you as the dealer. What do you think your odds of beating me are, when I have seven dice and you, only one?\"",
            "attributes": {
                "labels": [
                    "Skill DMG|{param1:F2P}",
                    "CD|{param2:F1}s",
                    "Energy Cost|{param3:I}"
                ],
                "parameters": {
                    "param1": [
                        3.704,
                        3.9818,
                        4.2596,
                        4.63,
                        4.9078,
                        5.1856,
                        5.556,
                        5.9264,
                        6.2968,
                        6.6672,
                        7.0376,
                        7.408,
                        7.871,
                        8.334,
                        8.797
                    ],
                    "param2": [
                        15,
                        15,
                        15,
                        15,
                        15,
                        15,
                        15,
                        15,
                        15,
                        15,
                        15,
                        15,
                        15,
                        15,
                        15
                    ],
                    "param3": [
                        60,
                        60,
                        60,
                        60,
                        60,
                        60,
                        60,
                        60,
                        60,
                        60,
                        60,
                        60,
                        60,
                        60,
                        60
                    ]
                }
            }
        },
        "passive1": {
            "name": "Agony Alone May Be Repaid",
            "descriptionRaw": "There are different levels of <color=#FFD780FF>Blood-Debt Directive</color>. At different levels, absorbing a Directive will grant Arlecchino differing amounts of Bond of Life: \n· Directives start at Level 1, increasing every 3s until Level 3 is reached. \n· Arlecchino will gain a Bond of Life worth 20%/25%/70% of her Max HP when absorbing a Level 1/2/3 Directive. \nDefeating a foe with Blood-Debt Directive will immediately grant Arlecchino a Bond of Life worth 70% of her Max HP.\n\n When being granted a Bond of Life through the mechanic described above, the value of the Bond of Life cannot exceed the original limit of <color=#FFD780FF>All is Ash.</color>",
            "description": "When the party has 1/2/3/4 Elemental Types, Yelan's Max HP is increased by 6%/12%/18%/30%."
        },
        "passive2": {
            "name": "Strength Alone Can Defende",
            "descriptionRaw": "Arlecchino gains 1% All Elemental and Physical RES for every 100 ATK she has in excess of 1,000. The maximum RES increase she can gain this way for each is 20%.",
            "description": "So long as an Exquisite Throw is in play, your own active character deals 1% more DMG. This increases by a further 3.5% DMG every second. The maximum increase to DMG dealt is 50%.\nThe pre-existing effect will be dispelled if Depth-Clarion Dice is recast during its duration."
        },
        "passive3": {
            "name": "Cinders Alone Shall Nourish",
            "descriptionRaw": "She receives a <color=#FF9999FF>40% Pyro DMG Bonus</color>. While in combat, Arlecchino can only receive the healing effect from <color=#FFD780FF>All is Ash's Nourishing Cinders</color>.",
            "description": "Gains 25% more rewards when dispatched on a Liyue Expedition for 20 hours."
        },
        "costs": {
            "lvl2": [
                {
                    "id": 202,
                    "name": "Mora",
                    "count": 12500
                }

            ],
            "lvl3": [
                {
                    "id": 202,
                    "name": "Mora",
                    "count": 17500
                }
            ],
            "lvl4": [
                {
                    "id": 202,
                    "name": "Mora",
                    "count": 25000
                }
            ],
            "lvl5": [
                {
                    "id": 202,
                    "name": "Mora",
                    "count": 30000
                }
            ],
            "lvl6": [
                {
                    "id": 202,
                    "name": "Mora",
                    "count": 37500
                }
            ],
            "lvl7": [
                {
                    "id": 202,
                    "name": "Mora",
                    "count": 120000
                }
            ],
            "lvl8": [
                {
                    "id": 202,
                    "name": "Mora",
                    "count": 260000
                }
            ],
            "lvl9": [
                {
                    "id": 202,
                    "name": "Mora",
                    "count": 450000
                }
            ],
            "lvl10": [
                {
                    "id": 202,
                    "name": "Mora",
                    "count": 700000
                }
            ]
        },
        "images": {
            "filename_combat1": "Skill_A_02",
            "filename_combat2": "Skill_S_Yelan_01",
            "filename_combat3": "Skill_E_Yelan_01_HD",
            "filename_passive1": "UI_Talent_S_Yelan_05",
            "filename_passive2": "UI_Talent_S_Yelan_06",
            "filename_passive3": "UI_Talent_Expedition_Liyue"
        },
        "version": ""
    }
};
