// Horóscopo do casal: brincadeira leve. Nada de previsão séria, nada de "incompatível".
// A leitura combina os elementos dos dois signos e sorteia (de forma estável por dia e por par) uma ideia do motor e um gesto.
import { compatibleIdeas, recommend } from "./recommendations.mjs";

export const SIGN_IDS = ["aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"];
const ELEMENT = { aries: "fire", leo: "fire", sagittarius: "fire", taurus: "earth", virgo: "earth", capricorn: "earth", gemini: "air", libra: "air", aquarius: "air", cancer: "water", scorpio: "water", pisces: "water" };
const DATES = { aries: "21/3–19/4", taurus: "20/4–20/5", gemini: "21/5–20/6", cancer: "21/6–22/7", leo: "23/7–22/8", virgo: "23/8–22/9", libra: "23/9–22/10", scorpio: "23/10–21/11", sagittarius: "22/11–21/12", capricorn: "22/12–19/1", aquarius: "20/1–18/2", pisces: "19/2–20/3" };

// Clima de cada combinação de elementos → que tipo de encontro sugerir.
const OCCASION = { "air-air": "casual", "air-earth": "casual", "air-fire": "surprise", "air-water": "reconnect", "earth-earth": "casual", "earth-fire": "casual", "earth-water": "reconnect", "fire-fire": "surprise", "fire-water": "reconnect", "water-water": "reconnect" };
export const comboKey = (a, b) => [ELEMENT[a], ELEMENT[b]].sort().join("-");

