const archetypes = {
    "MonoGeo": {
        description: "Archetype based on characters of the Geo element. These characters usually have synergy with each other. They are played with three or four geo characters and one flex character. Dps such as Ningguang, Noelle or Itto stand out. The use of Gorou is not always mandatory, but it is usually quite present in this archetype.",
        elements: ["Geo", "Geo", "Geo", "Flex"],
        pros_cons: "Easy to play, it is not blocked by any type of elemental shield, although they are not usually very effective against these",
        example_teams: [],
        color: "color_geo",
        color_illuminated: "color_geo_illuminated",
        recommended_characters: ["Gorou"]
    },
    "MonoHydro": {
        description: "Archetype based on the use of Hydro element characters. It is made up of three Hydro characters plus an Anemo character, who is responsible for decreasing Hydro resistance thanks to VV. Zhongli can also be used to decrease this resistance and have defensive utility",
        elements: ["Hydro", "Hydro", "Hydro", "Flex"],
        pros_cons: "Thanks to Furina this archetype has improved a lot, and no longer depends on Xingqiu and Yelan, so there are many alternatives. They excel at breaking fire shields, and tend to have very powerful single-target damage. In some situations, adding an electro character can result in better equipment.",
        example_teams: [],
        color: "color_hydro",
        color_illuminated: "color_hydro_illuminated",
        recommended_characters: []
    },
    "MonoCryo": {
        description: "Archetype based on the use of Cryo element characters. It is made up of three Cryo characters plus an Anemo character, who is responsible for decreasing Hydro resistance thanks to VV. A Cryo DPS like Ganyu, Ayaka, Wriothesley... is usually used along with Shenhe.",
        elements: ["Cryo", "Cryo", "Cryo", "Anemo"],
        pros_cons: "It is objectively inferior to the Freeze archetype... unless the enemy cannot be frozen. In these cases, it surpasses it and becomes a very good alternative, for example, against bosses.",
        example_teams: [],
        color: "color_cryo",
        color_illuminated: "color_cryo_illuminated",
        recommended_characters: ["Kaedehara Kazuha", "Shenhe"]
    },
    "MonoPyro": {
        description: "Archetype based on the use of Pyro element characters. It is made up of three Pyro characters plus an Anemo character, who is responsible for decreasing Hydro resistance thanks to VV. The basic archetype (although not the only one) is usually a Pyro DPS like Lyney, Dehya, Diluc, Klee... along with Xiangling, Bennett, and Kazuha",
        elements: ["Pyro", "Pyro", "Pyro", "Anemo"],
        pros_cons: "Very strong and less situational than most mono-element teams. Thanks to the fact that they usually use characters like Bennett, Xiangling or Kazuha, they have a lot of base damage in any situation. Only disadvantage, be careful with the pyro shields.",
        example_teams: [],
        color: "color_pyro",
        color_illuminated: "color_pyro_illuminated",
        recommended_characters: ["Bennett", "Kaedehara Kazuha"]
    },
    "MonoElectro": {
        description: "Archetype based on the use of Electro element characters. This archetype usually takes advantage of Sara's buff along with two Electro characters plus a Flex character, which is usually an anemo to decrease resistance via VV, or other sources of buffs such as Bennett or Zhongli.",
        elements: ["Electro", "Electro", "Electro", "Flex"],
        pros_cons: "Yae Miko and Raiden among others usually take advantage of this archetype, although usually the use of a Hypercarry team usually gives better results.",
        example_teams: [],
        color: "color_electro",
        color_illuminated: "color_electro_illuminated",
        recommended_characters: ["Kujou Sara"]
    },

    "Hypercarry": {
        description: "Teams where ALL the damage falls on a single character. The rest of the units are supports used to boost the unit chosen as Hypercarry.",
        elements: ["Flex", "Flex", "Flex", "Flex"],
        pros_cons: "All damage depends on the investment of the main carry, for better or worse, and they usually require vertical investment. The vast majority of onfield time is with the Hypercarry character, so ii's a good archetype if you like the chosen character.",
        example_teams: [],
        color: "color_hypercarry",
        color_illuminated: "color_hypercarry_illuminated",
        recommended_characters: []
    },
    "Freeze": {
        description: "They are based on keeping the enemy frozen in order to take advantages of the different bonuses that this brings, such as CC, Cryo consonance, and the Blizzard Strayer set.",
        elements: ["Cryo", ["Cryo", "Hydro"], "Hydro", "Anemo"],
        pros_cons: "t is a VERY powerful archetype when it works. And I say when it works, because Hoyoverse is doing everything possible so that in many of the abysses it doesn't, as a balancing method they usually put immune enemies by freezing. By leaving enemies frozen, it allows most teams to carry more offensive options, focusing less on defensive utility, since it is much easier to stay alive.",
        example_teams: [],
        color: "color_cryo",
        color_illuminated: "color_cryo_illuminated",
        recommended_characters: []
    },
    "National": {
        description: "Basically and without elaborating too much, Xiangling vaporizing with anything because she is balanced with Bennett.",
        elements: ["Xiangling", "Bennett", "Hydro", "Flex"],
        pros_cons: "It does not have any disadvantages, it usually works wherever and whenever since it has many variants that adapt to different situations.",
        example_teams: [],
        color: "color_pyro",
        color_illuminated: "color_pyro_illuminated",
        recommended_characters: []
    },
    "Vaporize": {
        description: "Characters that are based yes or yes on the vaporization reaction, or at least mainly. For example Hu Tao, Yoimiya... They are made up of a pyro character and another hydro, but the rest are very versatile, as long as it is an element that does not change the reaction.",
        elements: ["Pyro", "Hydro", "Flex", "Flex"],
        pros_cons: "It is an archetype that can adapt well to different needs, as there are two slots for Flex characters, depending on the needs of the Carry or the Abyss.",
        example_teams: [],
        color: "color_pyro",
        color_illuminated: "color_hydro_illuminated",
        recommended_characters: []
    },
    "Overvape": {
        description: "It can be considered a subarchetype of Vaporize. Basically, adding an Electro character to the Vaporize archetype forms this archetype. With this, we will win both the electrocharged and overloaded reactions, and we will continue to vaporize even more consistently thanks to the interaction between these elements.",
        elements: ["Pyro", "Hydro", "Electro", "Flex"],
        pros_cons: "Very good element combination to perform the three mentioned reactions, since the Pyro character will be both vaporized and overloaded at the same time. Of course, you have to be careful that the enemies don't get fired with the overloaded ones, so it's not always optimal.",
        example_teams: [],
        color: "color_pyro",
        color_illuminated: "color_hydro_illuminated",
        recommended_characters: []
    },

    "Overload": {
        description: "Archetype based on the Overload reaction. It is the combination of only Pyro and Electro characters, with at least one character of each element. Sometimes it can be combined with a Flex element like anemo/geo as supports, but it is less common.",
        elements: [ "Pyro", "Electro", ["Electro", "Pyro"], "Flex"],
        pros_cons: "Overload is a very good complementary reaction on certain teams and archetypes, such as Rational or Overvape, but as a reaction in itself to build teams it does not always deliver. The explosion that the reaction leaves behind can be annoying against enemies that are thrown away and characters with low range that you have to chase after, so it is usually used with Elites or Bosses. Thanks to Chevreuse, this reaction has been greatly buffed and is meta under certain circumstances, but its use is not mandatory.",
        example_teams: [],
        color: "color_pyro",
        color_illuminated: "color_electro_illuminated",
        recommended_characters: ["Chevreuse"]
    },
    
    "Taser": {
        description: "Any combination between 1-2 electro characters and 1-2 hydro characters plus an anemo character. Its main reaction is electrocharged and swirls, but they are not its main source of damage, since it is not a team based damage reaction.",
        elements: ["Electro", ["Electro", "Hydro"], "Hydro", "Anemo"],
        pros_cons: "Thanks to the electrocharged aura, the anemo character will be able to apply VV to both elements. Most teams do not usually have healers options, which makes them difficult to play.",
        example_teams: [],
        color: "color_electro",
        color_illuminated: "color_hydro_illuminated",
        recommended_characters: []
    },
    "Soup": {
        description: "A 'Batiburrillo' of reactions, there is usually an on-field anemo with which you can apply VV to the three elements and keep the enemies grouped together. It is famous for the Pokemon team: Sucrose, Kokomi, Xiangling, Fischl",
        elements: ["Anemo", "Hydro", "Pyro", "Electro"],
        pros_cons: "You push enemies with overload, but you compensate with the grouping of anemo characters.",
        example_teams: [],
        color: "color_flex",
        color_illuminated: "color_flex_illuminated",
        recommended_characters: []
    },
    "Melt": {
        description: "Archetype based on the melt reaction. You can do both melts with a pyro character, and reverse melts with a cryo carry.",
        elements: ["Cryo", "Pyro", "Flex", "Flex"],
        pros_cons: "",
        example_teams: [],
        color: "color_cryo",
        color_illuminated: "color_pyro_illuminated",
        recommended_characters: ["Bennett"]
    },
    "Aggravate": {
        description: "Archetype that has the electro element as its protagonist. By bringing together two electro characters (one is usually Fischl due to his fabolous synergy with this archetype but it is not mandatory), we use a Dendro character to apply the aura and perform Intensified, and together with an Anemo character to make VV, we obtain a team of pure Electro.",
        elements: [],
        pros_cons: "Because of how Quicken's aura works, it doesn't need much dendro application, so the healer/shielder slot can be the dendro.",
        example_teams: [],
        color: "color_electro",
        color_illuminated: "color_electro_illuminated",
        recommended_characters: ["Fischl"]
    },
    "Spread": {
        description: "Even applying Quicken's aura, this time the protagonist of this reaction is the Dendro element, and we will dedicate ourselves to making Spread. One or two characters will be chosen who can apply Off-Field electro, and because the On-Field character is dendro, the use of Fischl is not necessary",
        elements: ["Dendro", "Dendro", "Electro", "Flex"],
        pros_cons: "Although we can also use Anemos characters to group, since VV cannot be applied to the Dendro element, the flex slot can be dedicated to a second Electro character, or another type of utility such as Zhongli",
        example_teams: [],
        color: "color_dendro",
        color_illuminated: "color_dendro_illuminated",
        recommended_characters: ["Nahida"]
    },
    "Bloom": {
        description: "Archetype that owes its existence to Nilou and its change to the Bloom reaction. Due to how the reaction works, the most optimal thing is for a hydro character to be the one who apply the reaction, which will go full EM.",
        elements: ["Nilou", "Hydro",["Dendro", "Hydro"], "Dendro"],
        pros_cons: "The seeds created by the reaction also damage the user, so the use of a healer character is mandatory. It stands out in AoE situations where grouping is not necessary (By not being able to put an Anemo character, we will not be able to group them). Very very good when the conditions are met.",
        example_teams: [],
        color: "color_dendro",
        color_illuminated: "color_hydro_illuminated",
        recommended_characters: []
    },
    "Burgeon": {
        description: "Based on the Burgeon reaction. The seeds are activated with a Pyro element character, who will go full EM to maximize the damage of the reaction. As a last element, you can put another hydro/pyro/dendro character that helps on the team, or an element that does not interfere with the reaction like geo/anemo. From this archetype, other archetypes such as Oven, Curry and Sauté are born if you add other elements or modify the way of applying burgeon.",
        elements: ["Dendro", "Hydro", "Pyro", "Flex"],
        pros_cons: "It takes a lot of hydro application, or a very slow pyro application, to generate consistent seeds. Excels in AoE, and can sometimes be grouped with an anemo character.",
        example_teams: [],
        color: "color_pyro",
        color_illuminated: "color_dendro_illuminated",
        recommended_characters: []
    },
    "Oven": {
        description: "We add the Cryo element to our Burgeon team.",
        elements: ["Dendro", "Hydro", "Pyro", "Cryo"],
        pros_cons: "With this, we will be able to generate more seeds due to the interaction of Dendro+Cryo, in addition to freezing the enemies.",
        example_teams: [],
        color: "color_pyro",
        color_illuminated: "color_cryo_illuminated",
        recommended_characters: []
    },
    "Curry": {
        description: "We add the Electro element to our Burgeon team. They are usually played with electro characters that do not activate hyperbloom seeds, such as Fischl or Razor, but you can also play with characters that do activate the seeds to create a mix between burgeon+hyperbloom. Reaction medley that works surprisingly well.",
        elements: ["Dendro", "Hydro", "Pyro", "Electro"],
        pros_cons: "More seeds are generated than on Burgeon teams since electro lowers the burning aura, and they are teams that tend to have more single target damage than the burgeon archetype itself, due to the overloaded reaction and characters like Fischl. When applying this last reaction, the Curry archetype is good against enemies that don't fly away like Elites or Bosses.",
        example_teams: [],
        color: "color_pyro",
        color_illuminated: "color_electro_illuminated",
        recommended_characters: []
    },
    "Sauté": {
        description: "Although similar to Burgeon, in this team we will NOT use a Pyro character to apply burgeon. We will imbue an Anemo character's ability with the Pyro element to perform the reaction.",
        elements: ["Dendro", "Hydro", "Pyro", "Anemo"],
        pros_cons: "Unlike most Pyro characters, Anemo characters are built to EM, so they will be able to apply burgeon with great damage. Also, since they usually have grouping, this archetype is effective for when you need to group a lot of enemies and have AoE damage.",
        example_teams: [],
        color: "color_anemo",
        color_illuminated: "color_dendro_illuminated",
        recommended_characters: ["Kaedehara Kazuha", "Jean"]
    },
    "Fridge": {
        description: "Since the Bloom reaction seeds do not break the status offered by the Freeze reaction, we took advantage of this to create the Fridge archetype. In this reaction we will have at least one Dendro, Hydro and Cryo character. The Flex character must be another of these elements or one that does not interfere with the reactions.",
        elements: ["Dendro", "Hydro", "Cryo", "Flex"],
        pros_cons: "This reaction is not very good on his own, and there is currently no character who can take advantage of it (Sorry for Kaveh). For this reason, other archetypes are used that take advantage of part of this interaction, such as Oven or HyperFridge.",
        example_teams: [],
        color: "color_dendro",
        color_illuminated: "color_cryo_illuminated",
        recommended_characters: []
    },
    "Salad": {
        description: "It is an archetype that bases its damage on Hyperbloom's reaction. However, the beauty of this team is that we will have Electro characters who do not activate the seeds, so it will be the Anemo character himself who will make the seeds explode when swirling.",
        elements: ["Anemo", "Hydro", "Dendro", "Electro"],
        pros_cons: "You should avoid electro characters that blow seeds like Shinobu or Raiden. Anemos characters are usually built to EM, so hyperbloom seeds will do a lot of damage, and we will have grouping.",
        example_teams: [],
        color: "color_anemo",
        color_illuminated: "color_dendro_illuminated",
        recommended_characters: ["Sucrose"]
    },
    "Airfryer": {
        description: "",
        elements: [],
        pros_cons: "",
        example_teams: [],
        color: "color_anemo",
        color_illuminated: "color_pyro_illuminated",
        recommended_characters: []
    },
    "Hyperbloom": {
        description: "",
        elements: [],
        pros_cons: "",
        example_teams: [],
        color: "color_electro",
        color_illuminated: "color_dendro_illuminated",
        recommended_characters: []
    },
    "Quickbloom": {
        description: "",
        elements: [],
        pros_cons: "",
        example_teams: [],
        color: "color_dendro",
        color_illuminated: "color_electro_illuminated",
        recommended_characters: []
    },
    "HyperFridge": {
        description: "",
        elements: [],
        pros_cons: "",
        example_teams: [],
        color: "color_dendro",
        color_illuminated: "color_cryo_illuminated",
        recommended_characters: []
    },

    "Bain-Marie": {
        description: "",
        elements: [],
        pros_cons: "",
        example_teams: [],
        color: "color_cryo",
        color_illuminated: "color_dendro_illuminated",
        recommended_characters: []
    }
};
