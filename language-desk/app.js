const MAX_LEVEL=100;
const LANGS={
ru:{name:'Russian',native:'Русский',tts:'ru-RU',sigil:'Я',trLabel:'transliteration',
words:[['дом','house','dom'],['город','city','gorod'],['книга','book','kniga'],['школа','school','shkola'],['окно','window','okno'],['лес','forest','les'],['река','river','reka'],['письмо','letter','pismo'],['мост','bridge','most'],['рынок','market','rynok']],
nouns:[{t:'дом',en:'house',g:'m',forms:{nom:'дом',acc:'дом',gen:'дома',prep:'доме'}},{t:'школа',en:'school',g:'f',forms:{nom:'школа',acc:'школу',gen:'школы',prep:'школе'}},{t:'окно',en:'window',g:'n',forms:{nom:'окно',acc:'окно',gen:'окна',prep:'окне'}},{t:'город',en:'city',g:'m',forms:{nom:'город',acc:'город',gen:'города',prep:'городе'}},{t:'река',en:'river',g:'f',forms:{nom:'река',acc:'реку',gen:'реки',prep:'реке'}}],
adj:[{base:'новый',en:'new',forms:{m:'новый',f:'новая',n:'новое'}},{base:'старый',en:'old',forms:{m:'старый',f:'старая',n:'старое'}},{base:'большой',en:'big',forms:{m:'большой',f:'большая',n:'большое'}},{base:'маленький',en:'small',forms:{m:'маленький',f:'маленькая',n:'маленькое'}}],
verbs:[{inf:'читать',en:'read',present:{i:'читаю',you:'читаешь',he:'читает',she:'читает',we:'читаем'},past:{m:'читал',f:'читала',pl:'читали'},future:{i:'буду читать',you:'будешь читать',he:'будет читать',she:'будет читать',we:'будем читать'}},{inf:'видеть',en:'see',present:{i:'вижу',you:'видишь',he:'видит',she:'видит',we:'видим'},past:{m:'видел',f:'видела',pl:'видели'},future:{i:'буду видеть',you:'будешь видеть',he:'будет видеть',she:'будет видеть',we:'будем видеть'}},{inf:'жить',en:'live',present:{i:'живу',you:'живёшь',he:'живёт',she:'живёт',we:'живём'},past:{m:'жил',f:'жила',pl:'жили'},future:{i:'буду жить',you:'будешь жить',he:'будет жить',she:'будет жить',we:'будем жить'}}],
preps:[{t:'в',en:'in',case:'prepositional',key:'prep'},{t:'из',en:'from',case:'genitive',key:'gen'},{t:'про',en:'about',case:'accusative',key:'acc'}],
subjects:[{t:'я',en:'I',k:'i',g:'m'},{t:'ты',en:'you',k:'you',g:'m'},{t:'он',en:'he',k:'he',g:'m'},{t:'она',en:'she',k:'she',g:'f'},{t:'мы',en:'we',k:'we',g:'pl'}],
sentences:[{en:'I read a book.',t:['я','читаю','книгу']},{en:'He sees the house.',t:['он','видит','дом']},{en:'We live in the city.',t:['мы','живём','в','городе']},{en:'The old house is here.',t:['старый','дом','здесь']}], filler:['есть','здесь']},
fr:{name:'French',native:'Français',tts:'fr-FR',sigil:'Ç',trLabel:'pronunciation hint',
words:[['maison','house','meh-zon'],['ville','city','veel'],['livre','book','leevr'],['école','school','ay-kol'],['fenêtre','window','fuh-netr'],['forêt','forest','fo-ray'],['rivière','river','ree-vyair'],['lettre','letter','letr'],['pont','bridge','pon'],['marché','market','mar-shay']],
nouns:[{t:'maison',en:'house',g:'f',forms:{nom:'la maison',acc:'la maison',gen:'de la maison',prep:'la maison'}},{t:'livre',en:'book',g:'m',forms:{nom:'le livre',acc:'le livre',gen:'du livre',prep:'le livre'}},{t:'école',en:'school',g:'f',forms:{nom:"l'école",acc:"l'école",gen:"de l'école",prep:"l'école"}},{t:'jardin',en:'garden',g:'m',forms:{nom:'le jardin',acc:'le jardin',gen:'du jardin',prep:'le jardin'}},{t:'ville',en:'city',g:'f',forms:{nom:'la ville',acc:'la ville',gen:'de la ville',prep:'la ville'}}],
adj:[{base:'nouveau',en:'new',forms:{m:'nouveau',f:'nouvelle',n:'nouveau'}},{base:'vieux',en:'old',forms:{m:'vieux',f:'vieille',n:'vieux'}},{base:'grand',en:'big',forms:{m:'grand',f:'grande',n:'grand'}},{base:'petit',en:'small',forms:{m:'petit',f:'petite',n:'petit'}}],
verbs:[{inf:'lire',en:'read',present:{i:'lis',you:'lis',he:'lit',she:'lit',we:'lisons'},past:{m:'ai lu',f:'ai lu',pl:'avons lu'},future:{i:'vais lire',you:'vas lire',he:'va lire',she:'va lire',we:'allons lire'}},{inf:'voir',en:'see',present:{i:'vois',you:'vois',he:'voit',she:'voit',we:'voyons'},past:{m:'ai vu',f:'ai vu',pl:'avons vu'},future:{i:'vais voir',you:'vas voir',he:'va voir',she:'va voir',we:'allons voir'}},{inf:'habiter',en:'live in',present:{i:'habite',you:'habites',he:'habite',she:'habite',we:'habitons'},past:{m:'ai habité',f:'ai habité',pl:'avons habité'},future:{i:'vais habiter',you:'vas habiter',he:'va habiter',she:'va habiter',we:'allons habiter'}}],
preps:[{t:'dans',en:'in',case:'prepositional phrase',key:'prep'},{t:'de',en:'from',case:'de phrase',key:'gen'},{t:'sur',en:'on',case:'prepositional phrase',key:'prep'}],
subjects:[{t:'je',en:'I',k:'i',g:'m'},{t:'tu',en:'you',k:'you',g:'m'},{t:'il',en:'he',k:'he',g:'m'},{t:'elle',en:'she',k:'she',g:'f'},{t:'nous',en:'we',k:'we',g:'pl'}],
sentences:[{en:'I read a book.',t:['je','lis','un','livre']},{en:'He sees the house.',t:['il','voit','la','maison']},{en:'We live in the city.',t:['nous','habitons','dans','la','ville']},{en:'The old house is here.',t:['la','vieille','maison','est','ici']}], filler:['est','ici']},
de:{name:'German',native:'Deutsch',tts:'de-DE',sigil:'ß',trLabel:'pronunciation hint',
words:[['Haus','house','hows'],['Stadt','city','shtat'],['Buch','book','bookh'],['Schule','school','shoo-luh'],['Fenster','window','fen-ster'],['Wald','forest','valt'],['Fluss','river','flooss'],['Brief','letter','breef'],['Brücke','bridge','brue-kuh'],['Markt','market','markt']],
nouns:[{t:'Haus',en:'house',g:'n',forms:{nom:'das Haus',acc:'das Haus',gen:'des Hauses',prep:'dem Haus'}},{t:'Schule',en:'school',g:'f',forms:{nom:'die Schule',acc:'die Schule',gen:'der Schule',prep:'der Schule'}},{t:'Buch',en:'book',g:'n',forms:{nom:'das Buch',acc:'das Buch',gen:'des Buches',prep:'dem Buch'}},{t:'Stadt',en:'city',g:'f',forms:{nom:'die Stadt',acc:'die Stadt',gen:'der Stadt',prep:'der Stadt'}},{t:'Wald',en:'forest',g:'m',forms:{nom:'der Wald',acc:'den Wald',gen:'des Waldes',prep:'dem Wald'}}],
adj:[{base:'neu',en:'new',forms:{m:'neue',f:'neue',n:'neues'}},{base:'alt',en:'old',forms:{m:'alte',f:'alte',n:'altes'}},{base:'groß',en:'big',forms:{m:'große',f:'große',n:'großes'}},{base:'klein',en:'small',forms:{m:'kleine',f:'kleine',n:'kleines'}}],
verbs:[{inf:'lesen',en:'read',present:{i:'lese',you:'liest',he:'liest',she:'liest',we:'lesen'},past:{m:'las',f:'las',pl:'lasen'},future:{i:'werde lesen',you:'wirst lesen',he:'wird lesen',she:'wird lesen',we:'werden lesen'}},{inf:'sehen',en:'see',present:{i:'sehe',you:'siehst',he:'sieht',she:'sieht',we:'sehen'},past:{m:'sah',f:'sah',pl:'sahen'},future:{i:'werde sehen',you:'wirst sehen',he:'wird sehen',she:'wird sehen',we:'werden sehen'}},{inf:'wohnen',en:'live',present:{i:'wohne',you:'wohnst',he:'wohnt',she:'wohnt',we:'wohnen'},past:{m:'wohnte',f:'wohnte',pl:'wohnten'},future:{i:'werde wohnen',you:'wirst wohnen',he:'wird wohnen',she:'wird wohnen',we:'werden wohnen'}}],
preps:[{t:'in',en:'in',case:'dative',key:'prep'},{t:'aus',en:'from',case:'dative',key:'prep'},{t:'über',en:'about',case:'accusative',key:'acc'}],
subjects:[{t:'ich',en:'I',k:'i',g:'m'},{t:'du',en:'you',k:'you',g:'m'},{t:'er',en:'he',k:'he',g:'m'},{t:'sie',en:'she',k:'she',g:'f'},{t:'wir',en:'we',k:'we',g:'pl'}],
sentences:[{en:'I read a book.',t:['ich','lese','ein','Buch']},{en:'He sees the house.',t:['er','sieht','das','Haus']},{en:'We live in the city.',t:['wir','wohnen','in','der','Stadt']},{en:'The old house is here.',t:['das','alte','Haus','ist','hier']}], filler:['ist','hier']}
};