export const HORO = {
  pt: {
    kicker: "BRINCADEIRA DO DIA", title: "Horóscopo do casal", text: "Escolham os dois signos e recebam uma ideia de encontro e um gesto para hoje. É só diversão: signo nenhum prevê o futuro de ninguém.",
    you: "Seu signo", partner: "Signo da pessoa amada", button: "Ver o horóscopo de hoje", placeholder: "Escolha…",
    today: "Para hoje", idea: "Ideia de encontro", gesture: "Gesto do dia", why: "Só diversão: signos não preveem nada. A graça é ter um motivo para chegar mais perto.", again: "Outra ideia do dia", more: "Quero mais ideias",
    elements: { fire: "Fogo", earth: "Terra", air: "Ar", water: "Água" },
    signs: { aries: ["Áries", "toma a iniciativa e adora um começo"], taurus: ["Touro", "valoriza o conforto e o carinho que dura"], gemini: ["Gêmeos", "vive de conversa, curiosidade e boas risadas"], cancer: ["Câncer", "cuida, lembra de tudo e sente fundo"], leo: ["Leão", "gosta de brilhar e de ver o outro brilhar"], virgo: ["Virgem", "repara nos detalhes e mostra amor em atos"], libra: ["Libra", "busca harmonia e capricha na beleza"], scorpio: ["Escorpião", "ama com intensidade e vai ao fundo das coisas"], sagittarius: ["Sagitário", "pede aventura e liberdade, com humor"], capricorn: ["Capricórnio", "constrói devagar e é firme no compromisso"], aquarius: ["Aquário", "é original e põe amizade dentro do amor"], pisces: ["Peixes", "sonha, sente e ama com delicadeza"] },
    vibes: {
      "air-air": ["Dois ventos soprando juntos", "Muita conversa, muita ideia e risada fácil. O risco é só falar e esquecer de tocar: hoje, deixem as mãos entrarem na conversa."],
      "air-earth": ["Cabeça nas nuvens, pés no chão", "Um traz a ideia, o outro faz acontecer. Quando um escuta o ritmo do outro, o encontro fica leve e firme ao mesmo tempo."],
      "air-fire": ["Vento que atiça a fogueira", "Energia, humor e vontade de fazer coisas. Um empurra o outro, e a graça é topar a maluquice do dia."],
      "air-water": ["Brisa sobre a água", "Um entende pelas palavras, o outro pelo sentimento. Hoje vale traduzir: falem o que sentem, sem medo de parecer bobo."],
      "earth-earth": ["Dois pés no chão, uma casa quentinha", "Constância, cuidado e prazer nas coisas simples. O desafio carinhoso é sair um pouco da rotina e fazer uma coisa nova."],
      "earth-fire": ["Brasa que aquece a terra", "Um tem pressa, o outro tem calma, e juntos acham o ponto. Hoje, escolham um programa que caiba nos dois ritmos."],
      "earth-water": ["Chuva que faz o jardim crescer", "Cuidado, paciência e carinho que dura. É uma combinação de quem constrói devagar e sente fundo."],
      "fire-fire": ["Duas chamas, muita luz", "Paixão, humor e vontade de viver. O truque é revezar quem puxa a conversa e quem escuta."],
      "fire-water": ["Fogo e água fazem vapor", "Opostos que se completam: um aquece, o outro acalma. Hoje, escutem o que o outro precisa antes de propor qualquer coisa."],
      "water-water": ["Dois rios que se encontram", "Sensibilidade, memória e carinho sem pressa. Hoje é dia de colo, de lembrança boa e de olhar mais demorado."],
    },
    gestures: {
      fire: ["Proponha algo novo para fazerem juntos hoje, por mais simples que seja.", "Faça um elogio em voz alta, sem motivo nenhum.", "Convide para uma caminhada de 15 minutos antes do jantar."],
      earth: ["Prepare algo com as mãos: um café, um lanche, uma mesa arrumada.", "Faça hoje uma tarefa que o outro detesta fazer.", "Deixe um bilhete curto onde o outro vai achar."],
      air: ["Mande uma mensagem 'lembrei de você porque…' com algo bem específico.", "Façam uma pergunta curiosa um ao outro e escutem a resposta inteira.", "Escolham uma música e dancem 3 minutos na sala."],
      water: ["Abrace por 20 segundos, sem falar nada.", "Conte uma lembrança boa dos dois e peça que o outro conte a sua.", "Pergunte 'como você está de verdade?' e escute até o fim."],
    },
  },
  es: {
    kicker: "JUEGO DEL DÍA", title: "Horóscopo de pareja", text: "Elegid los dos signos y recibid una idea de cita y un gesto para hoy. Es solo diversión: ningún signo predice el futuro de nadie.",
    you: "Tu signo", partner: "Signo de tu pareja", button: "Ver el horóscopo de hoy", placeholder: "Elige…",
    today: "Para hoy", idea: "Idea de cita", gesture: "Gesto del día", why: "Solo diversión: los signos no predicen nada. La gracia es tener un motivo para acercarse.", again: "Otra idea del día", more: "Quiero más ideas",
    elements: { fire: "Fuego", earth: "Tierra", air: "Aire", water: "Agua" },
    signs: { aries: ["Aries", "toma la iniciativa y adora los comienzos"], taurus: ["Tauro", "valora la comodidad y el cariño que dura"], gemini: ["Géminis", "vive de conversación, curiosidad y buenas risas"], cancer: ["Cáncer", "cuida, lo recuerda todo y siente hondo"], leo: ["Leo", "le gusta brillar y ver brillar al otro"], virgo: ["Virgo", "se fija en los detalles y demuestra amor con hechos"], libra: ["Libra", "busca la armonía y cuida la belleza"], scorpio: ["Escorpio", "ama con intensidad y va al fondo de las cosas"], sagittarius: ["Sagitario", "pide aventura y libertad, con humor"], capricorn: ["Capricornio", "construye despacio y es firme en el compromiso"], aquarius: ["Acuario", "es original y pone amistad dentro del amor"], pisces: ["Piscis", "sueña, siente y ama con delicadeza"] },
    vibes: {
      "air-air": ["Dos vientos soplando juntos", "Mucha charla, muchas ideas y risa fácil. El riesgo es solo hablar y olvidarse de tocarse: hoy, que las manos entren en la conversación."],
      "air-earth": ["Cabeza en las nubes, pies en la tierra", "Uno trae la idea, el otro la hace realidad. Cuando uno escucha el ritmo del otro, la cita queda ligera y firme a la vez."],
      "air-fire": ["Viento que aviva la hoguera", "Energía, humor y ganas de hacer cosas. Uno empuja al otro y la gracia es apuntarse a la locura del día."],
      "air-water": ["Brisa sobre el agua", "Uno entiende por las palabras, el otro por el sentimiento. Hoy toca traducir: decid lo que sentís, sin miedo a parecer tontos."],
      "earth-earth": ["Dos pies en la tierra, un hogar calentito", "Constancia, cuidado y placer en lo sencillo. El reto cariñoso es salir un poco de la rutina y probar algo nuevo."],
      "earth-fire": ["Brasa que calienta la tierra", "Uno tiene prisa, el otro calma, y juntos encuentran el punto. Hoy, elegid un plan que quepa en los dos ritmos."],
      "earth-water": ["Lluvia que hace crecer el jardín", "Cuidado, paciencia y cariño que dura. Es una combinación de quienes construyen despacio y sienten hondo."],
      "fire-fire": ["Dos llamas, mucha luz", "Pasión, humor y ganas de vivir. El truco es turnarse: quién lleva la conversación y quién escucha."],
      "fire-water": ["Fuego y agua hacen vapor", "Opuestos que se completan: uno calienta, el otro calma. Hoy, escuchad lo que el otro necesita antes de proponer nada."],
      "water-water": ["Dos ríos que se encuentran", "Sensibilidad, memoria y cariño sin prisa. Hoy toca regazo, recuerdo bonito y mirada más larga."],
    },
    gestures: {
      fire: ["Proponed algo nuevo para hacer juntos hoy, por sencillo que sea.", "Haz un piropo en voz alta, sin ningún motivo.", "Invita a un paseo de 15 minutos antes de cenar."],
      earth: ["Prepara algo con las manos: un café, un bocadillo, una mesa bien puesta.", "Haz hoy una tarea que el otro odie hacer.", "Deja una nota corta donde el otro la encuentre."],
      air: ["Manda un mensaje 'me he acordado de ti porque…' con algo muy concreto.", "Haceos una pregunta curiosa y escuchad la respuesta entera.", "Elegid una canción y bailad 3 minutos en el salón."],
      water: ["Abraza 20 segundos, sin decir nada.", "Cuenta un buen recuerdo de los dos y pide que el otro cuente el suyo.", "Pregunta '¿cómo estás de verdad?' y escucha hasta el final."],
    },
  },
  en: {
    kicker: "TODAY'S LITTLE GAME", title: "Couple's horoscope", text: "Pick both star signs and get a date idea and a small gesture for today. It is only for fun: no star sign predicts anyone's future.",
    you: "Your sign", partner: "Your partner's sign", button: "See today's horoscope", placeholder: "Choose…",
    today: "For today", idea: "Date idea", gesture: "Gesture of the day", why: "Just for fun: signs predict nothing. The point is to have a reason to get closer.", again: "Another idea for today", more: "I want more ideas",
    elements: { fire: "Fire", earth: "Earth", air: "Air", water: "Water" },
    signs: { aries: ["Aries", "takes the lead and loves a fresh start"], taurus: ["Taurus", "values comfort and affection that lasts"], gemini: ["Gemini", "lives on conversation, curiosity and good laughs"], cancer: ["Cancer", "cares, remembers everything and feels deeply"], leo: ["Leo", "loves to shine and to see the other shine"], virgo: ["Virgo", "notices the details and shows love through actions"], libra: ["Libra", "seeks harmony and cares about beauty"], scorpio: ["Scorpio", "loves intensely and goes to the heart of things"], sagittarius: ["Sagittarius", "asks for adventure and freedom, with humour"], capricorn: ["Capricorn", "builds slowly and is firm in commitment"], aquarius: ["Aquarius", "is original and puts friendship inside love"], pisces: ["Pisces", "dreams, feels and loves with delicacy"] },
    vibes: {
      "air-air": ["Two winds blowing together", "Lots of talk, lots of ideas and easy laughter. The risk is only talking and forgetting to touch: today, let your hands join the conversation."],
      "air-earth": ["Head in the clouds, feet on the ground", "One brings the idea, the other makes it happen. When each listens to the other's rhythm, the date feels light and steady at once."],
      "air-fire": ["Wind that fans the flames", "Energy, humour and a wish to do things. One pushes the other, and the fun is saying yes to the day's madness."],
      "air-water": ["A breeze over the water", "One understands through words, the other through feeling. Today is for translating: say what you feel, without fear of sounding silly."],
      "earth-earth": ["Two feet on the ground, a warm home", "Steadiness, care and joy in simple things. The loving challenge is to step out of routine and try something new."],
      "earth-fire": ["Embers warming the earth", "One is in a hurry, the other is calm, and together you find the balance. Today, pick a plan that fits both rhythms."],
      "earth-water": ["Rain that makes the garden grow", "Care, patience and affection that lasts. A combination of people who build slowly and feel deeply."],
      "fire-fire": ["Two flames, lots of light", "Passion, humour and a love of life. The trick is to take turns: who leads the conversation and who listens."],
      "fire-water": ["Fire and water make steam", "Opposites that complete each other: one warms, the other calms. Today, listen to what the other needs before suggesting anything."],
      "water-water": ["Two rivers meeting", "Sensitivity, memory and unhurried affection. Today is for cuddles, good memories and longer looks."],
    },
    gestures: {
      fire: ["Suggest something new to do together today, however simple.", "Pay a compliment out loud, for no reason at all.", "Invite them on a 15-minute walk before dinner."],
      earth: ["Make something with your hands: a coffee, a snack, a nicely laid table.", "Do a chore today that the other one hates doing.", "Leave a short note where the other will find it."],
      air: ["Send a message saying 'I thought of you because…' with something very specific.", "Ask each other a curious question and listen to the whole answer.", "Pick a song and dance for 3 minutes in the living room."],
      water: ["Hug for 20 seconds without saying anything.", "Tell a good memory of the two of you and ask the other to tell theirs.", "Ask 'how are you, really?' and listen to the end."],
    },
  },
};

