export type Lang = "pt" | "es" | "en";
export type Item = { e: string; s: string; t: string };

// 12 desafios neutros: servem para qualquer casal. A ordem alterna carinho, tarefa e diversão.
export const ITEMS: Record<Lang, Item[]> = {
  pt: [
    { e: "💆", s: "Massagem completa", t: "Massagem completa de 10 minutos no seu par. Sem pressa, com óleo ou creme, e o celular longe." },
    { e: "🍽️", s: "Lavar a louça", t: "Lave toda a louça de hoje, sem reclamar e sem avisar que está fazendo." },
    { e: "🦶", s: "Massagem nos pés", t: "Massagem nos pés do seu par, 5 minutos em cada um. Quem recebe só relaxa." },
    { e: "💬", s: "3 elogios", t: "Diga 3 elogios sinceros ao seu par, olhando nos olhos." },
    { e: "🛁", s: "Banho com carinho", t: "Prepare um banho para o seu par: água na temperatura certa, toalha quentinha e nada de pressa." },
    { e: "🚿", s: "Limpar o banheiro", t: "Deixe o banheiro limpo e cheiroso hoje. O seu par só descobre quando entrar." },
    { e: "💃", s: "Dançar na sala", t: "Escolham uma música e dancem na sala, mesmo sem saber dançar." },
    { e: "🎬", s: "Filme e lanche", t: "Escolha o filme e o lanche da noite, e o seu par aceita sem discutir." },
    { e: "☕", s: "Café na cama", t: "Faça o café da manhã e leve até o seu par, na cama ou no sofá." },
    { e: "🧹", s: "Arrumar a casa", t: "Arrume a cama e a sala enquanto o seu par descansa." },
    { e: "🤗", s: "Cafuné", t: "Cafuné de 5 minutos no seu par, em silêncio ou ao som da música favorita dele(a)." },
    { e: "📵", s: "Sem celular", t: "30 minutos sem celular, só conversando, com um assunto escolhido pelo seu par." },
  ],
  es: [
    { e: "💆", s: "Masaje completo", t: "Masaje completo de 10 minutos a tu pareja. Sin prisa, con aceite o crema y el móvil lejos." },
    { e: "🍽️", s: "Fregar los platos", t: "Friega todos los platos de hoy, sin quejarte y sin avisar de que lo estás haciendo." },
    { e: "🦶", s: "Masaje de pies", t: "Masaje en los pies de tu pareja, 5 minutos en cada uno. Quien lo recibe solo se relaja." },
    { e: "💬", s: "3 cumplidos", t: "Dile a tu pareja 3 cumplidos sinceros, mirándole a los ojos." },
    { e: "🛁", s: "Baño con mimo", t: "Prepara un baño para tu pareja: agua a buena temperatura, toalla calentita y nada de prisa." },
    { e: "🚿", s: "Limpiar el baño", t: "Deja el cuarto de baño limpio y con buen olor. Tu pareja lo descubrirá al entrar." },
    { e: "💃", s: "Bailar en el salón", t: "Elegid una canción y bailad en el salón, aunque no sepáis bailar." },
    { e: "🎬", s: "Peli y picoteo", t: "Elige la película y el picoteo de la noche, y tu pareja acepta sin discutir." },
    { e: "☕", s: "Desayuno en la cama", t: "Prepara el desayuno y llévaselo a tu pareja, a la cama o al sofá." },
    { e: "🧹", s: "Ordenar la casa", t: "Ordena la cama y el salón mientras tu pareja descansa." },
    { e: "🤗", s: "Mimos en el pelo", t: "5 minutos de caricias en el pelo a tu pareja, en silencio o con su canción favorita." },
    { e: "📵", s: "Sin móvil", t: "30 minutos sin móvil, solo hablando, de un tema que elija tu pareja." },
  ],
  en: [
    { e: "💆", s: "Full massage", t: "Give your partner a 10-minute full massage. No rush, with oil or lotion, and phones far away." },
    { e: "🍽️", s: "Wash the dishes", t: "Wash all of today's dishes, without complaining or announcing it." },
    { e: "🦶", s: "Foot massage", t: "Massage your partner's feet, 5 minutes each. The one receiving only relaxes." },
    { e: "💬", s: "3 compliments", t: "Give your partner 3 sincere compliments, looking them in the eye." },
    { e: "🛁", s: "A caring bath", t: "Run a bath for your partner: the right temperature, a warm towel and no rush." },
    { e: "🚿", s: "Clean the bathroom", t: "Leave the bathroom clean and fresh. Your partner finds out when they walk in." },
    { e: "💃", s: "Dance at home", t: "Pick a song and dance in the living room, even if you can't dance." },
    { e: "🎬", s: "Movie and snacks", t: "Pick tonight's movie and snacks, and your partner agrees without arguing." },
    { e: "☕", s: "Breakfast in bed", t: "Make breakfast and bring it to your partner, in bed or on the sofa." },
    { e: "🧹", s: "Tidy up", t: "Make the bed and tidy the living room while your partner rests." },
    { e: "🤗", s: "Head strokes", t: "5 minutes of gentle head strokes for your partner, in silence or with their favorite song." },
    { e: "📵", s: "No phones", t: "30 minutes with no phones, just talking, on a topic your partner picks." },
  ],
};


export const WHEEL_ITEMS = ITEMS;