// Additional starter languages. These are deliberately shallow MVP decks: enough for vocab,
// basic verb forms, adjective/noun prompts, preposition/form prompts, pronunciation, and sentence building.
Object.assign(LANGS, {
la:{name:'Latin (Classical)',native:'Latina',tts:'la',sigil:'L',trLabel:'classical hint',
words:[['domus','house','DOH-moos'],['urbs','city','oorbs'],['liber','book','LEE-ber'],['schola','school','SKHO-la'],['fenestra','window','feh-NES-tra'],['silva','forest','SEEL-wa'],['fluvius','river','FLOO-wi-oos'],['epistula','letter','eh-PIS-too-la'],['pons','bridge','pons'],['forum','market','FO-room']],
nouns:[{t:'domus',en:'house',g:'f',forms:{nom:'domus',acc:'domum',gen:'domūs',prep:'domō'}},{t:'urbs',en:'city',g:'f',forms:{nom:'urbs',acc:'urbem',gen:'urbis',prep:'urbe'}},{t:'liber',en:'book',g:'m',forms:{nom:'liber',acc:'librum',gen:'librī',prep:'librō'}},{t:'silva',en:'forest',g:'f',forms:{nom:'silva',acc:'silvam',gen:'silvae',prep:'silvā'}},{t:'forum',en:'market',g:'n',forms:{nom:'forum',acc:'forum',gen:'forī',prep:'forō'}}],
adj:[{base:'novus',en:'new',forms:{m:'novus',f:'nova',n:'novum'}},{base:'vetus',en:'old',forms:{m:'vetus',f:'vetus',n:'vetus'}},{base:'magnus',en:'big',forms:{m:'magnus',f:'magna',n:'magnum'}},{base:'parvus',en:'small',forms:{m:'parvus',f:'parva',n:'parvum'}}],
verbs:[{inf:'legere',en:'read',present:{i:'legō',you:'legis',he:'legit',she:'legit',we:'legimus'},past:{m:'lēgī',f:'lēgī',pl:'lēgimus'},future:{i:'legam',you:'legēs',he:'leget',she:'leget',we:'legēmus'}},{inf:'vidēre',en:'see',present:{i:'videō',you:'vidēs',he:'videt',she:'videt',we:'vidēmus'},past:{m:'vīdī',f:'vīdī',pl:'vīdimus'},future:{i:'vidēbō',you:'vidēbis',he:'vidēbit',she:'vidēbit',we:'vidēbimus'}},{inf:'habitāre',en:'live',present:{i:'habitō',you:'habitās',he:'habitat',she:'habitat',we:'habitāmus'},past:{m:'habitāvī',f:'habitāvī',pl:'habitāvimus'},future:{i:'habitābō',you:'habitābis',he:'habitābit',she:'habitābit',we:'habitābimus'}}],
preps:[{t:'in',en:'in',case:'ablative',key:'prep'},{t:'ex',en:'from',case:'ablative',key:'prep'},{t:'ad',en:'to',case:'accusative',key:'acc'}],
subjects:[{t:'ego',en:'I',k:'i',g:'m'},{t:'tū',en:'you',k:'you',g:'m'},{t:'is',en:'he',k:'he',g:'m'},{t:'ea',en:'she',k:'she',g:'f'},{t:'nōs',en:'we',k:'we',g:'pl'}],
sentences:[{en:'I read a book.',t:['ego','legō','librum']},{en:'He sees the house.',t:['is','videt','domum']},{en:'We live in the city.',t:['nōs','habitāmus','in','urbe']},{en:'The old house is here.',t:['domus','vetus','hic','est']}],filler:['est','hic']},
el:{name:'Attic Greek',native:'Ἀττική',tts:'el-GR',sigil:'Ω',trLabel:'classical hint',
words:[['οἶκος','house','oikos'],['πόλις','city','polis'],['βιβλίον','book','biblion'],['σχολή','school','skholē'],['θύρα','window/door','thyra'],['ὕλη','forest','hylē'],['ποταμός','river','potamos'],['ἐπιστολή','letter','epistolē'],['γέφυρα','bridge','gephyra'],['ἀγορά','market','agora']],
nouns:[{t:'οἶκος',en:'house',g:'m',forms:{nom:'ὁ οἶκος',acc:'τὸν οἶκον',gen:'τοῦ οἴκου',prep:'τῷ οἴκῳ'}},{t:'πόλις',en:'city',g:'f',forms:{nom:'ἡ πόλις',acc:'τὴν πόλιν',gen:'τῆς πόλεως',prep:'τῇ πόλει'}},{t:'βιβλίον',en:'book',g:'n',forms:{nom:'τὸ βιβλίον',acc:'τὸ βιβλίον',gen:'τοῦ βιβλίου',prep:'τῷ βιβλίῳ'}},{t:'ἀγορά',en:'market',g:'f',forms:{nom:'ἡ ἀγορά',acc:'τὴν ἀγοράν',gen:'τῆς ἀγορᾶς',prep:'τῇ ἀγορᾷ'}},{t:'ποταμός',en:'river',g:'m',forms:{nom:'ὁ ποταμός',acc:'τὸν ποταμόν',gen:'τοῦ ποταμοῦ',prep:'τῷ ποταμῷ'}}],
adj:[{base:'νέος',en:'new',forms:{m:'νέος',f:'νέα',n:'νέον'}},{base:'παλαιός',en:'old',forms:{m:'παλαιός',f:'παλαιά',n:'παλαιόν'}},{base:'μέγας',en:'big',forms:{m:'μέγας',f:'μεγάλη',n:'μέγα'}},{base:'μικρός',en:'small',forms:{m:'μικρός',f:'μικρά',n:'μικρόν'}}],
verbs:[{inf:'ἀναγιγνώσκειν',en:'read',present:{i:'ἀναγιγνώσκω',you:'ἀναγιγνώσκεις',he:'ἀναγιγνώσκει',she:'ἀναγιγνώσκει',we:'ἀναγιγνώσκομεν'},past:{m:'ἀνέγνων',f:'ἀνέγνων',pl:'ἀνέγνωμεν'},future:{i:'ἀναγνώσομαι',you:'ἀναγνώσῃ',he:'ἀναγνώσεται',she:'ἀναγνώσεται',we:'ἀναγνωσόμεθα'}},{inf:'ὁρᾶν',en:'see',present:{i:'ὁρῶ',you:'ὁρᾷς',he:'ὁρᾷ',she:'ὁρᾷ',we:'ὁρῶμεν'},past:{m:'εἶδον',f:'εἶδον',pl:'εἴδομεν'},future:{i:'ὄψομαι',you:'ὄψῃ',he:'ὄψεται',she:'ὄψεται',we:'ὀψόμεθα'}},{inf:'οἰκεῖν',en:'live',present:{i:'οἰκῶ',you:'οἰκεῖς',he:'οἰκεῖ',she:'οἰκεῖ',we:'οἰκοῦμεν'},past:{m:'ᾤκησα',f:'ᾤκησα',pl:'ᾠκήσαμεν'},future:{i:'οἰκήσω',you:'οἰκήσεις',he:'οἰκήσει',she:'οἰκήσει',we:'οἰκήσομεν'}}],
preps:[{t:'ἐν',en:'in',case:'dative',key:'prep'},{t:'ἐκ',en:'from',case:'genitive',key:'gen'},{t:'εἰς',en:'into',case:'accusative',key:'acc'}],
subjects:[{t:'ἐγώ',en:'I',k:'i',g:'m'},{t:'σύ',en:'you',k:'you',g:'m'},{t:'αὐτός',en:'he',k:'he',g:'m'},{t:'αὐτή',en:'she',k:'she',g:'f'},{t:'ἡμεῖς',en:'we',k:'we',g:'pl'}],
sentences:[{en:'I read a book.',t:['ἐγώ','ἀναγιγνώσκω','τὸ','βιβλίον']},{en:'He sees the house.',t:['αὐτός','ὁρᾷ','τὸν','οἶκον']},{en:'We live in the city.',t:['ἡμεῖς','οἰκοῦμεν','ἐν','τῇ','πόλει']},{en:'The old house is here.',t:['ὁ','παλαιός','οἶκος','ἐνταῦθα','ἐστίν']}],filler:['ἐστίν','ἐνταῦθα']}
});
function simpleLang(name,native,tts,sigil,words,nouns,adj,verbs,preps,subjects,sentences,filler=['is','here']){return {name,native,tts,sigil,trLabel:'pronunciation hint',words,nouns,adj,verbs,preps,subjects,sentences,filler};}
Object.assign(LANGS, {
es:simpleLang('Spanish','Español','es-ES','Ñ', [['casa','house','ka-sa'],['ciudad','city','thyoo-dad'],['libro','book','lee-bro'],['escuela','school','es-kwe-la'],['ventana','window','ben-ta-na'],['bosque','forest','bos-ke'],['río','river','ree-o'],['carta','letter','kar-ta'],['puente','bridge','pwen-te'],['mercado','market','mer-ka-do']], [{t:'casa',en:'house',g:'f',forms:{nom:'la casa',acc:'la casa',gen:'de la casa',prep:'la casa'}},{t:'ciudad',en:'city',g:'f',forms:{nom:'la ciudad',acc:'la ciudad',gen:'de la ciudad',prep:'la ciudad'}},{t:'libro',en:'book',g:'m',forms:{nom:'el libro',acc:'el libro',gen:'del libro',prep:'el libro'}},{t:'bosque',en:'forest',g:'m',forms:{nom:'el bosque',acc:'el bosque',gen:'del bosque',prep:'el bosque'}},{t:'escuela',en:'school',g:'f',forms:{nom:'la escuela',acc:'la escuela',gen:'de la escuela',prep:'la escuela'}}], [{base:'nuevo',en:'new',forms:{m:'nuevo',f:'nueva',n:'nuevo'}},{base:'viejo',en:'old',forms:{m:'viejo',f:'vieja',n:'viejo'}},{base:'grande',en:'big',forms:{m:'grande',f:'grande',n:'grande'}},{base:'pequeño',en:'small',forms:{m:'pequeño',f:'pequeña',n:'pequeño'}}], [{inf:'leer',en:'read',present:{i:'leo',you:'lees',he:'lee',she:'lee',we:'leemos'},past:{m:'leí',f:'leí',pl:'leímos'},future:{i:'voy a leer',you:'vas a leer',he:'va a leer',she:'va a leer',we:'vamos a leer'}},{inf:'ver',en:'see',present:{i:'veo',you:'ves',he:'ve',she:'ve',we:'vemos'},past:{m:'vi',f:'vi',pl:'vimos'},future:{i:'voy a ver',you:'vas a ver',he:'va a ver',she:'va a ver',we:'vamos a ver'}},{inf:'vivir',en:'live',present:{i:'vivo',you:'vives',he:'vive',she:'vive',we:'vivimos'},past:{m:'viví',f:'viví',pl:'vivimos'},future:{i:'voy a vivir',you:'vas a vivir',he:'va a vivir',she:'va a vivir',we:'vamos a vivir'}}], [{t:'en',en:'in',case:'prepositional phrase',key:'prep'},{t:'de',en:'from',case:'de phrase',key:'gen'},{t:'a',en:'to',case:'a phrase',key:'acc'}], [{t:'yo',en:'I',k:'i',g:'m'},{t:'tú',en:'you',k:'you',g:'m'},{t:'él',en:'he',k:'he',g:'m'},{t:'ella',en:'she',k:'she',g:'f'},{t:'nosotros',en:'we',k:'we',g:'pl'}], [{en:'I read a book.',t:['yo','leo','un','libro']},{en:'He sees the house.',t:['él','ve','la','casa']},{en:'We live in the city.',t:['nosotros','vivimos','en','la','ciudad']},{en:'The old house is here.',t:['la','casa','vieja','está','aquí']}], ['está','aquí']),
it:simpleLang('Italian','Italiano','it-IT','I', [['casa','house','ka-za'],['città','city','chee-tta'],['libro','book','lee-bro'],['scuola','school','skwo-la'],['finestra','window','fee-nes-tra'],['bosco','forest','bos-ko'],['fiume','river','fyoo-me'],['lettera','letter','let-te-ra'],['ponte','bridge','pon-te'],['mercato','market','mer-ka-to']], [{t:'casa',en:'house',g:'f',forms:{nom:'la casa',acc:'la casa',gen:'della casa',prep:'la casa'}},{t:'città',en:'city',g:'f',forms:{nom:'la città',acc:'la città',gen:'della città',prep:'la città'}},{t:'libro',en:'book',g:'m',forms:{nom:'il libro',acc:'il libro',gen:'del libro',prep:'il libro'}},{t:'bosco',en:'forest',g:'m',forms:{nom:'il bosco',acc:'il bosco',gen:'del bosco',prep:'il bosco'}},{t:'scuola',en:'school',g:'f',forms:{nom:'la scuola',acc:'la scuola',gen:'della scuola',prep:'la scuola'}}], [{base:'nuovo',en:'new',forms:{m:'nuovo',f:'nuova',n:'nuovo'}},{base:'vecchio',en:'old',forms:{m:'vecchio',f:'vecchia',n:'vecchio'}},{base:'grande',en:'big',forms:{m:'grande',f:'grande',n:'grande'}},{base:'piccolo',en:'small',forms:{m:'piccolo',f:'piccola',n:'piccolo'}}], [{inf:'leggere',en:'read',present:{i:'leggo',you:'leggi',he:'legge',she:'legge',we:'leggiamo'},past:{m:'ho letto',f:'ho letto',pl:'abbiamo letto'},future:{i:'leggerò',you:'leggerai',he:'leggerà',she:'leggerà',we:'leggeremo'}},{inf:'vedere',en:'see',present:{i:'vedo',you:'vedi',he:'vede',she:'vede',we:'vediamo'},past:{m:'ho visto',f:'ho visto',pl:'abbiamo visto'},future:{i:'vedrò',you:'vedrai',he:'vedrà',she:'vedrà',we:'vedremo'}},{inf:'vivere',en:'live',present:{i:'vivo',you:'vivi',he:'vive',she:'vive',we:'viviamo'},past:{m:'ho vissuto',f:'ho vissuto',pl:'abbiamo vissuto'},future:{i:'vivrò',you:'vivrai',he:'vivrà',she:'vivrà',we:'vivremo'}}], [{t:'in',en:'in',case:'prepositional phrase',key:'prep'},{t:'da',en:'from',case:'da phrase',key:'gen'},{t:'a',en:'to',case:'a phrase',key:'acc'}], [{t:'io',en:'I',k:'i',g:'m'},{t:'tu',en:'you',k:'you',g:'m'},{t:'lui',en:'he',k:'he',g:'m'},{t:'lei',en:'she',k:'she',g:'f'},{t:'noi',en:'we',k:'we',g:'pl'}], [{en:'I read a book.',t:['io','leggo','un','libro']},{en:'He sees the house.',t:['lui','vede','la','casa']},{en:'We live in the city.',t:['noi','viviamo','in','città']},{en:'The old house is here.',t:['la','casa','vecchia','è','qui']}], ['è','qui']),
ro:simpleLang('Romanian','Română','ro-RO','Ă', [['casă','house','ka-suh'],['oraș','city','o-rash'],['carte','book','kar-te'],['școală','school','shkoa-luh'],['fereastră','window','fe-ryas-truh'],['pădure','forest','puh-doo-re'],['râu','river','ruh-oo'],['scrisoare','letter','skree-soa-re'],['pod','bridge','pod'],['piață','market','pya-tsuh']], [{t:'casă',en:'house',g:'f',forms:{nom:'casa',acc:'casa',gen:'casei',prep:'casă'}},{t:'oraș',en:'city',g:'n',forms:{nom:'orașul',acc:'orașul',gen:'orașului',prep:'oraș'}},{t:'carte',en:'book',g:'f',forms:{nom:'cartea',acc:'cartea',gen:'cărții',prep:'carte'}},{t:'școală',en:'school',g:'f',forms:{nom:'școala',acc:'școala',gen:'școlii',prep:'școală'}},{t:'pădure',en:'forest',g:'f',forms:{nom:'pădurea',acc:'pădurea',gen:'pădurii',prep:'pădure'}}], [{base:'nou',en:'new',forms:{m:'nou',f:'nouă',n:'nou'}},{base:'vechi',en:'old',forms:{m:'vechi',f:'veche',n:'vechi'}},{base:'mare',en:'big',forms:{m:'mare',f:'mare',n:'mare'}},{base:'mic',en:'small',forms:{m:'mic',f:'mică',n:'mic'}}], [{inf:'a citi',en:'read',present:{i:'citesc',you:'citești',he:'citește',she:'citește',we:'citim'},past:{m:'am citit',f:'am citit',pl:'am citit'},future:{i:'voi citi',you:'vei citi',he:'va citi',she:'va citi',we:'vom citi'}},{inf:'a vedea',en:'see',present:{i:'văd',you:'vezi',he:'vede',she:'vede',we:'vedem'},past:{m:'am văzut',f:'am văzut',pl:'am văzut'},future:{i:'voi vedea',you:'vei vedea',he:'va vedea',she:'va vedea',we:'vom vedea'}},{inf:'a locui',en:'live',present:{i:'locuiesc',you:'locuiești',he:'locuiește',she:'locuiește',we:'locuim'},past:{m:'am locuit',f:'am locuit',pl:'am locuit'},future:{i:'voi locui',you:'vei locui',he:'va locui',she:'va locui',we:'vom locui'}}], [{t:'în',en:'in',case:'prepositional phrase',key:'prep'},{t:'din',en:'from',case:'from phrase',key:'gen'},{t:'la',en:'to',case:'to phrase',key:'acc'}], [{t:'eu',en:'I',k:'i',g:'m'},{t:'tu',en:'you',k:'you',g:'m'},{t:'el',en:'he',k:'he',g:'m'},{t:'ea',en:'she',k:'she',g:'f'},{t:'noi',en:'we',k:'we',g:'pl'}], [{en:'I read a book.',t:['eu','citesc','o','carte']},{en:'He sees the house.',t:['el','vede','casa']},{en:'We live in the city.',t:['noi','locuim','în','oraș']},{en:'The old house is here.',t:['casa','veche','este','aici']}], ['este','aici'])
});
Object.assign(LANGS, {
hu:simpleLang('Hungarian','Magyar','hu-HU','Gy', [['ház','house','haaz'],['város','city','vaa-rosh'],['könyv','book','koenyv'],['iskola','school','eesh-ko-la'],['ablak','window','ob-lok'],['erdő','forest','er-doe'],['folyó','river','fo-yo'],['levél','letter','le-veel'],['híd','bridge','heed'],['piac','market','pee-ats']], [{t:'ház',en:'house',g:'n',forms:{nom:'ház',acc:'házat',gen:'háznak',prep:'házban'}},{t:'város',en:'city',g:'n',forms:{nom:'város',acc:'várost',gen:'városnak',prep:'városban'}},{t:'könyv',en:'book',g:'n',forms:{nom:'könyv',acc:'könyvet',gen:'könyvnek',prep:'könyvben'}},{t:'iskola',en:'school',g:'n',forms:{nom:'iskola',acc:'iskolát',gen:'iskolának',prep:'iskolában'}},{t:'erdő',en:'forest',g:'n',forms:{nom:'erdő',acc:'erdőt',gen:'erdőnek',prep:'erdőben'}}], [{base:'új',en:'new',forms:{m:'új',f:'új',n:'új'}},{base:'régi',en:'old',forms:{m:'régi',f:'régi',n:'régi'}},{base:'nagy',en:'big',forms:{m:'nagy',f:'nagy',n:'nagy'}},{base:'kicsi',en:'small',forms:{m:'kicsi',f:'kicsi',n:'kicsi'}}], [{inf:'olvasni',en:'read',present:{i:'olvasok',you:'olvasol',he:'olvas',she:'olvas',we:'olvasunk'},past:{m:'olvastam',f:'olvastam',pl:'olvastunk'},future:{i:'olvasni fogok',you:'olvasni fogsz',he:'olvasni fog',she:'olvasni fog',we:'olvasni fogunk'}},{inf:'látni',en:'see',present:{i:'látok',you:'látsz',he:'lát',she:'lát',we:'látunk'},past:{m:'láttam',f:'láttam',pl:'láttunk'},future:{i:'látni fogok',you:'látni fogsz',he:'látni fog',she:'látni fog',we:'látni fogunk'}},{inf:'lakni',en:'live',present:{i:'lakom',you:'laksz',he:'lakik',she:'lakik',we:'lakunk'},past:{m:'laktam',f:'laktam',pl:'laktunk'},future:{i:'lakni fogok',you:'lakni fogsz',he:'lakni fog',she:'lakni fog',we:'lakni fogunk'}}], [{t:'-ban/-ben',en:'in',case:'inessive suffix',key:'prep'},{t:'-ból/-ből',en:'from',case:'elative suffix',key:'gen'},{t:'-ba/-be',en:'into',case:'illative suffix',key:'acc'}], [{t:'én',en:'I',k:'i',g:'m'},{t:'te',en:'you',k:'you',g:'m'},{t:'ő',en:'he',k:'he',g:'m'},{t:'ő',en:'she',k:'she',g:'f'},{t:'mi',en:'we',k:'we',g:'pl'}], [{en:'I read a book.',t:['én','olvasok','egy','könyvet']},{en:'He sees the house.',t:['ő','látja','a','házat']},{en:'We live in the city.',t:['mi','a','városban','lakunk']},{en:'The old house is here.',t:['a','régi','ház','itt','van']}], ['van','itt']),
pl:simpleLang('Polish','Polski','pl-PL','Ł', [['dom','house','dom'],['miasto','city','myas-to'],['książka','book','kshonsh-ka'],['szkoła','school','shko-wa'],['okno','window','ok-no'],['las','forest','las'],['rzeka','river','zhe-ka'],['list','letter','leest'],['most','bridge','most'],['rynek','market','ry-nek']], [{t:'dom',en:'house',g:'m',forms:{nom:'dom',acc:'dom',gen:'domu',prep:'domu'}},{t:'miasto',en:'city',g:'n',forms:{nom:'miasto',acc:'miasto',gen:'miasta',prep:'mieście'}},{t:'książka',en:'book',g:'f',forms:{nom:'książka',acc:'książkę',gen:'książki',prep:'książce'}},{t:'szkoła',en:'school',g:'f',forms:{nom:'szkoła',acc:'szkołę',gen:'szkoły',prep:'szkole'}},{t:'rzeka',en:'river',g:'f',forms:{nom:'rzeka',acc:'rzekę',gen:'rzeki',prep:'rzece'}}], [{base:'nowy',en:'new',forms:{m:'nowy',f:'nowa',n:'nowe'}},{base:'stary',en:'old',forms:{m:'stary',f:'stara',n:'stare'}},{base:'duży',en:'big',forms:{m:'duży',f:'duża',n:'duże'}},{base:'mały',en:'small',forms:{m:'mały',f:'mała',n:'małe'}}], [{inf:'czytać',en:'read',present:{i:'czytam',you:'czytasz',he:'czyta',she:'czyta',we:'czytamy'},past:{m:'czytałem',f:'czytałam',pl:'czytaliśmy'},future:{i:'będę czytać',you:'będziesz czytać',he:'będzie czytać',she:'będzie czytać',we:'będziemy czytać'}},{inf:'widzieć',en:'see',present:{i:'widzę',you:'widzisz',he:'widzi',she:'widzi',we:'widzimy'},past:{m:'widziałem',f:'widziałam',pl:'widzieliśmy'},future:{i:'będę widzieć',you:'będziesz widzieć',he:'będzie widzieć',she:'będzie widzieć',we:'będziemy widzieć'}},{inf:'mieszkać',en:'live',present:{i:'mieszkam',you:'mieszkasz',he:'mieszka',she:'mieszka',we:'mieszkamy'},past:{m:'mieszkałem',f:'mieszkałam',pl:'mieszkaliśmy'},future:{i:'będę mieszkać',you:'będziesz mieszkać',he:'będzie mieszkać',she:'będzie mieszkać',we:'będziemy mieszkać'}}], [{t:'w',en:'in',case:'locative',key:'prep'},{t:'z',en:'from',case:'genitive',key:'gen'},{t:'do',en:'to',case:'genitive',key:'gen'}], [{t:'ja',en:'I',k:'i',g:'m'},{t:'ty',en:'you',k:'you',g:'m'},{t:'on',en:'he',k:'he',g:'m'},{t:'ona',en:'she',k:'she',g:'f'},{t:'my',en:'we',k:'we',g:'pl'}], [{en:'I read a book.',t:['ja','czytam','książkę']},{en:'He sees the house.',t:['on','widzi','dom']},{en:'We live in the city.',t:['my','mieszkamy','w','mieście']},{en:'The old house is here.',t:['stary','dom','jest','tutaj']}], ['jest','tutaj']),
cs:simpleLang('Czech','Čeština','cs-CZ','Č', [['dům','house','doom'],['město','city','myes-to'],['kniha','book','knee-ha'],['škola','school','shko-la'],['okno','window','ok-no'],['les','forest','les'],['řeka','river','rzhe-ka'],['dopis','letter','do-pis'],['most','bridge','most'],['trh','market','trh']], [{t:'dům',en:'house',g:'m',forms:{nom:'dům',acc:'dům',gen:'domu',prep:'domě'}},{t:'město',en:'city',g:'n',forms:{nom:'město',acc:'město',gen:'města',prep:'městě'}},{t:'kniha',en:'book',g:'f',forms:{nom:'kniha',acc:'knihu',gen:'knihy',prep:'knize'}},{t:'škola',en:'school',g:'f',forms:{nom:'škola',acc:'školu',gen:'školy',prep:'škole'}},{t:'řeka',en:'river',g:'f',forms:{nom:'řeka',acc:'řeku',gen:'řeky',prep:'řece'}}], [{base:'nový',en:'new',forms:{m:'nový',f:'nová',n:'nové'}},{base:'starý',en:'old',forms:{m:'starý',f:'stará',n:'staré'}},{base:'velký',en:'big',forms:{m:'velký',f:'velká',n:'velké'}},{base:'malý',en:'small',forms:{m:'malý',f:'malá',n:'malé'}}], [{inf:'číst',en:'read',present:{i:'čtu',you:'čteš',he:'čte',she:'čte',we:'čteme'},past:{m:'četl jsem',f:'četla jsem',pl:'četli jsme'},future:{i:'budu číst',you:'budeš číst',he:'bude číst',she:'bude číst',we:'budeme číst'}},{inf:'vidět',en:'see',present:{i:'vidím',you:'vidíš',he:'vidí',she:'vidí',we:'vidíme'},past:{m:'viděl jsem',f:'viděla jsem',pl:'viděli jsme'},future:{i:'budu vidět',you:'budeš vidět',he:'bude vidět',she:'bude vidět',we:'budeme vidět'}},{inf:'bydlet',en:'live',present:{i:'bydlím',you:'bydlíš',he:'bydlí',she:'bydlí',we:'bydlíme'},past:{m:'bydlel jsem',f:'bydlela jsem',pl:'bydleli jsme'},future:{i:'budu bydlet',you:'budeš bydlet',he:'bude bydlet',she:'bude bydlet',we:'budeme bydlet'}}], [{t:'v',en:'in',case:'locative',key:'prep'},{t:'z',en:'from',case:'genitive',key:'gen'},{t:'do',en:'to',case:'genitive',key:'gen'}], [{t:'já',en:'I',k:'i',g:'m'},{t:'ty',en:'you',k:'you',g:'m'},{t:'on',en:'he',k:'he',g:'m'},{t:'ona',en:'she',k:'she',g:'f'},{t:'my',en:'we',k:'we',g:'pl'}], [{en:'I read a book.',t:['já','čtu','knihu']},{en:'He sees the house.',t:['on','vidí','dům']},{en:'We live in the city.',t:['my','bydlíme','ve','městě']},{en:'The old house is here.',t:['starý','dům','je','tady']}], ['je','tady']),
no:simpleLang('Norwegian','Norsk','nb-NO','Å', [['hus','house','hoos'],['by','city','bee'],['bok','book','book'],['skole','school','sko-le'],['vindu','window','vin-doo'],['skog','forest','skoog'],['elv','river','elv'],['brev','letter','brev'],['bro','bridge','broo'],['marked','market','mar-ked']], [{t:'hus',en:'house',g:'n',forms:{nom:'huset',acc:'huset',gen:'husets',prep:'huset'}},{t:'by',en:'city',g:'m',forms:{nom:'byen',acc:'byen',gen:'byens',prep:'byen'}},{t:'bok',en:'book',g:'f',forms:{nom:'boka',acc:'boka',gen:'bokas',prep:'boka'}},{t:'skole',en:'school',g:'m',forms:{nom:'skolen',acc:'skolen',gen:'skolens',prep:'skolen'}},{t:'skog',en:'forest',g:'m',forms:{nom:'skogen',acc:'skogen',gen:'skogens',prep:'skogen'}}], [{base:'ny',en:'new',forms:{m:'ny',f:'ny',n:'nytt'}},{base:'gammel',en:'old',forms:{m:'gammel',f:'gammel',n:'gammelt'}},{base:'stor',en:'big',forms:{m:'stor',f:'stor',n:'stort'}},{base:'liten',en:'small',forms:{m:'liten',f:'liten',n:'lite'}}], [{inf:'lese',en:'read',present:{i:'leser',you:'leser',he:'leser',she:'leser',we:'leser'},past:{m:'leste',f:'leste',pl:'leste'},future:{i:'skal lese',you:'skal lese',he:'skal lese',she:'skal lese',we:'skal lese'}},{inf:'se',en:'see',present:{i:'ser',you:'ser',he:'ser',she:'ser',we:'ser'},past:{m:'så',f:'så',pl:'så'},future:{i:'skal se',you:'skal se',he:'skal se',she:'skal se',we:'skal se'}},{inf:'bo',en:'live',present:{i:'bor',you:'bor',he:'bor',she:'bor',we:'bor'},past:{m:'bodde',f:'bodde',pl:'bodde'},future:{i:'skal bo',you:'skal bo',he:'skal bo',she:'skal bo',we:'skal bo'}}], [{t:'i',en:'in',case:'preposition',key:'prep'},{t:'fra',en:'from',case:'preposition',key:'gen'},{t:'til',en:'to',case:'preposition',key:'acc'}], [{t:'jeg',en:'I',k:'i',g:'m'},{t:'du',en:'you',k:'you',g:'m'},{t:'han',en:'he',k:'he',g:'m'},{t:'hun',en:'she',k:'she',g:'f'},{t:'vi',en:'we',k:'we',g:'pl'}], [{en:'I read a book.',t:['jeg','leser','en','bok']},{en:'He sees the house.',t:['han','ser','huset']},{en:'We live in the city.',t:['vi','bor','i','byen']},{en:'The old house is here.',t:['det','gamle','huset','er','her']}], ['er','her']),
da:simpleLang('Danish','Dansk','da-DK','Ø', [['hus','house','hoos'],['by','city','bü'],['bog','book','boh'],['skole','school','sko-le'],['vindue','window','vin-doo-ə'],['skov','forest','skow'],['flod','river','floð'],['brev','letter','brew'],['bro','bridge','bro'],['marked','market','mar-ked']], [{t:'hus',en:'house',g:'n',forms:{nom:'huset',acc:'huset',gen:'husets',prep:'huset'}},{t:'by',en:'city',g:'m',forms:{nom:'byen',acc:'byen',gen:'byens',prep:'byen'}},{t:'bog',en:'book',g:'f',forms:{nom:'bogen',acc:'bogen',gen:'bogens',prep:'bogen'}},{t:'skole',en:'school',g:'m',forms:{nom:'skolen',acc:'skolen',gen:'skolens',prep:'skolen'}},{t:'skov',en:'forest',g:'m',forms:{nom:'skoven',acc:'skoven',gen:'skovens',prep:'skoven'}}], [{base:'ny',en:'new',forms:{m:'ny',f:'ny',n:'nyt'}},{base:'gammel',en:'old',forms:{m:'gammel',f:'gammel',n:'gammelt'}},{base:'stor',en:'big',forms:{m:'stor',f:'stor',n:'stort'}},{base:'lille',en:'small',forms:{m:'lille',f:'lille',n:'lille'}}], [{inf:'læse',en:'read',present:{i:'læser',you:'læser',he:'læser',she:'læser',we:'læser'},past:{m:'læste',f:'læste',pl:'læste'},future:{i:'vil læse',you:'vil læse',he:'vil læse',she:'vil læse',we:'vil læse'}},{inf:'se',en:'see',present:{i:'ser',you:'ser',he:'ser',she:'ser',we:'ser'},past:{m:'så',f:'så',pl:'så'},future:{i:'vil se',you:'vil se',he:'vil se',she:'vil se',we:'vil se'}},{inf:'bo',en:'live',present:{i:'bor',you:'bor',he:'bor',she:'bor',we:'bor'},past:{m:'boede',f:'boede',pl:'boede'},future:{i:'vil bo',you:'vil bo',he:'vil bo',she:'vil bo',we:'vil bo'}}], [{t:'i',en:'in',case:'preposition',key:'prep'},{t:'fra',en:'from',case:'preposition',key:'gen'},{t:'til',en:'to',case:'preposition',key:'acc'}], [{t:'jeg',en:'I',k:'i',g:'m'},{t:'du',en:'you',k:'you',g:'m'},{t:'han',en:'he',k:'he',g:'m'},{t:'hun',en:'she',k:'she',g:'f'},{t:'vi',en:'we',k:'we',g:'pl'}], [{en:'I read a book.',t:['jeg','læser','en','bog']},{en:'He sees the house.',t:['han','ser','huset']},{en:'We live in the city.',t:['vi','bor','i','byen']},{en:'The old house is here.',t:['det','gamle','hus','er','her']}], ['er','her'])
});