// Número estável a partir de um texto (mesmo par + mesmo dia = mesma leitura).
export function seedOf(text) {
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

// Leitura do dia. "shift" permite pedir "outra ideia do dia" sem mudar o clima.
export function coupleReading(signA, signB, day, lang = "pt", shift = 0) {
  const pack = HORO[lang] ?? HORO.pt;
  const key = comboKey(signA, signB);
  const seed = seedOf(`${[signA, signB].sort().join("+")}|${day}`) + shift;
  const elements = [ELEMENT[signA], ELEMENT[signB]];
  const gestureList = pack.gestures[elements[seed % 2]];
  const answers = { environment: "any", budget: "low", duration: seed % 3 === 0 ? "afternoon" : "hour", occasion: OCCASION[key] ?? "casual", period: "any", flame: false };
  const pool = compatibleIdeas(answers);
  const pick = pool[seed % pool.length];
  const session = { displayed: pool.filter((variant) => variant.id !== pick.id).map((variant) => ({ candidateId: variant.id })) };
  const idea = recommend(answers, session, lang).result;
  return {
    key,
    elements,
    vibe: pack.vibes[key],
    gesture: gestureList[Math.floor(seed / 3) % gestureList.length],
    idea,
    a: { id: signA, name: pack.signs[signA][0], trait: pack.signs[signA][1], element: pack.elements[ELEMENT[signA]] },
    b: { id: signB, name: pack.signs[signB][0], trait: pack.signs[signB][1], element: pack.elements[ELEMENT[signB]] },
  };
}

export const signOptions = (lang) => SIGN_IDS.map((id) => ({ id, label: `${(HORO[lang] ?? HORO.pt).signs[id][0]} · ${DATES[id]}` }));