// Larger starter decks for the three developed languages. The early deck stays small,
// Core deck opens a broader everyday vocabulary pool, and Obscure deck exposes all entries.
function addDeckWords(code, entries){
  const seen = new Set(LANGS[code].words.map(w => w[0]));
  entries.forEach(w => { if(!seen.has(w[0])) { LANGS[code].words.push(w); seen.add(w[0]); } });
}
function addNouns(code, entries){
  const seen = new Set(LANGS[code].nouns.map(n => n.t));
  entries.forEach(n => { if(!seen.has(n.t)) { LANGS[code].nouns.push(n); seen.add(n.t); } });
}
function addAdjectives(code, entries){
  const seen = new Set(LANGS[code].adj.map(a => a.base));
  entries.forEach(a => { if(!seen.has(a.base)) { LANGS[code].adj.push(a); seen.add(a.base); } });
}
function addVerbs(code, entries){
  const seen = new Set(LANGS[code].verbs.map(v => v.inf));
  entries.forEach(v => { if(!seen.has(v.inf)) { LANGS[code].verbs.push(v); seen.add(v.inf); } });
}
addDeckWords('ru', [
 ['человек','person','chelovek'],['женщина','woman','zhenshchina'],['мужчина','man','muzhchina'],['ребёнок','child','rebyonok'],['друг','friend','drug'],['семья','family','semya'],['мать','mother','mat'],['отец','father','otets'],['брат','brother','brat'],['сестра','sister','sestra'],
 ['день','day','den'],['ночь','night','noch'],['утро','morning','utro'],['вечер','evening','vecher'],['год','year','god'],['время','time','vremya'],['сегодня','today','segodnya'],['завтра','tomorrow','zavtra'],['вчера','yesterday','vchera'],
 ['еда','food','yeda'],['вода','water','voda'],['чай','tea','chay'],['хлеб','bread','khleb'],['молоко','milk','moloko'],['яблоко','apple','yabloko'],['суп','soup','sup'],['рыба','fish','ryba'],['мясо','meat','myaso'],
 ['стол','table','stol'],['стул','chair','stul'],['дверь','door','dver'],['комната','room','komnata'],['кровать','bed','krovat'],['улица','street','ulitsa'],['сад','garden','sad'],['парк','park','park'],['машина','car','mashina'],['поезд','train','poezd'],
 ['работа','work','rabota'],['деньги','money','dengi'],['магазин','shop','magazin'],['университет','university','universitet'],['урок','lesson','urok'],['слово','word','slovo'],['язык','language','yazyk'],['вопрос','question','vopros'],['ответ','answer','otvet'],
 ['красный','red','krasnyy'],['синий','blue','siniy'],['белый','white','belyy'],['чёрный','black','chyornyy'],['зелёный','green','zelyonyy'],['хороший','good','khoroshiy'],['плохой','bad','plokhoy'],['важный','important','vazhnyy'],['интересный','interesting','interesnyy'],
 ['один','one','odin'],['два','two','dva'],['три','three','tri'],['четыре','four','chetyre'],['пять','five','pyat'],['шесть','six','shest'],['семь','seven','sem'],['восемь','eight','vosem'],['девять','nine','devyat'],['десять','ten','desyat'],
 ['говорить','to speak','govorit'],['делать','to do','delat'],['идти','to go','idti'],['знать','to know','znat'],['понимать','to understand','ponimat'],['хотеть','to want','khotet'],['любить','to like/love','lyubit'],['писать','to write','pisat'],['слушать','to listen','slushat'],['спать','to sleep','spat']
]);
addNouns('ru', [
 {t:'человек',en:'person',g:'m',forms:{nom:'человек',acc:'человека',gen:'человека',prep:'человеке'}},{t:'женщина',en:'woman',g:'f',forms:{nom:'женщина',acc:'женщину',gen:'женщины',prep:'женщине'}},{t:'мужчина',en:'man',g:'m',forms:{nom:'мужчина',acc:'мужчину',gen:'мужчины',prep:'мужчине'}},{t:'друг',en:'friend',g:'m',forms:{nom:'друг',acc:'друга',gen:'друга',prep:'друге'}},{t:'семья',en:'family',g:'f',forms:{nom:'семья',acc:'семью',gen:'семьи',prep:'семье'}},
 {t:'день',en:'day',g:'m',forms:{nom:'день',acc:'день',gen:'дня',prep:'дне'}},{t:'ночь',en:'night',g:'f',forms:{nom:'ночь',acc:'ночь',gen:'ночи',prep:'ночи'}},{t:'вода',en:'water',g:'f',forms:{nom:'вода',acc:'воду',gen:'воды',prep:'воде'}},{t:'хлеб',en:'bread',g:'m',forms:{nom:'хлеб',acc:'хлеб',gen:'хлеба',prep:'хлебе'}},{t:'чай',en:'tea',g:'m',forms:{nom:'чай',acc:'чай',gen:'чая',prep:'чае'}},
 {t:'стол',en:'table',g:'m',forms:{nom:'стол',acc:'стол',gen:'стола',prep:'столе'}},{t:'дверь',en:'door',g:'f',forms:{nom:'дверь',acc:'дверь',gen:'двери',prep:'двери'}},{t:'комната',en:'room',g:'f',forms:{nom:'комната',acc:'комнату',gen:'комнаты',prep:'комнате'}},{t:'улица',en:'street',g:'f',forms:{nom:'улица',acc:'улицу',gen:'улицы',prep:'улице'}},{t:'магазин',en:'shop',g:'m',forms:{nom:'магазин',acc:'магазин',gen:'магазина',prep:'магазине'}},
 {t:'работа',en:'work',g:'f',forms:{nom:'работа',acc:'работу',gen:'работы',prep:'работе'}},{t:'урок',en:'lesson',g:'m',forms:{nom:'урок',acc:'урок',gen:'урока',prep:'уроке'}},{t:'слово',en:'word',g:'n',forms:{nom:'слово',acc:'слово',gen:'слова',prep:'слове'}},{t:'язык',en:'language',g:'m',forms:{nom:'язык',acc:'язык',gen:'языка',prep:'языке'}},{t:'вопрос',en:'question',g:'m',forms:{nom:'вопрос',acc:'вопрос',gen:'вопроса',prep:'вопросе'}}
]);
addAdjectives('ru', [
 {base:'хороший',en:'good',forms:{m:'хороший',f:'хорошая',n:'хорошее'}},{base:'плохой',en:'bad',forms:{m:'плохой',f:'плохая',n:'плохое'}},{base:'красный',en:'red',forms:{m:'красный',f:'красная',n:'красное'}},{base:'синий',en:'blue',forms:{m:'синий',f:'синяя',n:'синее'}},{base:'белый',en:'white',forms:{m:'белый',f:'белая',n:'белое'}},{base:'чёрный',en:'black',forms:{m:'чёрный',f:'чёрная',n:'чёрное'}},{base:'важный',en:'important',forms:{m:'важный',f:'важная',n:'важное'}},{base:'интересный',en:'interesting',forms:{m:'интересный',f:'интересная',n:'интересное'}}
]);
addVerbs('ru', [
 {inf:'говорить',en:'speak',present:{i:'говорю',you:'говоришь',he:'говорит',she:'говорит',we:'говорим'},past:{m:'говорил',f:'говорила',pl:'говорили'},future:{i:'буду говорить',you:'будешь говорить',he:'будет говорить',she:'будет говорить',we:'будем говорить'}},
 {inf:'делать',en:'do',present:{i:'делаю',you:'делаешь',he:'делает',she:'делает',we:'делаем'},past:{m:'делал',f:'делала',pl:'делали'},future:{i:'буду делать',you:'будешь делать',he:'будет делать',she:'будет делать',we:'будем делать'}},
 {inf:'знать',en:'know',present:{i:'знаю',you:'знаешь',he:'знает',she:'знает',we:'знаем'},past:{m:'знал',f:'знала',pl:'знали'},future:{i:'буду знать',you:'будешь знать',he:'будет знать',she:'будет знать',we:'будем знать'}},
 {inf:'понимать',en:'understand',present:{i:'понимаю',you:'понимаешь',he:'понимает',she:'понимает',we:'понимаем'},past:{m:'понимал',f:'понимала',pl:'понимали'},future:{i:'буду понимать',you:'будешь понимать',he:'будет понимать',she:'будет понимать',we:'будем понимать'}},
 {inf:'писать',en:'write',present:{i:'пишу',you:'пишешь',he:'пишет',she:'пишет',we:'пишем'},past:{m:'писал',f:'писала',pl:'писали'},future:{i:'буду писать',you:'будешь писать',he:'будет писать',she:'будет писать',we:'будем писать'}}
]);
addDeckWords('fr', [
 ['personne','person','pair-son'],['femme','woman','fam'],['homme','man','om'],['enfant','child','on-fon'],['ami','friend','ah-mee'],['famille','family','fah-mee-yuh'],['mère','mother','mehr'],['père','father','pehr'],['frère','brother','frehr'],['sœur','sister','suhr'],['jour','day','zhoor'],['nuit','night','nwee'],['matin','morning','mah-tan'],['soir','evening','swar'],['année','year','ah-nay'],['temps','time','ton'],['aujourd\'hui','today','oh-zhoor-dwee'],['demain','tomorrow','duh-man'],['hier','yesterday','yair'],['eau','water','oh'],['pain','bread','pan'],['lait','milk','leh'],['pomme','apple','pom'],['table','table','tahbl'],['chaise','chair','shez'],['porte','door','port'],['chambre','room','shombr'],['rue','street','roo'],['travail','work','trah-vai'],['argent','money','ar-zhon'],['magasin','shop','mah-gah-zan'],['mot','word','mo'],['langue','language','long'],['question','question','kes-tyon'],['réponse','answer','ray-pons'],['bon','good','bon'],['mauvais','bad','mo-veh'],['rouge','red','roozh'],['bleu','blue','bluh'],['blanc','white','blon'],['noir','black','nwar'],['parler','to speak','par-lay'],['faire','to do','fair'],['savoir','to know','sah-vwar'],['comprendre','to understand','kom-prondr'],['écrire','to write','ay-kreer']
]);
addDeckWords('de', [
 ['Mensch','person','mensh'],['Frau','woman','frow'],['Mann','man','mahn'],['Kind','child','kint'],['Freund','friend','froynt'],['Familie','family','fah-mee-lee-uh'],['Mutter','mother','moo-ter'],['Vater','father','fah-ter'],['Bruder','brother','broo-der'],['Schwester','sister','shves-ter'],['Tag','day','tahk'],['Nacht','night','nakht'],['Morgen','morning','mor-gen'],['Abend','evening','ah-bent'],['Jahr','year','yahr'],['Zeit','time','tsite'],['heute','today','hoy-tuh'],['morgen','tomorrow','mor-gen'],['gestern','yesterday','ges-tern'],['Wasser','water','vah-ser'],['Brot','bread','broht'],['Milch','milk','milkh'],['Apfel','apple','ap-fel'],['Tisch','table','tish'],['Stuhl','chair','shtool'],['Tür','door','tür'],['Zimmer','room','tsim-mer'],['Straße','street','shtrah-suh'],['Arbeit','work','ar-bite'],['Geld','money','gelt'],['Laden','shop','lah-den'],['Wort','word','vort'],['Sprache','language','shprah-khuh'],['Frage','question','frah-guh'],['Antwort','answer','ant-vort'],['gut','good','goot'],['schlecht','bad','shlekht'],['rot','red','roht'],['blau','blue','blow'],['weiß','white','vice'],['schwarz','black','shvarts'],['sprechen','to speak','shprekh-en'],['machen','to do','makh-en'],['wissen','to know','vis-sen'],['verstehen','to understand','fer-shtay-en'],['schreiben','to write','shry-ben']
]);

const SKILL_TREES={
ru:{label:'Russian case-and-aspect tree',skills:[
{id:'alphabet',name:'Cyrillic sounds',icon:'Я',cost:1,x:483,y:20,desc:'Letters, stress, and basic pronunciation.'},
{id:'core_words',name:'Core Russian deck',icon:'📚',cost:1,req:['alphabet'],x:483,y:180,desc:'Everyday Russian nouns and basics.'},
{id:'listening',name:'Listening habit',icon:'🔊',cost:1,req:['alphabet'],x:250,y:180,desc:'More pronounce-first prompts.'},
{id:'recall',name:'Active recall',icon:'✍',cost:1,req:['core_words'],x:716,y:180,desc:'More typed answer prompts.'},
{id:'sentence_order',name:'Free word order',icon:'⇄',cost:1,req:['core_words'],x:483,y:340,desc:'Sentence building and reordering.'},
{id:'prepositions',name:'Prepositions',icon:'↦',cost:1,req:['sentence_order'],x:110,y:500,desc:'в, из, про and short phrases.'},
{id:'case_prep',name:'Prepositional case',icon:'П',cost:2,req:['prepositions'],x:110,y:660,desc:'Location with в and -е forms.'},
{id:'case_gen',name:'Genitive case',icon:'Р',cost:2,req:['case_prep'],x:110,y:820,desc:'From/of phrases and genitive forms.'},
{id:'case_acc',name:'Accusative case',icon:'В',cost:2,req:['case_gen'],x:110,y:980,desc:'Direct objects and motion targets.'},
{id:'adjectives',name:'Adjectives',icon:'◈',cost:1,req:['sentence_order'],x:483,y:500,desc:'Adjective + noun forms.'},
{id:'agreement',name:'Gender agreement',icon:'≋',cost:2,req:['adjectives'],x:483,y:660,desc:'Masculine, feminine, and neuter patterns.'},
{id:'description_chain',name:'Description chains',icon:'▣',cost:2,req:['agreement'],x:483,y:820,desc:'Longer noun phrases.'},
{id:'verbs',name:'Russian verbs',icon:'▶',cost:1,req:['sentence_order'],x:856,y:500,desc:'Present, past, and future forms.'},
{id:'tense_path',name:'Past tense gender',icon:'⏱',cost:2,req:['verbs'],x:856,y:660,desc:'Past tense changes by gender/number.'},
{id:'subject_control',name:'Person forms',icon:'☉',cost:2,req:['verbs'],x:856,y:820,desc:'Subject and verb agreement drills.'},
{id:'aspect_intro',name:'Aspect preview',icon:'∞',cost:3,req:['tense_path','subject_control'],x:856,y:980,desc:'Prototype hook for imperfective/perfective later.'},
{id:'negation_ru',name:'Negation',icon:'¬',cost:2,req:['sentence_order'],x:300,y:660,desc:'Basic не placement and negative statements.'},
{id:'questions_ru',name:'Question forms',icon:'?',cost:2,req:['sentence_order'],x:666,y:660,desc:'Intonation and simple кто/что/где questions.'},
{id:'motion_intro',name:'Motion preview',icon:'↗',cost:3,req:['case_acc','aspect_intro'],x:1035,y:1140,desc:'Prototype hook for идти/ехать patterns later.'},
{id:'numbers_ru',name:'Numbers',icon:'#',cost:2,req:['core_words'],x:110,y:340,desc:'Basic counting and quantity prompts.'},
{id:'long_sentences',name:'Long sentences',icon:'▦',cost:2,req:['case_acc','description_chain','aspect_intro','questions_ru'],x:483,y:1160,desc:'Combines cases, adjectives, and verbs.'},
{id:'mixed_review',name:'Mixed review',icon:'✺',cost:2,req:['long_sentences'],x:300,y:1320,desc:'Mixed multi-skill question pool.'},
{id:'obscure_words',name:'Obscure deck',icon:'✦',cost:3,req:['long_sentences'],x:666,y:1320,desc:'Adds less common Russian words.'},
{id:'instrumental_ru',name:'Instrumental case',icon:'Т',cost:3,req:['case_acc'],x:110,y:1140,desc:'With/by means of and с phrases.'},
{id:'dative_ru',name:'Dative case',icon:'Д',cost:3,req:['case_acc'],x:110,y:1300,desc:'To/for someone and experience patterns.'},
{id:'aspect_pairs_ru',name:'Aspect pairs',icon:'∞+',cost:3,req:['aspect_intro'],x:856,y:1140,desc:'Common imperfective/perfective pair drills.'},
{id:'motion_verbs_ru',name:'Motion verbs I',icon:'↝',cost:3,req:['motion_intro'],x:1035,y:1300,desc:'идти/ходить and ехать/ездить basics.'},
{id:'clauses_ru',name:'Simple clauses',icon:'§',cost:3,req:['questions_ru','long_sentences'],x:483,y:1480,desc:'Because/that/when style connectors.'},
{id:'advanced_review_ru',name:'Advanced review',icon:'★',cost:4,req:['mixed_review','obscure_words','clauses_ru'],x:483,y:1640,desc:'Longer mixed Russian review pool.'}],links:[['alphabet','core_words'],['alphabet','listening'],['core_words','recall'],['core_words','sentence_order'],['sentence_order','prepositions'],['prepositions','case_prep'],['case_prep','case_gen'],['case_gen','case_acc'],['sentence_order','adjectives'],['adjectives','agreement'],['agreement','description_chain'],['sentence_order','verbs'],['verbs','tense_path'],['verbs','subject_control'],['tense_path','aspect_intro'],['subject_control','aspect_intro'],['sentence_order','negation_ru'],['sentence_order','questions_ru'],['core_words','numbers_ru'],['case_acc','motion_intro'],['aspect_intro','motion_intro'],['case_acc','long_sentences'],['description_chain','long_sentences'],['aspect_intro','long_sentences'],['long_sentences','mixed_review'],['long_sentences','obscure_words'],['case_acc','instrumental_ru'],['instrumental_ru','dative_ru'],['aspect_intro','aspect_pairs_ru'],['motion_intro','motion_verbs_ru'],['questions_ru','clauses_ru'],['long_sentences','clauses_ru'],['mixed_review','advanced_review_ru'],['obscure_words','advanced_review_ru'],['clauses_ru','advanced_review_ru']]},
fr:{label:'French gender-and-tense tree',skills:[
{id:'alphabet',name:'French sounds',icon:'Ç',cost:1,x:483,y:20,desc:'Nasal vowels, liaison, and accent marks.'},
{id:'core_words',name:'Core French deck',icon:'📚',cost:1,req:['alphabet'],x:483,y:180,desc:'Everyday French nouns and basics.'},
{id:'listening',name:'Listening habit',icon:'🔊',cost:1,req:['alphabet'],x:250,y:180,desc:'More pronounce-first prompts.'},
{id:'recall',name:'Active recall',icon:'✍',cost:1,req:['core_words'],x:716,y:180,desc:'More typed answer prompts.'},
{id:'sentence_order',name:'SVO order',icon:'⇄',cost:1,req:['core_words'],x:483,y:340,desc:'Basic French sentence building.'},
{id:'prepositions',name:'Prepositions',icon:'↦',cost:1,req:['sentence_order'],x:110,y:500,desc:'dans, de, sur phrases.'},
{id:'articles',name:'Articles',icon:'le',cost:2,req:['prepositions'],x:110,y:660,desc:'le, la, l\', un, une.'},
{id:'de_phrases',name:'de phrases',icon:'de',cost:2,req:['articles'],x:110,y:820,desc:'of/from contractions and possession.'},
{id:'adjectives',name:'Adjectives',icon:'◈',cost:1,req:['sentence_order'],x:483,y:500,desc:'Adjective + noun patterns.'},
{id:'agreement',name:'Gender agreement',icon:'≋',cost:2,req:['adjectives'],x:483,y:660,desc:'Masculine and feminine adjective forms.'},
{id:'description_chain',name:'Noun phrases',icon:'▣',cost:2,req:['agreement'],x:483,y:820,desc:'Longer article + adjective + noun phrases.'},
{id:'verbs',name:'French verbs',icon:'▶',cost:1,req:['sentence_order'],x:856,y:500,desc:'Present and near-future forms.'},
{id:'tense_path',name:'Near future',icon:'⏱',cost:2,req:['verbs'],x:856,y:660,desc:'aller + infinitive patterns.'},
{id:'subject_control',name:'Subject forms',icon:'☉',cost:2,req:['verbs'],x:856,y:820,desc:'je, tu, il/elle, nous forms.'},
{id:'negation_fr',name:'Negation',icon:'ne',cost:2,req:['sentence_order'],x:300,y:660,desc:'ne ... pas and negative placement.'},
{id:'questions_fr',name:'Questions',icon:'?',cost:2,req:['sentence_order'],x:666,y:660,desc:'Est-ce que and intonation questions.'},
{id:'numbers_fr',name:'Numbers',icon:'#',cost:2,req:['core_words'],x:110,y:340,desc:'Basic counting and quantities.'},
{id:'pronouns_fr',name:'Pronouns',icon:'il',cost:2,req:['subject_control'],x:1035,y:980,desc:'Subject and object pronoun preview.'},
{id:'past_fr',name:'Passé composé',icon:'pc',cost:3,req:['tense_path'],x:856,y:980,desc:'avoir/être plus past participle basics.'},
{id:'partitives_fr',name:'Partitives',icon:'du',cost:3,req:['articles'],x:110,y:980,desc:'du, de la, de l\' for food and amounts.'},
{id:'long_sentences',name:'Long sentences',icon:'▦',cost:2,req:['de_phrases','description_chain','subject_control'],x:483,y:1080,desc:'Combines prepositions, agreement, and verbs.'},
{id:'mixed_review',name:'Mixed review',icon:'✺',cost:2,req:['long_sentences'],x:300,y:1240,desc:'Mixed multi-skill question pool.'},
{id:'obscure_words',name:'Obscure deck',icon:'✦',cost:3,req:['long_sentences'],x:666,y:1240,desc:'Adds less common French words.'},
{id:'relative_fr',name:'Relative phrases',icon:'qui',cost:3,req:['long_sentences','pronouns_fr'],x:483,y:1400,desc:'qui/que style description clauses.'},
{id:'advanced_review_fr',name:'Advanced review',icon:'★',cost:4,req:['mixed_review','obscure_words','relative_fr'],x:483,y:1560,desc:'Longer mixed French review pool.'}],links:[['alphabet','core_words'],['alphabet','listening'],['core_words','recall'],['core_words','sentence_order'],['sentence_order','prepositions'],['prepositions','articles'],['articles','de_phrases'],['sentence_order','adjectives'],['adjectives','agreement'],['agreement','description_chain'],['sentence_order','verbs'],['verbs','tense_path'],['verbs','subject_control'],['sentence_order','negation_fr'],['sentence_order','questions_fr'],['core_words','numbers_fr'],['subject_control','pronouns_fr'],['de_phrases','long_sentences'],['description_chain','long_sentences'],['subject_control','long_sentences'],['long_sentences','mixed_review'],['long_sentences','obscure_words'],['tense_path','past_fr'],['articles','partitives_fr'],['long_sentences','relative_fr'],['pronouns_fr','relative_fr'],['mixed_review','advanced_review_fr'],['obscure_words','advanced_review_fr'],['relative_fr','advanced_review_fr']]},
de:{label:'German case-and-word-order tree',skills:[
{id:'alphabet',name:'German sounds',icon:'ß',cost:1,x:483,y:20,desc:'Umlauts, ch sounds, and stress.'},
{id:'core_words',name:'Core German deck',icon:'📚',cost:1,req:['alphabet'],x:483,y:180,desc:'Everyday German nouns and basics.'},
{id:'listening',name:'Listening habit',icon:'🔊',cost:1,req:['alphabet'],x:250,y:180,desc:'More pronounce-first prompts.'},
{id:'recall',name:'Active recall',icon:'✍',cost:1,req:['core_words'],x:716,y:180,desc:'More typed answer prompts.'},
{id:'sentence_order',name:'Verb-second order',icon:'⇄',cost:1,req:['core_words'],x:483,y:340,desc:'Sentence building with German order.'},
{id:'prepositions',name:'Prepositions',icon:'↦',cost:1,req:['sentence_order'],x:110,y:500,desc:'in, aus, über phrases.'},
{id:'case_dat',name:'Dative case',icon:'Dat',cost:2,req:['prepositions'],x:110,y:660,desc:'dem/der after location prepositions.'},
{id:'case_acc',name:'Accusative case',icon:'Acc',cost:2,req:['case_dat'],x:110,y:820,desc:'Direct objects and accusative phrases.'},
{id:'case_gen',name:'Genitive preview',icon:'Gen',cost:3,req:['case_acc'],x:110,y:980,desc:'des/der ownership-style forms.'},
{id:'adjectives',name:'Adjectives',icon:'◈',cost:1,req:['sentence_order'],x:483,y:500,desc:'Adjective + noun patterns.'},
{id:'agreement',name:'Article agreement',icon:'≋',cost:2,req:['adjectives'],x:483,y:660,desc:'Gender/case article patterns.'},
{id:'description_chain',name:'Noun phrases',icon:'▣',cost:2,req:['agreement'],x:483,y:820,desc:'Longer article + adjective + noun phrases.'},
{id:'verbs',name:'German verbs',icon:'▶',cost:1,req:['sentence_order'],x:856,y:500,desc:'Present, past, and werden future.'},
{id:'tense_path',name:'Future with werden',icon:'⏱',cost:2,req:['verbs'],x:856,y:660,desc:'werden + infinitive patterns.'},
{id:'subject_control',name:'Person forms',icon:'☉',cost:2,req:['verbs'],x:856,y:820,desc:'ich, du, er/sie, wir forms.'},
{id:'negation_de',name:'Negation',icon:'nicht',cost:2,req:['sentence_order'],x:300,y:660,desc:'nicht/kein placement basics.'},
{id:'questions_de',name:'Questions',icon:'?',cost:2,req:['sentence_order'],x:666,y:660,desc:'Verb-first yes/no questions and W-questions.'},
{id:'numbers_de',name:'Numbers',icon:'#',cost:2,req:['core_words'],x:110,y:340,desc:'Basic counting and quantity prompts.'},
{id:'separable_de',name:'Separable verbs',icon:'ab',cost:3,req:['subject_control'],x:1035,y:980,desc:'Prefix movement in simple clauses.'},
{id:'modal_de',name:'Modal verbs',icon:'mö',cost:3,req:['verbs'],x:856,y:980,desc:'können, müssen, wollen with infinitives.'},
{id:'subordinate_de',name:'Subordinate order',icon:'weil',cost:3,req:['questions_de','modal_de'],x:666,y:980,desc:'Verb-final order after basic connectors.'},
{id:'long_sentences',name:'Long sentences',icon:'▦',cost:2,req:['case_gen','description_chain','subject_control'],x:483,y:1160,desc:'Combines cases, adjectives, and verbs.'},
{id:'mixed_review',name:'Mixed review',icon:'✺',cost:2,req:['long_sentences'],x:300,y:1320,desc:'Mixed multi-skill question pool.'},
{id:'obscure_words',name:'Obscure deck',icon:'✦',cost:3,req:['long_sentences'],x:666,y:1320,desc:'Adds less common German words.'},
{id:'advanced_review_de',name:'Advanced review',icon:'★',cost:4,req:['mixed_review','obscure_words','subordinate_de'],x:483,y:1480,desc:'Longer mixed German review pool.'}],links:[['alphabet','core_words'],['alphabet','listening'],['core_words','recall'],['core_words','sentence_order'],['sentence_order','prepositions'],['prepositions','case_dat'],['case_dat','case_acc'],['case_acc','case_gen'],['sentence_order','adjectives'],['adjectives','agreement'],['agreement','description_chain'],['sentence_order','verbs'],['verbs','tense_path'],['verbs','subject_control'],['sentence_order','negation_de'],['sentence_order','questions_de'],['core_words','numbers_de'],['subject_control','separable_de'],['case_gen','long_sentences'],['description_chain','long_sentences'],['subject_control','long_sentences'],['long_sentences','mixed_review'],['long_sentences','obscure_words'],['verbs','modal_de'],['questions_de','subordinate_de'],['modal_de','subordinate_de'],['mixed_review','advanced_review_de'],['obscure_words','advanced_review_de'],['subordinate_de','advanced_review_de']]}
};

// Starter skill trees for added languages. They preserve the same trunk so the app feels consistent,
// then branch toward expected early pain points for each language.
function treeFromTemplate(label, rootIcon, branch){
  const base=[
    {id:'alphabet',name:branch.sound||'Sound system',icon:rootIcon,cost:1,x:483,y:20,desc:branch.soundDesc||'Pronunciation, spelling, and reading basics.'},
    {id:'core_words',name:'Core deck',icon:'📚',cost:1,req:['alphabet'],x:483,y:180,desc:'Everyday nouns and essential words.'},
    {id:'listening',name:'Listening habit',icon:'🔊',cost:1,req:['alphabet'],x:250,y:180,desc:'More pronounce-first prompts.'},
    {id:'recall',name:'Active recall',icon:'✍',cost:1,req:['core_words'],x:716,y:180,desc:'More typed answer prompts.'},
    {id:'sentence_order',name:branch.order||'Basic word order',icon:'⇄',cost:1,req:['core_words'],x:483,y:340,desc:branch.orderDesc||'Sentence building and reordering.'},
    {id:'numbers',name:'Numbers',icon:'#',cost:2,req:['core_words'],x:110,y:340,desc:'Counting and quantity prompts.'},
    {id:'prepositions',name:branch.prep||'Prepositions',icon:'↦',cost:1,req:['sentence_order'],x:110,y:500,desc:branch.prepDesc||'Short location and direction phrases.'},
    {id:branch.case1||'case_prep',name:branch.case1Name||'Preposition patterns',icon:branch.case1Icon||'P',cost:2,req:['prepositions'],x:110,y:660,desc:branch.case1Desc||'Forms governed by common prepositions.'},
    {id:branch.case2||'case_gen',name:branch.case2Name||'Possession/from forms',icon:branch.case2Icon||'G',cost:2,req:[branch.case1||'case_prep'],x:110,y:820,desc:branch.case2Desc||'Of/from and possession patterns.'},
    {id:'adjectives',name:'Adjectives',icon:'◈',cost:1,req:['sentence_order'],x:483,y:500,desc:'Adjective + noun forms.'},
    {id:'agreement',name:branch.agree||'Agreement',icon:'≋',cost:2,req:['adjectives'],x:483,y:660,desc:branch.agreeDesc||'Basic adjective/article agreement.'},
    {id:'description_chain',name:'Description chains',icon:'▣',cost:2,req:['agreement'],x:483,y:820,desc:'Longer noun phrases.'},
    {id:'verbs',name:branch.verbs||'Verb forms',icon:'▶',cost:1,req:['sentence_order'],x:856,y:500,desc:'Present, past, and future forms.'},
    {id:'tense_path',name:branch.tense||'Tense path',icon:'⏱',cost:2,req:['verbs'],x:856,y:660,desc:branch.tenseDesc||'Common tense contrasts.'},
    {id:'subject_control',name:'Person forms',icon:'☉',cost:2,req:['verbs'],x:856,y:820,desc:'Subject and verb agreement drills.'},
    {id:'negation',name:'Negation',icon:'¬',cost:2,req:['sentence_order'],x:300,y:660,desc:'Basic negative statements.'},
    {id:'questions',name:'Questions',icon:'?',cost:2,req:['sentence_order'],x:666,y:660,desc:'Basic question patterns.'},
    {id:'long_sentences',name:'Long sentences',icon:'▦',cost:2,req:[branch.case2||'case_gen','description_chain','subject_control'],x:483,y:1000,desc:'Combines forms, adjectives, and verbs.'},
    {id:'mixed_review',name:'Mixed review',icon:'✺',cost:2,req:['long_sentences'],x:300,y:1160,desc:'Mixed multi-skill question pool.'},
    {id:'obscure_words',name:'Obscure deck',icon:'✦',cost:3,req:['long_sentences'],x:666,y:1160,desc:'Adds less common words.'}
  ];
  (branch.extra||[]).forEach(n=>base.push(n));
  const links=[['alphabet','core_words'],['alphabet','listening'],['core_words','recall'],['core_words','sentence_order'],['core_words','numbers'],['sentence_order','prepositions'],['prepositions',branch.case1||'case_prep'],[branch.case1||'case_prep',branch.case2||'case_gen'],['sentence_order','adjectives'],['adjectives','agreement'],['agreement','description_chain'],['sentence_order','verbs'],['verbs','tense_path'],['verbs','subject_control'],['sentence_order','negation'],['sentence_order','questions'],[branch.case2||'case_gen','long_sentences'],['description_chain','long_sentences'],['subject_control','long_sentences'],['long_sentences','mixed_review'],['long_sentences','obscure_words']];
  (branch.links||[]).forEach(l=>links.push(l));
  return {label,skills:base,links};
}
Object.assign(SKILL_TREES, {
  la:treeFromTemplate('Latin case-and-conjugation tree','L',{sound:'Classical sounds',soundDesc:'Vowel length, stress, and classical pronunciation.',order:'Flexible Latin order',prep:'Prepositions + cases',case1:'case_abl',case1Name:'Ablative case',case1Icon:'Abl',case2:'case_acc',case2Name:'Accusative case',case2Icon:'Acc',agree:'Gender/case agreement',verbs:'Latin verbs',tense:'Perfect vs imperfect preview',extra:[{id:'declensions_la',name:'Declension preview',icon:'I',cost:3,req:['case_acc'],x:110,y:980,desc:'First/second/third declension map.'}],links:[['case_acc','declensions_la']]}),
  el:treeFromTemplate('Attic Greek case-and-verb tree','Ω',{sound:'Greek alphabet',soundDesc:'Breathings, accents, and Greek script.',order:'Greek clause order',prep:'Prepositions + cases',case1:'case_dat',case1Name:'Dative case',case1Icon:'Dat',case2:'case_gen',case2Name:'Genitive case',case2Icon:'Gen',agree:'Article agreement',verbs:'Greek verbs',tense:'Aorist preview',extra:[{id:'articles_el',name:'Greek articles',icon:'ὁ',cost:2,req:['agreement'],x:483,y:980,desc:'ὁ, ἡ, τό and early article patterns.'}],links:[['agreement','articles_el']]}),
  es:treeFromTemplate('Spanish article-and-verb tree','Ñ',{sound:'Spanish sounds',order:'SVO order',prep:'a/de/en phrases',case1:'articles',case1Name:'Articles',case1Icon:'el',case2:'de_phrases',case2Name:'de phrases',case2Icon:'de',agree:'Gender/number agreement',verbs:'Spanish verbs',tense:'Preterite preview'}),
  it:treeFromTemplate('Italian article-and-verb tree','I',{sound:'Italian sounds',order:'SVO order',prep:'a/di/in phrases',case1:'articles',case1Name:'Articles',case1Icon:'il',case2:'de_phrases',case2Name:'di phrases',case2Icon:'di',agree:'Gender/number agreement',verbs:'Italian verbs',tense:'Past participle preview'}),
  ro:treeFromTemplate('Romanian article-and-case tree','Ă',{sound:'Romanian sounds',order:'SVO order',prep:'în/din/la phrases',case1:'articles',case1Name:'Definite forms',case1Icon:'-ul',case2:'case_gen',case2Name:'Genitive/dative preview',case2Icon:'GD',agree:'Gender agreement',verbs:'Romanian verbs',tense:'Future with voi'}),
  hu:treeFromTemplate('Hungarian suffix-and-vowel-harmony tree','Gy',{sound:'Hungarian sounds',soundDesc:'Long vowels, digraphs, and stress.',order:'Topic-focus order',prep:'Case suffixes',case1:'case_inessive',case1Name:'Inessive -ban/-ben',case1Icon:'-ban',case2:'case_acc',case2Name:'Accusative -t',case2Icon:'-t',agree:'No gender agreement',agreeDesc:'Adjectives stay mostly stable before nouns.',verbs:'Hungarian verbs',tense:'Definite-object preview',extra:[{id:'vowel_harmony_hu',name:'Vowel harmony',icon:'VH',cost:3,req:['case_inessive'],x:110,y:980,desc:'Back/front suffix choice preview.'}],links:[['case_inessive','vowel_harmony_hu']]}),
  pl:treeFromTemplate('Polish case-and-aspect tree','Ł',{sound:'Polish sounds',soundDesc:'Consonant clusters, ł, ś/ź, and stress.',order:'Flexible Polish order',prep:'Prepositions + cases',case1:'case_loc',case1Name:'Locative case',case1Icon:'Loc',case2:'case_gen',case2Name:'Genitive case',case2Icon:'Gen',agree:'Gender/case agreement',verbs:'Polish verbs',tense:'Aspect preview',extra:[{id:'case_acc',name:'Accusative case',icon:'Acc',cost:2,req:['case_gen'],x:110,y:980,desc:'Direct object forms.'}],links:[['case_gen','case_acc']]}),
  cs:treeFromTemplate('Czech case-and-aspect tree','Č',{sound:'Czech sounds',soundDesc:'Ř, vowel length, and stress.',order:'Flexible Czech order',prep:'Prepositions + cases',case1:'case_loc',case1Name:'Locative case',case1Icon:'Loc',case2:'case_gen',case2Name:'Genitive case',case2Icon:'Gen',agree:'Gender/case agreement',verbs:'Czech verbs',tense:'Aspect preview',extra:[{id:'case_acc',name:'Accusative case',icon:'Acc',cost:2,req:['case_gen'],x:110,y:980,desc:'Direct object forms.'}],links:[['case_gen','case_acc']]}),
  no:treeFromTemplate('Norwegian word-order-and-noun tree','Ã…',{sound:'Norwegian sounds',order:'Verb-second order',prep:'Prepositions',case1:'articles',case1Name:'Definite suffixes',case1Icon:'-en',case2:'de_phrases',case2Name:'Possessive/genitive',case2Icon:'-s',agree:'Neuter adjective forms',verbs:'Norwegian verbs',tense:'Modal future'}),
  da:treeFromTemplate('Danish word-order-and-noun tree','Ø',{sound:'Danish sounds',soundDesc:'Soft d, stød hints, and vowel reduction.',order:'Verb-second order',prep:'Prepositions',case1:'articles',case1Name:'Definite suffixes',case1Icon:'-et',case2:'de_phrases',case2Name:'Possessive/genitive',case2Icon:'-s',agree:'Neuter adjective forms',verbs:'Danish verbs',tense:'Modal future'})
});

function skillList(){return SKILL_TREES[lang].skills}
function treeLinks(){return SKILL_TREES[lang].links}
const achievementDefs=[
  {category:'Core',name:'First Correct',icon:'✅',desc:'Answer any question correctly.',progress:s=>({value:s.correct,max:1})},
  {category:'Core',name:'Level 5',icon:'🏅',desc:'Reach level 5 in the selected language.',progress:s=>({value:levelInfo(s.xp).level,max:5})},
  {category:'Core',name:'Level 25',icon:'🏆',desc:'Reach level 25 in the selected language.',progress:s=>({value:levelInfo(s.xp).level,max:25})},
  {category:'Vocabulary',name:'Word Collector',icon:'📚',desc:'Touch 25 words or forms.',progress:s=>({value:Object.keys(s.touched||{}).length,max:25})},
  {category:'Vocabulary',name:'Obscure Seeker',icon:'✦',desc:'Buy the obscure deck skill.',progress:s=>({value:s.skills.obscure_words?1:0,max:1})},
  {category:'Grammar',name:'Builder',icon:'🧱',desc:'Build three complete sentences.',progress:s=>({value:s.built||0,max:3})},
  {category:'Grammar',name:'Specialist',icon:'🌿',desc:'Buy four skills in this language tree.',progress:s=>({value:Object.keys(s.skills||{}).length,max:4})},
  {category:'Grammar',name:'Tree Scholar',icon:'🌳',desc:'Buy twelve skills in this language tree.',progress:s=>({value:Object.keys(s.skills||{}).length,max:12})},
  {category:'Practice',name:'Steady Hand',icon:'✍',desc:'Answer 20 questions correctly.',progress:s=>({value:s.correct,max:20})},
  {category:'Practice',name:'Sentence Worker',icon:'▦',desc:'Build ten complete sentences.',progress:s=>({value:s.built||0,max:10})}
]
const el=id=>document.getElementById(id);
const nodes={xp:el('xp'),level:el('level'),correct:el('correct'),words:el('words'),xpfill:el('xpfill'),levelLine:el('levelLine'),points:el('points'),deck:el('deck'),deckNote:el('deckNote'),achievementBox:el('achievements'),tree:el('tree'),treeStage:el('treeStage'),treeViewport:el('treeViewport'),zoomIn:el('zoomIn'),zoomOut:el('zoomOut'),zoomReset:el('zoomReset'),qtype:el('qtype'),prompt:el('prompt'),hint:el('hint'),answerArea:el('answerArea'),feedback:el('feedback'),nextBtn:el('nextBtn'),languageSelect:el('languageSelect'),treePanel:el('treePanel'),speakBtn:el('speakBtn'),skipBtn:el('skipBtn')};
const pageNames=['learn','journey','practice','character','dictionary','grammar','review','settings'];
let store={users:{local:{languages:{}}}}, user='local', lang='ru', current=null, drag=null;
let reviewMonthCursor=new Date(new Date().getFullYear(), new Date().getMonth(), 1);

function setPage(page){
  if(!pageNames.includes(page)) page='learn';
  pageNames.forEach(name=>{
    const p=el(name+'Page'), t=el(name+'Tab');
    if(p) p.classList.toggle('active', name===page);
    if(t) t.classList.toggle('active', name===page);
  });
  if(page==='character'){renderTree();setTimeout(()=>applyTreeTransform(),0)}
  renderUtilityPages();
}

function reviewDueCount(date){
  const s=state();
  const touched=Object.keys(s.touched||{}).length;
  const base=Math.max(0, touched*2 - (s.correct||0));
  const seed=(date.getFullYear()*372 + (date.getMonth()+1)*31 + date.getDate()*17 + lang.charCodeAt(0)+lang.charCodeAt(1)) % 9;
  if(isSameDay(date,new Date())) return Math.min(99, base);
  if(date < startOfDay(new Date())) return seed%4===0 ? Math.min(12, Math.max(1, Math.floor(base/5)+seed)) : 0;
  return seed%3===0 ? Math.min(18, Math.max(1, Math.floor(base/4)+seed)) : 0;
}
function startOfDay(d){return new Date(d.getFullYear(),d.getMonth(),d.getDate())}
function isSameDay(a,b){return a.getFullYear()===b.getFullYear()&&a.getMonth()===b.getMonth()&&a.getDate()===b.getDate()}
function renderReviewCalendar(){
  const box=el('reviewCalendar'); if(!box) return;
  const y=reviewMonthCursor.getFullYear(), m=reviewMonthCursor.getMonth();
  const today=new Date();
  const first=new Date(y,m,1);
  const start=new Date(y,m,1-first.getDay());
  const monthName=first.toLocaleString(undefined,{month:'long',year:'numeric'});
  let html=`<div class="calendar-head"><button onclick="shiftReviewMonth(-1)">◀</button><div class="calendar-title">${monthName}</div><button onclick="shiftReviewMonth(1)">▶</button></div><div class="calendar-grid">`;
  ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].forEach(d=>html+=`<div class="calendar-dow">${d}</div>`);
  let weekDue=0, studied=0;
  for(let i=0;i<42;i++){
    const d=new Date(start); d.setDate(start.getDate()+i);
    const due=reviewDueCount(d);
    const inMonth=d.getMonth()===m;
    const cls=['calendar-day',inMonth?'':'other',isSameDay(d,today)?'today':''].join(' ');
    const studiedDay=d <= today && inMonth && due>0;
    if(inMonth && studiedDay) studied++;
    const oneWeek=new Date(today); oneWeek.setDate(today.getDate()+7);
    if(d>=startOfDay(today)&&d<oneWeek) weekDue+=due;
    html+=`<div class="${cls}" title="${due} review item${due===1?'':'s'}"><div class="calendar-num">${d.getDate()}</div>${due?`<span class="calendar-due">${due} due</span>`:''}${studiedDay?'<span class="calendar-dot"></span>':''}</div>`;
  }
  html+='</div>'; box.innerHTML=html;
  if(el('reviewWeek')) el('reviewWeek').textContent=weekDue;
  if(el('reviewMonth')) el('reviewMonth').textContent=studied;
  if(el('reviewStreak')) el('reviewStreak').textContent=state().streak||0;
}
function shiftReviewMonth(delta){reviewMonthCursor=new Date(reviewMonthCursor.getFullYear(),reviewMonthCursor.getMonth()+delta,1);renderReviewCalendar()}
function renderUtilityPages(){
  const data=D(), s=state(), touched=Object.keys(s.touched).length, li=levelInfo(s.xp), skillCount=Object.keys(s.skills).length;
  const units=[
    ['Foundations',[['Sound system', has('alphabet')||li.level>1?100:25],['Core words', has('core_words')?100:Math.min(90,touched*10)],['Pronunciation habit', has('listening')?100:20]]],
    ['Sentence work',[['Word order', has('sentence_order')?100:20],['Sentence builder', s.built?Math.min(100,s.built*34):0],['Longer sentences', has('long_sentences')?100:0]]],
    ['Grammar',[['Forms and agreement', Math.min(100,skillCount*14)],['Prepositions', has('prepositions')||has('articles')?100:15],['Verbs', has('verbs')?100:15]]]
  ];
  const journey=el('journeyList');
  if(journey){
    journey.innerHTML='<div class="tree-view"></div>';
    const root=journey.querySelector('.tree-view');
    units.forEach((group,gi)=>{
      const box=document.createElement('div');
      box.innerHTML=`<div class="tree-folder"><span class="tree-icon">${gi===0?'📁':gi===1?'🧩':'📘'}</span>${group[0]}</div><ul></ul>`;
      const ul=box.querySelector('ul');
      group[1].forEach(([name,pct])=>{
        const li=document.createElement('li');
        li.innerHTML=`<span class="tree-leaf"><span class="tree-icon">${pct>=100?'✓':'□'}</span>${name}</span><div class="meter"><span style="width:${pct}%"></span></div><div class="small">${pct}% complete</div>`;
        ul.appendChild(li);
      });
      root.appendChild(box);
    });
  }
  const flatUnits=units.flatMap(g=>g[1]);
  if(el('journeyCompletion')) el('journeyCompletion').textContent=Math.round(flatUnits.reduce((a,u)=>a+u[1],0)/flatUnits.length)+'%';
  if(el('journeyFocus')) el('journeyFocus').textContent=has('core_words')?'Grammar foundations':'Core vocabulary';
  const dict=el('dictionaryList'); if(dict){let q=(el('dictFilter')?.value||'').toLowerCase(); dict.innerHTML=''; getDeck().filter(w=>!q||w.t.toLowerCase().includes(q)||w.en.toLowerCase().includes(q)||w.tr.toLowerCase().includes(q)).forEach(w=>{let d=document.createElement('div');d.className='dict-entry';d.innerHTML=`<h3>${w.t}</h3><div class="small"><b>${w.en}</b> · ${data.trLabel}: ${w.tr}</div><div class="small">Known: ${s.touched[w.t]?'yes':'not yet'}</div>`;dict.appendChild(d)});}
  const grammar=el('grammarList'); if(grammar){
    grammar.innerHTML='<div class="tree-view"></div>';
    const root=grammar.querySelector('.tree-view');
    let common=['Sound system','Core word order','Basic sentence construction','Prepositions and phrases','Verb forms','Adjective agreement'];
    let specific=[];
    if(lang==='ru')specific=['Six-case system','Verb aspect','Motion verbs'];
    if(lang==='de')specific=['Articles and gender','V2 word order','Four cases','Separable verbs'];
    if(lang==='fr')specific=['Articles and gender','Partitive articles','Near future','Elision and liaison'];
    [['Common reference',common],['Language-specific',specific]].forEach((group,gi)=>{
      const box=document.createElement('div');
      box.innerHTML=`<div class="tree-folder"><span class="tree-icon">${gi?'📙':'📘'}</span>${group[0]}</div><ul></ul>`;
      const ul=box.querySelector('ul');
      group[1].forEach((name,i)=>{
        const unlocked=i<skillCount+2;
        const li=document.createElement('li');
        li.innerHTML=`<span class="${unlocked?'tree-leaf':'tree-locked'}"><span class="tree-icon">${unlocked?'📄':'🔒'}</span>${name}</span><div class="small">${unlocked?'Available':'Locked until more skill progress.'}</div>`;
        ul.appendChild(li);
      });
      root.appendChild(box);
    });
  }
  if(el('reviewDue')) el('reviewDue').textContent=Math.max(0, Math.min(99, touched*2 - s.correct));
  renderReviewCalendar();
}
function D(){return LANGS[lang]}function targetLabel(){return D().name}
function save(){window.AppStorage?.persist(user,lang,state(),store)}
function state(){store.users[user]||(store.users[user]={languages:{}});store.users[user].languages[lang]||=window.AppStorage?.defaultProgress()||{xp:0,correct:0,streak:0,touched:{},skills:{},built:0};return store.users[user].languages[lang]}
function exportCurrentProgress(){return JSON.stringify(state(),null,2)}
function cost(l){
  // XP needed to advance from level l to l+1.
  // Faster early levels for skill-point momentum, then a steady long-tail climb to 100.
  return Math.round(55 + l*13 + Math.pow(l,1.72)*1.15);
}
const LEVEL_TOTAL_CACHE=Array.from({length:MAX_LEVEL+1},(_,i)=>{let t=0;for(let l=1;l<i;l++)t+=cost(l);return t});
function totalFor(level){return LEVEL_TOTAL_CACHE[Math.max(1,Math.min(MAX_LEVEL,level))]||0}
function levelInfo(xp){let level=1;while(level<MAX_LEVEL&&xp>=totalFor(level+1))level++;let start=totalFor(level),next=level<MAX_LEVEL?totalFor(level+1):start,c=next-start,into=xp-start;return{level,start,next,cost:c,into,pct:level<MAX_LEVEL?Math.round(into/c*100):100,toNext:level<MAX_LEVEL?next-xp:0}}
function earned(){return Math.max(0,levelInfo(state().xp).level-1)}function spent(){return Object.keys(state().skills).reduce((a,id)=>a+(skillList().find(s=>s.id===id)?.cost||0),0)}function available(){return earned()-spent()}function has(id){return !!state().skills[id]}function unlocked(sk){return !sk.req||sk.req.every(has)}function pick(a){return a[Math.floor(Math.random()*a.length)]}function shuffle(a){return [...a].sort(()=>Math.random()-.5)}function norm(s){return String(s).trim().toLowerCase().replace(/[.!?]/g,'').replace(/ё/g,'е').normalize('NFC').replace(/\p{M}/gu,'').replace(/\s+/g,' ')}
let treeView={x:120,y:20,z:.82,dragging:false,lastX:0,lastY:0};
function applyTreeTransform(){nodes.treeStage.style.transform=`translate(${treeView.x}px,${treeView.y}px) scale(${treeView.z})`}
function centerTree(){let vp=nodes.treeViewport;if(!vp)return;treeView={x:Math.max(20,(vp.clientWidth-1280*.82)/2),y:28,z:.82,dragging:false,lastX:0,lastY:0};applyTreeTransform()}
function zoomTree(delta,cx,cy){let old=treeView.z,nz=Math.min(1.45,Math.max(.45,old+delta));if(nz===old)return;let r=nodes.treeViewport.getBoundingClientRect(),px=(cx??(r.left+r.width/2))-r.left,py=(cy??(r.top+r.height/2))-r.top;let wx=(px-treeView.x)/old,wy=(py-treeView.y)/old;treeView.z=nz;treeView.x=px-wx*nz;treeView.y=py-wy*nz;applyTreeTransform()}
function initTreePan(){let vp=nodes.treeViewport;if(!vp)return;nodes.zoomIn.onclick=()=>zoomTree(.1);nodes.zoomOut.onclick=()=>zoomTree(-.1);nodes.zoomReset.onclick=()=>centerTree();vp.onmousedown=e=>{if(e.target.closest('button'))return;treeView.dragging=true;treeView.lastX=e.clientX;treeView.lastY=e.clientY};window.addEventListener('mouseup',()=>treeView.dragging=false);window.addEventListener('mousemove',e=>{if(!treeView.dragging)return;treeView.x+=e.clientX-treeView.lastX;treeView.y+=e.clientY-treeView.lastY;treeView.lastX=e.clientX;treeView.lastY=e.clientY;applyTreeTransform()});vp.addEventListener('wheel',e=>{e.preventDefault();zoomTree(e.deltaY>0?-.07:.07,e.clientX,e.clientY)},{passive:false});}
function scrollToTree(){setPage('character');setTimeout(centerTree,80)}function speak(text){let u=new SpeechSynthesisUtterance(text);u.lang=D().tts;speechSynthesis.cancel();speechSynthesis.speak(u)}
function getDeck(){let limit=has('obscure_words')?D().words.length:has('core_words')?35:12;let d=D().words.slice(0,limit);return d.map(([t,en,tr])=>({t,en,tr}))}
function verbForm(v,subj,tense){return tense==='present'?v.present[subj.k]:tense==='past'?v.past[subj.g==='f'?'f':subj.g==='pl'?'pl':'m']:v.future[subj.k]}
function formWords(x){return String(x).split(' ').filter(Boolean)}
function findVerbByEnglish(data,en){return data.verbs.find(v=>v.en===en)||pick(data.verbs)}
function findNounByEnglish(data,en){return data.nouns.find(n=>n.en===en)||pick(data.nouns)}
function safeSentenceTemplates(){
  const data=D(), subj=pick(data.subjects), tense=pick(has('tense_path')?['present','past','future']:['present']);
  const see=findVerbByEnglish(data,'see'), read=findVerbByEnglish(data,'read'), live=data.verbs.find(v=>v.en==='live'||v.en==='live in')||findVerbByEnglish(data,'live');
  const house=findNounByEnglish(data,'house'), city=findNounByEnglish(data,'city'), school=findNounByEnglish(data,'school'), book=findNounByEnglish(data,'book'), window=findNounByEnglish(data,'window');
  const place=pick([city,school,house]);
  const obj=pick([house,book,window]);
  const prepIn=data.preps.find(p=>p.en==='in')||data.preps[0];
  const adj=pick(data.adj);
  const code=lang;
  const templates=[];
  templates.push({en:`${subj.en} see the ${obj.en}.`,t:[subj.t,...formWords(verbForm(see,subj,tense)),...formWords(obj.forms.acc)]});
  templates.push({en:`${subj.en} read the ${book.en}.`,t:[subj.t,...formWords(verbForm(read,subj,tense)),...formWords(book.forms.acc)]});
  templates.push({en:`${subj.en} live in the ${place.en}.`,t:[subj.t,...formWords(verbForm(live,subj,tense)),prepIn.t,...formWords(place.forms[prepIn.key])]});
  if(has('description_chain')){
    if(code==='fr') templates.push({en:`The ${adj.en} ${house.en} is here.`,t:[...formWords(house.forms.nom.split(' ')[0]||'la'),adj.forms[house.g],house.t,'est','ici']});
    else if(code==='de') templates.push({en:`The ${adj.en} ${house.en} is here.`,t:['das',adj.forms[house.g],house.t,'ist','hier']});
    else templates.push(data.sentences[3]||{en:`The ${adj.en} ${window.en} is here.`,t:[adj.forms[window.g],window.forms.nom]});
  }
  if(has('long_sentences')){
    const loc=pick([city,school]);
    templates.push({en:`${subj.en} see the ${obj.en} in the ${loc.en}.`,t:[subj.t,...formWords(verbForm(see,subj,tense)),...formWords(obj.forms.acc),prepIn.t,...formWords(loc.forms[prepIn.key])]});
  }
  return templates.map(t=>({...t,distractors:shuffle([house.forms.nom,city.forms.nom,school.forms.nom,book.forms.nom,window.forms.nom,adj.base,...data.filler]).flatMap(formWords).slice(0,6)}));
}
function generatedSentence(){return pick(safeSentenceTemplates())}
function kinds(){let k=['target_en','en_target'];if(has('sentence_order'))k.push('build','order');if(has('case_prep')||has('case_dat')||has('articles')||has('prepositions'))k.push('case');if(has('adjectives'))k.push('adj');if(has('verbs'))k.push('verb');if(has('case_gen')||has('case_acc')||has('de_phrases'))k.push('case');if(has('long_sentences'))k.push('dynamic');return k}
function makeQ(){let data=D(), kind=pick(kinds()),deck=getDeck();if(kind==='build'||kind==='dynamic'){let s=kind==='dynamic'?generatedSentence():pick(data.sentences.filter(x=>has('long_sentences')||x.t.length<=5));return{kind:'build',type:'Build the sentence',prompt:s.en,hint:'Drag words into the answer lane. Reorder them by dragging.',answer:s.t.join(' '),bank:shuffle([...s.t,...(s.distractors||data.filler)]),chosen:[],word:s.t.join(' ')}}if(kind==='order'){let s=pick(data.sentences);let wrong=shuffle([shuffle(s.t).join(' '),[...s.t].reverse().join(' '),shuffle(s.t).join(' ')]).filter(x=>norm(x)!==norm(s.t.join(' '))).slice(0,3);return{kind,type:'Choose word order',prompt:s.en,hint:`Pick the natural ${data.name} sentence.`,answer:s.t.join(' '),choices:shuffle([s.t.join(' '),...wrong]),word:s.t.join(' ')}}if(kind==='case'){let p=pick(data.preps),n=pick(data.nouns),ans=`${p.t} ${n.forms[p.key]}`;return{kind,type:'Preposition + form',prompt:`${p.en} the ${n.en}`,hint:`${p.t} uses ${p.case}.`,answer:ans,choices:shuffle([...new Set([ans,`${p.t} ${n.forms.nom}`,`${p.t} ${n.forms.acc}`,`${p.t} ${n.forms.gen}`,`${p.t} ${n.forms.prep}`])]),word:ans}}if(kind==='adj'){let a=pick(data.adj),n=pick(data.nouns),ans=`${a.forms[n.g]} ${n.forms.nom}`;return{kind,type:'Adjective agreement',prompt:`${a.en} ${n.en}`,hint:'Match the adjective to the noun pattern.',answer:ans,choices:shuffle([...new Set([ans,`${a.forms.m} ${n.forms.nom}`,`${a.forms.f} ${n.forms.nom}`,`${a.forms.n} ${n.forms.nom}`])]),word:ans}}if(kind==='verb'){let v=pick(data.verbs),subj=pick(data.subjects),tense=pick(['present','past','future']),ans=verbForm(v,subj,tense);return{kind,type:'Verb form',prompt:`${subj.en} · ${v.en} · ${tense}`,hint:`Infinitive: ${v.inf}`,answer:ans,choices:shuffle([ans,...shuffle([...Object.values(v.present),...Object.values(v.past),...Object.values(v.future)]).filter(x=>x!==ans).slice(0,4)]),word:ans}}let w=pick(deck);if(kind==='en_target')return{kind,type:`English → ${data.name}`,prompt:w.en,hint:`Choose the ${data.name} word.`,answer:w.t,choices:shuffle([w.t,...shuffle(deck.filter(x=>x.t!==w.t)).slice(0,3).map(x=>x.t)]),word:w.t};if(kind==='translit')return{kind,type:data.trLabel==='transliteration'?'Transliteration':'Pronunciation hint',prompt:w.t,hint:'Type the simple hint shown in the active deck.',answer:w.tr,word:w.t};return{kind,type:`${data.name} → English`,prompt:w.t,hint:`${data.trLabel}: ${w.tr}`,answer:w.en,choices:shuffle([w.en,...shuffle(deck.filter(x=>x.en!==w.en)).slice(0,3).map(x=>x.en)]),word:w.t}}
function newQuestion(){current=makeQ();renderQuestion()}function renderQuestion(){nodes.qtype.textContent=current.type;nodes.prompt.textContent=current.prompt;nodes.hint.textContent=current.hint||'';nodes.feedback.textContent='';nodes.feedback.className='feedback';nodes.nextBtn.hidden=true;nodes.answerArea.innerHTML='';if(current.kind==='build')renderBuilder();else if(current.choices){let div=document.createElement('div');div.className='choices';current.choices.forEach(c=>{let b=document.createElement('button');b.className='choice';b.textContent=c;b.onclick=()=>grade(c);div.appendChild(b)});nodes.answerArea.appendChild(div)}else{let input=document.createElement('input');input.placeholder='Type answer';input.style.cssText='padding:13px;border:1px solid var(--line);border-radius:14px;min-width:240px;background:#fffdf8';input.onkeydown=e=>{if(e.key==='Enter')grade(input.value)};let b=document.createElement('button');b.className='primary';b.textContent='Check';b.onclick=()=>grade(input.value);nodes.answerArea.append(input,b);input.focus()}renderAll()}
function renderBuilder(){let wrap=document.createElement('div');wrap.className='sentence-stage';let lane=document.createElement('div');lane.className='answer-lane';let bank=document.createElement('div');bank.className='word-bank';function tile(word,from,i,id){let t=document.createElement('span');t.className='tile';t.textContent=word;t.draggable=true;t.ondragstart=e=>{drag={from,i,id,word};t.classList.add('dragging')};t.ondragend=()=>t.classList.remove('dragging');t.onclick=()=>{if(from==='bank'&&!current.chosen.some(x=>x.id===id)){current.chosen.push({word,id});draw()}else if(from==='answer'){current.chosen.splice(i,1);draw()}};return t}function draw(){lane.innerHTML='';bank.innerHTML='';if(!current.chosen.length){let p=document.createElement('span');p.className='placeholder';p.textContent='Drop words here';lane.appendChild(p)}current.chosen.forEach((x,i)=>lane.appendChild(tile(x.word,'answer',i,x.id)));current.bank.forEach((w,i)=>{let t=tile(w,'bank',i,i);if(current.chosen.some(x=>x.id===i))t.classList.add('used');bank.appendChild(t)})}function dropZone(el,where){el.ondragover=e=>{e.preventDefault();el.classList.add('over')};el.ondragleave=()=>el.classList.remove('over');el.ondrop=e=>{e.preventDefault();el.classList.remove('over');let target=e.target.closest('.tile'),insert=target&&where==='answer'&&target.parentElement===lane?[...lane.querySelectorAll('.tile')].indexOf(target):current.chosen.length;if(!drag)return;if(where==='answer'){if(drag.from==='bank'&&!current.chosen.some(x=>x.id===drag.id))current.chosen.splice(insert,0,{word:drag.word,id:drag.id});else if(drag.from==='answer'){let [m]=current.chosen.splice(drag.i,1);if(drag.i<insert)insert--;current.chosen.splice(insert,0,m)}}else if(where==='bank'&&drag.from==='answer')current.chosen.splice(drag.i,1);drag=null;draw()}}dropZone(lane,'answer');dropZone(bank,'bank');draw();let controls=document.createElement('div');controls.style.display='flex';controls.style.gap='10px';let clear=document.createElement('button');clear.textContent='Clear';clear.onclick=()=>{current.chosen=[];draw()};let check=document.createElement('button');check.textContent='Check sentence';check.className='primary';check.onclick=()=>grade(current.chosen.map(x=>x.word).join(' '));controls.append(clear,check);wrap.append(lane,bank,controls);nodes.answerArea.appendChild(wrap)}
function grade(ans){let s=state(),ok=norm(ans)===norm(current.answer),gain=current.kind==='build'?18:['case','adj','verb'].includes(current.kind)?16:10;s.touched[current.word]=true;if(ok){s.xp+=gain;s.correct++;s.streak++;if(current.kind==='build')s.built++;nodes.feedback.textContent=`Correct. +${gain} XP`;nodes.feedback.className='feedback good'}else{s.streak=0;nodes.feedback.textContent=`Wrong. Correct answer: ${current.answer}`;nodes.feedback.className='feedback bad'}save();nodes.nextBtn.hidden=false;nodes.answerArea.querySelectorAll('button,input,.tile').forEach(e=>{e.disabled=true;e.draggable=false;e.style.pointerEvents='none'});renderAll()}
function buy(id){let sk=skillList().find(s=>s.id===id);if(!sk||has(id)||!unlocked(sk)||available()<sk.cost)return;state().skills[id]=true;save();renderAll();newQuestion()}
function renderTree(){
  nodes.tree.innerHTML='';
  let list=skillList(),maxX=Math.max(...list.map(s=>s.x))+250,maxY=Math.max(...list.map(s=>s.y))+205;
  nodes.tree.style.width=maxX+'px';
  nodes.tree.style.minHeight=maxY+'px';
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.setAttribute('class','branch-svg');
  svg.setAttribute('width',maxX);
  svg.setAttribute('height',maxY);
  svg.setAttribute('viewBox',`0 0 ${maxX} ${maxY}`);
  for(let [a,b] of treeLinks()){
    let A=list.find(s=>s.id===a),B=list.find(s=>s.id===b); if(!A||!B) continue;
    let x1=A.x+84,y1=A.y+124,x2=B.x+84,y2=B.y;
    let mid=Math.round((y1+y2)/2);
    let d=`M ${x1} ${y1} V ${mid} H ${x2} V ${y2}`;
    let path=document.createElementNS('http://www.w3.org/2000/svg','path');
    path.setAttribute('d',d);
    svg.appendChild(path);
  }
  nodes.tree.appendChild(svg);
  list.forEach(sk=>{
    let n=document.createElement('div');
    n.className='node '+(has(sk.id)?'owned':unlocked(sk)?'available':'locked');
    n.style.left=sk.x+'px';n.style.top=sk.y+'px';
    const reqText=(sk.req&&sk.req.length)?'Requires: '+sk.req.map(id=>(skillList().find(x=>x.id===id)?.name||id)).join(', '):'No prerequisite.';
    n.setAttribute('data-tip',`${sk.name}: ${sk.desc} Cost: ${sk.cost} point${sk.cost>1?'s':''}. ${reqText}`);
    n.title='';
    n.innerHTML=`<div class="icon">${sk.icon}</div><h3>${sk.name}</h3><p>${sk.desc}</p><span class="cost">${sk.cost} point${sk.cost>1?'s':''}</span><br><button ${has(sk.id)||!unlocked(sk)||available()<sk.cost?'disabled':''} onclick="buy('${sk.id}')">${has(sk.id)?'Owned':unlocked(sk)?'Buy':'Locked'}</button>`;
    nodes.tree.appendChild(n)
  });
  applyTreeTransform()
}
function achievementProgress(a,s){
  let pr=a.progress?a.progress(s):{value:0,max:1};
  let value=Math.max(0,Math.min(pr.value||0,pr.max||1));
  return {value,max:pr.max||1};
}


function renderAll(){let data=D(),s=state(),li=levelInfo(s.xp);document.querySelector('.sigil').textContent=data.sigil;document.querySelector('.brand p').textContent=`${data.name} prototype · dynamic questions · per-language character sheet`;document.querySelector('.ctitle').textContent=`${data.name} Learner`;nodes.xp.textContent=s.xp;nodes.level.textContent=li.level;nodes.correct.textContent=s.correct;nodes.words.textContent=Object.keys(s.touched).length;nodes.xpfill.style.width=li.pct+'%';nodes.levelLine.textContent=li.level<MAX_LEVEL?`Level ${li.level} · ${li.into} / ${li.cost} XP · ${li.toNext} XP to next`:`Level ${MAX_LEVEL} · max`;nodes.points.textContent=available();nodes.deck.innerHTML='';getDeck().forEach(w=>{let row=document.createElement('div');row.className='word';row.innerHTML=`<div><b>${w.t}</b><br><span>${w.tr}</span></div><span>${w.en}</span>`;nodes.deck.appendChild(row)});nodes.deckNote.textContent=`${getDeck().length} base words available for ${data.name}. Question types depend on the skill tree.`;nodes.treePanel.querySelector('.panel-title .small').textContent=`Earn one skill point per level. ${SKILL_TREES[lang].label}: the shared trunk stays familiar, then language-specific branches open.`;document.querySelector('.danger').textContent=`Reset ${data.name} progress`;nodes.achievementBox.innerHTML='<div class="achievement-title">Achievements</div>';
const groups={};
achievementDefs.forEach(a=>{(groups[a.category||'General']||(groups[a.category||'General']=[])).push(a)});
Object.entries(groups).forEach(([cat,items])=>{
  let section=document.createElement('div');
  section.className='achievement-category';
  section.innerHTML=`<div class="achievement-category-title">${cat}</div>`;
  items.forEach(a=>{
    let pr=achievementProgress(a,s), ok=pr.value>=pr.max;
    let pct=Math.max(0,Math.min(100,Math.round(pr.value/pr.max*100)));
    let b=document.createElement('div');
    b.className='achievement-card '+(ok?'done':'locked');
    b.innerHTML=`<span class="aicon">${a.icon}</span><div><h4>${a.name}</h4><p>${a.desc}</p><div class="ach-meter"><span style="width:${pct}%"></span></div><div class="ach-progress">${Math.min(pr.value,pr.max)} / ${pr.max}</div></div><span class="astate">${ok?'Unlocked':pct+'%'}</span>`;
    section.appendChild(b)
  });
  nodes.achievementBox.appendChild(section)
});
renderTree();renderUtilityPages()}
function resetLang(){
  const dlg=el('resetDialog'), txt=el('resetText');
  txt.textContent=`Reset all ${D().name} progress for this local prototype? XP, level, skills, words, and achievements for this language will be cleared.`;
  dlg.classList.add('show');
}
function closeReset(){el('resetDialog').classList.remove('show')}

function openDebugXp(){
  const dlg=el('debugDialog'), input=el('debugXpInput');
  dlg.classList.add('show');
  input.value='';
  setTimeout(()=>input.focus(),0);
}
function closeDebugXp(){el('debugDialog').classList.remove('show')}
function applyDebugXp(){
  const input=el('debugXpInput');
  const amt=Math.floor(Number(input.value));
  if(!Number.isFinite(amt)||amt<=0){input.focus();return}
  state().xp+=amt;
  save();
  closeDebugXp();
  renderAll();
}
el('cancelReset').onclick=closeReset;
el('resetDialog').addEventListener('click',e=>{if(e.target.id==='resetDialog')closeReset()});
el('confirmReset').onclick=async()=>{store.users[user].languages[lang]=window.AppStorage?.defaultProgress()||{xp:0,correct:0,streak:0,touched:{},skills:{},built:0};if(window.AppStorage?.isCloudActive()){try{await window.AppStorage.deleteLanguageProgress(window.AppStorage.cloudUserId,lang)}catch(err){console.error('Cloud reset failed',err)}}save();closeReset();newQuestion();setPage('character')};

el('cancelDebug').onclick=closeDebugXp;
el('applyDebugXp').onclick=applyDebugXp;
el('debugXpInput').addEventListener('keydown',e=>{if(e.key==='Enter')applyDebugXp(); if(e.key==='Escape')closeDebugXp()});
el('debugDialog').addEventListener('click',e=>{if(e.target.id==='debugDialog')closeDebugXp()});
document.addEventListener('keydown',e=>{
  const tag=(document.activeElement?.tagName||'').toLowerCase();
  const typing=['input','textarea','select'].includes(tag) || document.activeElement?.isContentEditable;
  if(e.key==='d' && !typing && !e.ctrlKey && !e.metaKey && !e.altKey){e.preventDefault();openDebugXp()}
  if(e.key==='Escape' && el('debugDialog').classList.contains('show')) closeDebugXp();
});
function initLanguageSelect(){nodes.languageSelect.innerHTML='';Object.entries(LANGS).forEach(([code,d])=>{let o=document.createElement('option');o.value=code;o.textContent=d.name;nodes.languageSelect.appendChild(o)});nodes.languageSelect.value=lang;nodes.languageSelect.onchange=e=>{lang=e.target.value;newQuestion();renderAll()}}
function initApp(){initLanguageSelect();initTreePan();centerTree();newQuestion();renderAll();window.AppAuth?.updateAuthUi?.()}
nodes.speakBtn.onclick=()=>speak(current?.word||current?.answer||current?.prompt||D().words[0][0]);nodes.skipBtn.onclick=()=>newQuestion();nodes.nextBtn.onclick=()=>newQuestion();

